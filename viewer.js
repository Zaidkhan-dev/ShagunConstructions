import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

let scene, camera, renderer;
let excavatorModel;
let isAnimating = true;
let isIntersecting = true;
let animationFrameId;

// Device Capability Detection
const isMobileOrLowEnd = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

// Skeletal Bone References
let boneCab, boneBoom, boneStick, boneBucket;

// Base Initial Rotations for the Bones
const baseRotations = {
  boomX: 0.5735,
  stickX: 0.9398, // Bone003 base rotation
  bucketX: 1.5769
};

// Mouse / Touch Tracking State
const mouse = new THREE.Vector2(0, 0);
let isClickGrabbing = false;
let grabAnimationProgress = 0;

// Damped Joint Angles State
let currentCabYaw = 0;
let currentBoomPitch = 5;
let currentStickPitch = 5;
let currentBucketPitch = 0;

let time = 0;
let observer;

// Mouse Move Handler
function handleMouseMove(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

// Touch Move Handler for Mobile/Tablet Devices
function handleTouchMove(e) {
  if (e.touches && e.touches.length > 0) {
    const touch = e.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
  }
}

// Mouse / Touch Click Handler (Claw Grab Snatch!)
function handleMouseDown() {
  isClickGrabbing = true;
  grabAnimationProgress = 0;
}

export function initViewer() {
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('hero-canvas');
  if (!container || !canvas) return;

  // Scene Setup
  scene = new THREE.Scene();

  // Camera Setup
  camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(18, 14, 22);
  camera.lookAt(-2.5, 1.5, 2.0); // Focus camera directly on the grid origin cross

  // Optimized Renderer Setup
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: !isMobileOrLowEnd, // Disable MSAA on mobile for GPU savings
    alpha: true,
    powerPreference: 'high-performance',
    precision: isMobileOrLowEnd ? 'mediump' : 'highp'
  });

  // Clamp Pixel Ratio to max 1.5 for desktop and 1.0 for low-power mobile devices
  renderer.setPixelRatio(isMobileOrLowEnd ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Dynamic Shadow Maps
  if (!isMobileOrLowEnd) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  } else {
    renderer.shadowMap.enabled = false; // Disable heavy shadows on low-end mobile GPUs
  }

  // Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.9);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xfff8ee, 2.5);
  dirLight.position.set(20, 30, 15);
  
  if (!isMobileOrLowEnd) {
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024; // Optimized shadow texture
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
  }
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xffe599, 1.0);
  fillLight.position.set(-20, 10, -15);
  scene.add(fillLight);

  // Grid Helper centered in hero section
  const gridX = -2.5;
  const gridY = -0.05;
  const gridZ = 2.0;

  const gridHelper = new THREE.GridHelper(30, 30, 0xF7B500, 0xE6E1D6);
  gridHelper.position.set(gridX, gridY, gridZ);
  gridHelper.material.opacity = 0.25;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  // Load Excavator FBX
  const loader = new FBXLoader();
  loader.load(
    'Excavator simples.fbx',
    (fbx) => {
      excavatorModel = fbx;
      
      // Scale model slightly smaller (11.2 down from 13)
      const box = new THREE.Box3().setFromObject(excavatorModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetScale = maxDim > 0 ? (11.2 / maxDim) : 1;
      excavatorModel.scale.set(targetScale, targetScale, targetScale);

      // Align CHASSIS TRACKS center directly on top of the grid origin cross (+)
      const chassisMesh = excavatorModel.getObjectByName('Cube005') || excavatorModel;
      const chassisBox = new THREE.Box3().setFromObject(chassisMesh);
      const chassisCenter = chassisBox.getCenter(new THREE.Vector3());

      excavatorModel.position.set(
        gridX - chassisCenter.x * targetScale + 2.5,
        -box.min.y * targetScale,
        gridZ - chassisCenter.z * targetScale + 2.0
      );

      // Convert Materials to PBR Standard Materials
      excavatorModel.traverse((child) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          const newMaterials = materials.map(mat => {
            const newMat = new THREE.MeshStandardMaterial({
              name: mat.name,
              color: mat.color ? mat.color.clone() : new THREE.Color(0xcccccc),
              roughness: 0.4,
              metalness: 0.1
            });
            
            if (newMat.color.r > 0.4 && newMat.color.g < 0.25) {
              newMat.color.setHex(0xF7B500); // Yellow paint
              newMat.roughness = 0.3;
              newMat.metalness = 0.1;
            } else if (mat.name.toLowerCase().includes('track') || mat.name.includes('007') || mat.name.includes('033') || mat.name.includes('032') || (newMat.color.r < 0.1 && newMat.color.g < 0.1 && newMat.color.b < 0.1)) {
              newMat.color.setHex(0x1a1a1a); // Tracks & black trim
              newMat.roughness = 0.8;
              newMat.metalness = 0.7;
            } else if (mat.name.toLowerCase().includes('metal') || mat.name.includes('019') || mat.name.includes('018') || mat.name.includes('024')) {
              newMat.color.setHex(0x777777); // Metallic hydraulics/bucket
              newMat.roughness = 0.25;
              newMat.metalness = 0.85;
            } else if (mat.name.includes('002') || mat.name.toLowerCase().includes('glass')) {
              newMat.color.setHex(0xd0e8ff);
              newMat.transparent = true;
              newMat.opacity = 0.4;
              newMat.roughness = 0.1;
              newMat.metalness = 0.9;
            }
            return newMat;
          });
          
          child.material = Array.isArray(child.material) ? newMaterials : newMaterials[0];
          child.castShadow = !isMobileOrLowEnd;
          child.receiveShadow = !isMobileOrLowEnd;
        }
      });

      // Extract Kinematic Bones
      boneCab = excavatorModel.getObjectByName('Bone005'); // Platform bone
      boneBoom = excavatorModel.getObjectByName('Bone001');
      boneStick = excavatorModel.getObjectByName('Bone003');
      boneBucket = excavatorModel.getObjectByName('Bone004');

      // Parent cabin canopy and hydraulics to Bone005 so they slew seamlessly
      if (boneCab) {
        const reparentList = ['Cube004', 'Cube005', 'Cube006', 'Plane001', 'Cylinder001', 'Cylinder002'];
        reparentList.forEach(name => {
          const mesh = excavatorModel.getObjectByName(name);
          if (mesh) boneCab.attach(mesh);
        });
      }

      scene.add(excavatorModel);

      // Force proper dimensions and matrix calculation
      onWindowResize();

      // Check current route: show viewer if on home, otherwise hide
      const currentRoute = window.location.hash || '#/home';
      if (currentRoute === '#/home' || currentRoute.startsWith('#/home#') || currentRoute === '#' || !currentRoute) {
        showViewer();
      } else {
        hideViewer();
      }
    },
    undefined,
    (error) => {
      console.error('Error loading FBX model:', error);
    }
  );

  // Setup IntersectionObserver to pause rendering when scrolled offscreen
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting = entry.isIntersecting;
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  }

  window.addEventListener('resize', onWindowResize, { passive: true });
}

