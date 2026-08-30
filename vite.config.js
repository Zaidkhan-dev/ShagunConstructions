import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.fbx'],
  server: {
    port: 3000,
    host: true
  }
});