// Lerp Helper
const lerp = (curr, target, rate) => curr + (target - curr) * rate;

// Main Render Loop (Optimized Desktop Cursor Tracking vs Mobile 360° Background Auto-Rotation)
function animate() {
  if (!isAnimating || !camera || !renderer) return;
  animationFrameId = requestAnimationFrame(animate);

  // Skip rendering if scrolled off-screen or tab is hidden to save 100% CPU/GPU!
  if (!isIntersecting || document.hidden) return;

  time += 0.015;
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    // --- MOBILE MODE: Background 360° Auto-Rotation & Gentle Hover (Zero Cursor Tracking) ---
    if (excavatorModel) {
      excavatorModel.rotation.y += 0.008; // Smooth 360 rotation in background
      excavatorModel.position.y = Math.sin(time * 1.5) * 0.25; // Floating bobbing effect
    }

    // Set gentle working posture for mobile background model
    if (boneCab) boneCab.rotation.y = 0;
    if (boneBoom) boneBoom.rotation.x = baseRotations.boomX + THREE.MathUtils.degToRad(Math.sin(time * 0.8) * 8);
    if (boneStick) boneStick.rotation.x = baseRotations.stickX + THREE.MathUtils.degToRad(8);
    if (boneBucket) boneBucket.rotation.x = baseRotations.bucketX + THREE.MathUtils.degToRad(-15);
  } else {
    // --- DESKTOP MODE: Full 1:1 Cursor Tracking, Puppy Wiggle & Snatch (100% Untouched) ---
    const normX = mouse.x;
    const normY = mouse.y;

    let desiredYawDeg = normX * 55;
    let desiredBoomPitch = -normY * 25 + 5;
    let desiredStickPitch = -normY * 22 + 8;
    let desiredBucketPitch = normY * 35 - 10;

    const modelCenterX = 0.55;
    const modelCenterY = 0.10;
    const distToModel = Math.hypot(normX - modelCenterX, normY - modelCenterY);

    if (distToModel < 0.45) {
      const puppyWiggle = Math.sin(time * 18.0) * 14.0;
      const happyBounce = Math.abs(Math.sin(time * 14.0)) * 8.0;
      
      desiredYawDeg += puppyWiggle;
      desiredBoomPitch += happyBounce;
    }

    if (isClickGrabbing) {
      grabAnimationProgress += 0.08;

      if (grabAnimationProgress < 1.0) {
        desiredBoomPitch -= 8;
        desiredStickPitch += 15;
        desiredBucketPitch = 65;
      } else if (grabAnimationProgress < 2.0) {
        desiredBoomPitch += 20;
        desiredStickPitch -= 10;
        desiredBucketPitch = 65;
      } else {
        isClickGrabbing = false;
      }
    }

    const lerpSpeed = isClickGrabbing ? 0.12 : 0.06;
    currentCabYaw = lerp(currentCabYaw, desiredYawDeg, lerpSpeed);
    currentBoomPitch = lerp(currentBoomPitch, desiredBoomPitch, lerpSpeed);
    currentStickPitch = lerp(currentStickPitch, desiredStickPitch, lerpSpeed);
    currentBucketPitch = lerp(currentBucketPitch, desiredBucketPitch, lerpSpeed);

    if (boneCab) {
      boneCab.rotation.y = THREE.MathUtils.degToRad(currentCabYaw);
    }
    if (boneBoom) {
      boneBoom.rotation.x = baseRotations.boomX + THREE.MathUtils.degToRad(currentBoomPitch);
    }
    if (boneStick) {
      boneStick.rotation.x = baseRotations.stickX + THREE.MathUtils.degToRad(currentStickPitch);
    }
    if (boneBucket) {
      boneBucket.rotation.x = baseRotations.bucketX + THREE.MathUtils.degToRad(currentBucketPitch);
    }

    if (excavatorModel) {
      excavatorModel.position.y = Math.sin(time * 1.2) * 0.12;
    }
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = document.getElementById('canvas-container');
  if (!container || !renderer || !camera) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;
  if (!width || !height) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    camera.fov = 52;
    camera.position.set(0, 14, 26);
    camera.lookAt(0, 1.0, 0);
  } else {
    camera.fov = 40;
    camera.position.set(18, 14, 22);
    camera.lookAt(-2.5, 1.5, 2.0);
  }

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Router Callbacks
export function showViewer() {
  const container = document.getElementById('canvas-container');
  if (container) {
    container.classList.remove('viewer-hidden', 'hidden-viewer');
    container.classList.add('viewer-active');
    // Clear legacy inline styles that might interfere
    container.style.removeProperty('display');
    container.style.removeProperty('opacity');
    container.style.removeProperty('visibility');
    container.style.removeProperty('pointer-events');
  }
  
  isIntersecting = true;

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  window.addEventListener('mousedown', handleMouseDown, { passive: true });
  window.addEventListener('touchstart', handleMouseDown, { passive: true });

  if (!camera || !renderer) {
    initViewer();
  } else {
    onWindowResize();
    setTimeout(() => {
      onWindowResize();
    }, 60);
  }

  if (!isAnimating) {
    isAnimating = true;
    animate();
  }
}

export function hideViewer() {
  const container = document.getElementById('canvas-container');
  if (container) {
    container.classList.remove('viewer-active');
    container.classList.add('viewer-hidden');
    container.style.removeProperty('display');
    container.style.removeProperty('opacity');
    container.style.removeProperty('visibility');
    container.style.removeProperty('pointer-events');
  }
  isAnimating = false;
  cancelAnimationFrame(animationFrameId);

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('mousedown', handleMouseDown);
  window.removeEventListener('touchstart', handleMouseDown);

  const panel = document.querySelector('.dev-controls');
  if (panel) panel.remove();
}

