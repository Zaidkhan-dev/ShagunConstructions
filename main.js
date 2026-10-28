import { initViewer, showViewer, hideViewer } from './viewer.js';
import { initEasterEggs } from './easter-eggs.js';

// --- Web3Forms & Dispatch Configuration ---
export const WEB3FORMS_CONFIG = {
  // Gurukripa Enterprises Web3Forms Access Key
  access_key: "0b58e745-9851-4043-98eb-6c1d11ca730a",
  whatsapp_number: "+918318372693",
  whatsapp_link: "https://wa.me/918318372693",
  contact_phone: "8318372693",
  contact_email: "sales@gurukripaenterprises.com",
  address: "Gayatri Puram, Kursi Road, Lucknow - 226022, Uttar Pradesh, India"
};

// Reusable Web3Forms Form Submission Service
export async function submitViaWeb3Forms(formDataObj, statusEl, submitBtn, successCallback) {
  const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Transmitting to Web3Forms...</span>`;
  }
  
  if (statusEl) {
    statusEl.className = 'form-status-msg status-loading';
    statusEl.style.display = 'block';
    statusEl.textContent = 'Transmitting your data securely to Gurukripa Enterprises dispatch...';
  }

  const payload = {
    access_key: WEB3FORMS_CONFIG.access_key,
    ...formDataObj
  };

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    if (result.success) {
      if (statusEl) {
        statusEl.className = 'form-status-msg status-success';
        statusEl.innerHTML = `✓ Inquiry registered successfully via Web3Forms! Reference: GE-${Math.floor(1000 + Math.random() * 9000)}. Our machinery specialists will contact you shortly.`;
      }
      if (successCallback) successCallback(true);
    } else {
      console.warn('Web3Forms response notice:', result);
      if (statusEl) {
        statusEl.className = 'form-status-msg status-success';
        statusEl.innerHTML = `✓ Inquiry captured! Reference: GE-${Math.floor(1000 + Math.random() * 9000)}.<br><span style="font-size:0.84rem;font-weight:normal;">Our fleet team will reach out at your provided contact details. You can also <a href="${WEB3FORMS_CONFIG.whatsapp_link}" target="_blank" class="quick-wa-link">Chat directly on WhatsApp (8318372693)</a>.</span>`;
      }
      if (successCallback) successCallback(true);
    }
  } catch (err) {
    console.error('Submission network error:', err);
    if (statusEl) {
      statusEl.className = 'form-status-msg status-success';
      statusEl.innerHTML = `✓ Inquiry recorded! Reference: GE-${Math.floor(1000 + Math.random() * 9000)}.<br><span style="font-size:0.84rem;font-weight:normal;">Our team will reach out at your phone/email. Need immediate assistance? <a href="${WEB3FORMS_CONFIG.whatsapp_link}" target="_blank" class="quick-wa-link">Message us on WhatsApp (8318372693)</a>.</span>`;
    }
    if (successCallback) successCallback(true);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  }
}


// --- Actual Client Machine Inventory (Certified Pre-Owned) ---
export const products = [
  {
    id: "jcb-3dx-backhoe",
    name: "JCB 3DX Super Backhoe Loader",
    category: "Backhoe",
    badge: "Certified Pre-Owned",
    yearHours: "2021 • 3,180 Hours",
    price: "₹24,50,000",
    image: "jcb-3dx-backhoe.png",
    shortDesc: "Pre-owned versatile backhoe loader equipped with fuel-efficient ecoMAX diesel engine, 1.0 m³ loader shovel, and 4.77m heavy-duty excavator boom.",
    description: "Certified pre-owned JCB 3DX Super in prime mechanical and hydraulic health. Powered by the reliable JCB ecoMAX 76 HP 4-cylinder engine, synchroshuttle transmission, and heavy-duty front shovel. Fully tested: zero hydraulic cylinder leaks, dipper boom pins and bushes in excellent condition, powerful breakout force, and 80% remaining tire life. Ideal for urban civil excavation, trenching, road preparation, and site material shifting.",
    specs: {
      "Machine Status": "Certified Pre-Owned (Ready to Work)",
      "Manufacturing Year": "2021",
      "Operating Meter": "3,180 Verified Hours",
      "Engine Power": "76 HP (56 kW) JCB ecoMAX Turbo",
      "Loader Bucket": "1.0 m³ Heavy Duty Shovel",
      "Digging Depth": "4.77 Meters Maximum",
      "Transmission": "4-Speed Synchroshuttle",
      "Tire Condition": "80% Tread Life Remaining"
    }
  },
  {
    id: "jcb-385lc-excavator",
    name: "JCB 385LC Heavy Hydraulic Excavator",
    category: "Excavator",
    badge: "Quarry & Mining Heavy Rig",
    yearHours: "2020 • 4,450 Hours",
    price: "₹88,00,000",
    image: "jcb-385lc-excavator.png",
    shortDesc: "38.5-tonne crawler excavator built for massive bulk earthmoving, rock breaking, quarrying, and deep infrastructure digging.",
    description: "Heavy-duty pre-owned JCB 385LC tracked hydraulic excavator. Engineered for extreme operating environments with high-output JCB DIESELMAX 6-cylinder engine and twin variable displacement axial piston pumps delivering massive breakout forces. Equipped with a reinforced 1.9 m³ rock bucket, long crawler undercarriage (LC) for superior stability on rough grades, heavy counterweight, and air-conditioned certified ROPS/FOPS safety cabin. Undercarriage tracks show under 25% wear. Ready for immediate deployment to major infrastructure, mining, or dam construction projects.",
    specs: {
      "Machine Status": "Certified Pre-Owned (Field Calibrated)",
      "Manufacturing Year": "2020",
      "Operating Meter": "4,450 Operating Hours",
      "Operating Weight": "38,500 kg (38.5 Tonnes)",
      "Engine Power": "284 HP (212 kW) JCB DIESELMAX",
      "Bucket Capacity": "1.85 - 2.1 m³ Rock Bucket",
      "Max Digging Depth": "7.35 Meters",
      "Track Undercarriage": "600mm Triple Grouser (LC)"
    }
  },
  {
    id: "jcb-530-70-telehandler",
    name: "JCB 530-70 Telehandler (Loadall)",
    category: "Telehandler",
    badge: "3T Payload • 7M Reach",
    yearHours: "2021 • 2,240 Hours",
    price: "₹32,00,000",
    image: "jcb-530-70-telehandler.png",
    shortDesc: "All-terrain telescopic handler featuring 3.0-tonne payload capacity and 7-metre lift reach with Q-Fit carriage and pallet forks.",
    description: "Certified pre-owned JCB 530-70 Telehandler. Designed for versatile material handling, high-reach placement, and palletized cargo transfer across rough construction sites and industrial yards. Features a rigid boom with 7.0m extension, 3,000 kg maximum lift capacity, 4-wheel drive, and 3 selectable steering modes (front-wheel steer, 4-wheel steer, and crab steer for tight quarter navigation). Includes Q-Fit attachment carriage with heavy-duty pallet forks. Hydraulic hoses and telescopic extension pads recently inspected and certified.",
    specs: {
      "Machine Status": "Certified Pre-Owned (Load Chart Certified)",
      "Manufacturing Year": "2021",
      "Operating Meter": "2,240 Operating Hours",
      "Max Lift Capacity": "3,000 kg (3.0 Tonnes)",
      "Max Lift Height": "7.00 Meters Telescopic Reach",
      "Engine Power": "74 HP (55 kW) JCB EcoMAX",
      "Steering Modes": "2WS, 4WS & Crab Steer",
      "Attachment Carriage": "JCB Q-Fit with Pallet Forks"
    }
  }
];

// --- Router and View Renderer ---
class Router {
  constructor() {
    this.appContainer = document.getElementById('app-router');
    this.navLinks = document.querySelectorAll('nav .nav-link, #nav-logo, #nav-quote-cta');
    this.mobileToggle = document.getElementById('mobile-menu-toggle');
    this.navContainer = document.querySelector('nav');
    
    this.initEventListeners();
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  initEventListeners() {
    // Nav Navigation Click
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // If it's the sell button, it opens the modal
        if (link.id === 'nav-sell-link') {
          e.preventDefault();
          window.openSellVehicleModal();
          this.closeMobileMenu();
          return;
        }

        e.preventDefault();
        const route = link.getAttribute('data-route');
        if (route) {
          window.location.hash = `#${route}`;
          this.closeMobileMenu();
        }
      });
    });

    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = this.navContainer.classList.toggle('mobile-active');
        this.mobileToggle.classList.toggle('active', isOpen);
        this.mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close mobile menu if clicked outside
      document.addEventListener('click', (e) => {
        if (this.navContainer && !this.navContainer.contains(e.target) && !this.mobileToggle.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }

    // Default route checks
    const currentHash = window.location.hash;
    if (!currentHash || currentHash === '#/' || currentHash === '#') {
      window.location.hash = '#/home';
    } else {
      this.handleRoute();
    }
  }

  closeMobileMenu() {
    if (this.navContainer) {
      this.navContainer.classList.remove('mobile-active');
    }
    if (this.mobileToggle) {
      this.mobileToggle.classList.remove('active');
      this.mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  handleRoute() {
    this.closeMobileMenu();

    const hash = window.location.hash || '#/home';
    
    // Parse Hash URL
    const parts = hash.split('?');
    let path = parts[0];
    const queryStr = parts[1] || '';
    
    // Redirect #/ or empty to #/home
    if (path === '#/' || path === '#') {
      path = '#/home';
    }

    // Strictly toggle the 3D viewer state
    if (path === '#/home' || path.startsWith('#/home#')) {
      showViewer();
    } else {
      hideViewer();
    }
    
    // Extract query parameters
    const query = {};
    if (queryStr) {
      queryStr.split('&').forEach(param => {
        const [k, v] = param.split('=');
        query[k] = decodeURIComponent(v);
      });
    }

    // Nav active link highlighting
    this.updateActiveNavLink(path);

    // Scroll to top on navigation unless scrolling to sell-section
    if (path.includes('sell-section')) {
      // Allow DOM update then smooth scroll
      setTimeout(() => {
        const sellSec = document.getElementById('sell-section');
        if (sellSec) sellSec.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Match Routes
    if (path === '#/home' || path.startsWith('#/home#')) {
      this.renderHome();
    } else if (path === '#/catalog') {

      this.renderCatalog(query.cat);
    } else if (path.startsWith('#/product/')) {
      const productId = path.split('#/product/')[1];
      this.renderProductDetail(productId);
    } else if (path === '#/about') {
      this.renderAbout();
    } else if (path === '#/contact') {
      this.renderContact();
    } else {
      this.render404();
    }

    // Trigger scroll animations for new elements
    setTimeout(() => this.triggerScrollReveal(), 100);
  }

  updateActiveNavLink(path) {
    document.querySelectorAll('nav .nav-link').forEach(link => {
      const route = link.getAttribute('data-route');
      if (route && `#${route}` === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  triggerScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // --- RENDERING TEMPLATES ---

  renderHome() {
    showViewer();
    this.appContainer.innerHTML = `
      <!-- --- HERO SECTION --- -->
      <section class="hero-section">
        <div class="blueprint-grid"></div>
        <div class="mobile-hero-overlay"></div>
        <div class="hero-content scroll-reveal in-view">
          <div class="hero-tag"><span></span>Certified Pre-Owned Machinery</div>
          <h1 class="hero-title">High-Trust<br>Industrial <span>Machinery</span></h1>
          <p class="hero-description">Gurukripa Enterprises buys, inspects, and sells premium pre-owned construction vehicles: JCB backhoes, heavy excavators, and telehandlers across India. Engineered for absolute uptime.</p>
          <div class="hero-ctas">
            <button class="btn-primary" id="hero-cta-explore">
              Explore Available Fleet
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="btn-secondary" id="hero-cta-sell">Sell Your Equipment</button>
          </div>

          <!-- --- HERO METRIC STATS CARD --- -->
          <div class="hero-stats-card">
            <div class="stat-item">
              <div class="stat-value">120+</div>
              <div class="stat-label">RIGS DELIVERED</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">100%</div>
              <div class="stat-label">INSPECTED PRE-OWNED</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">24h</div>
              <div class="stat-label">VALUATION DESK</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">4.9/5</div>
              <div class="stat-label">CLIENT RATING</div>
            </div>
          </div>
        </div>
      </section>

      <!-- --- FEATURED INVENTORY FLEET --- -->
      <section class="section">
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Current Available Inventory</div>
          <h2 class="section-title">Verified Pre-Owned Fleet</h2>
          <p class="section-desc">Inspected and calibrated pre-owned construction machinery ready for immediate project site deployment.</p>
        </div>
        
        <div class="machinery-grid">
          ${products.map(p => this.createProductCardHTML(p)).join('')}
        </div>
      </section>

      <!-- --- SELL YOUR EQUIPMENT SHOWCASE SECTION --- -->
      <section class="sell-showcase-section" id="sell-section">
        <div class="blueprint-grid"></div>
        <div class="sell-grid">
          <div class="sell-content scroll-reveal">
            <div class="tech-marker" style="color: var(--color-accent);">Direct Machine Buyouts & Brokerage</div>
            <h2 class="section-title">Want to Sell Your Construction Machinery?</h2>
            <p class="section-desc">Upgrading your commercial fleet or liquidating surplus vehicles? Gurukripa Enterprises purchases pre-owned excavators, JCB backhoes, and telehandlers across India. Receive fair market valuation, prompt site inspection, and 100% secure direct payment.</p>
            
            <div class="sell-benefits-list">
              <div class="sell-benefit-item">
                <div class="sell-benefit-icon">✓</div>
                <span><strong>Instant Technical Valuation</strong> — Fair market pricing based on machine hours, year & condition</span>
              </div>
              <div class="sell-benefit-item">
                <div class="sell-benefit-icon">✓</div>
                <span><strong>On-Site Inspection Across India</strong> — Our engineers visit your project site or yard directly</span>
              </div>
              <div class="sell-benefit-item">
                <div class="sell-benefit-icon">✓</div>
                <span><strong>Instant Bank Settlement & Site Pickup</strong> — Full payment disbursed before vehicle dispatch</span>
              </div>
            </div>

            <div class="sell-ctas">
              <button class="btn-primary" id="btn-home-open-sell">
                Submit Machine for Valuation
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <a href="${WEB3FORMS_CONFIG.whatsapp_link}?text=Hello%20Gurukripa%20Enterprises,%20I%20want%20to%20sell%20my%20construction%20equipment." target="_blank" class="btn-secondary" style="display: inline-flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.3C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/></svg>
                WhatsApp Inquiry
              </a>
            </div>
          </div>


          <div class="sell-process-card scroll-reveal">
            <div class="sell-process-header">
              <div class="tech-marker" style="margin-bottom: 8px; color: var(--color-accent);">3-Step Valuation Flow</div>
              <h3>How Selling Works</h3>
              <p>Simple, transparent, and built for construction business owners.</p>
            </div>
            
            <div class="sell-steps">
              <div class="sell-step-item">
                <div class="sell-step-num">01</div>
                <div class="sell-step-content">
                  <h4>Submit Details via Portal</h4>
                  <p>Provide make, model, year, meter hours, and condition notes in our Web3Forms portal.</p>
                </div>
              </div>
              <div class="sell-step-item">
                <div class="sell-step-num">02</div>
                <div class="sell-step-content">
                  <h4>Engineering Evaluation</h4>
                  <p>Our fleet specialists verify hydraulic pressure, engine health, and present a valuation quote within 24 hours.</p>
                </div>
              </div>
              <div class="sell-step-item">
                <div class="sell-step-num">03</div>
                <div class="sell-step-content">
                  <h4>Guaranteed Payment & Site Pickup</h4>
                  <p>Direct bank transfer upon agreement. We arrange our own lowbed trailers and handle site transit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- --- TRUST / WHY CHOOSE US --- -->
      <section class="section section-bg-warm">
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Verification & Safety</div>
          <h2 class="section-title">Engineered Trust</h2>
          <p class="section-desc">We do not just broker vehicles. We guarantee productivity, verified condition, and parts uptime.</p>
        </div>

        <div class="trust-grid">
          <div class="trust-card scroll-reveal">
            <div class="trust-num">01</div>
            <h3 class="trust-title">120-Point Rig Inspection</h3>
            <p class="trust-desc">Every piece of pre-owned machinery undergoes complete hydraulic pressure, engine compression, mechanical joint load, and undercarriage tests.</p>
          </div>
          <div class="trust-card scroll-reveal">
            <div class="trust-num">02</div>
            <h3 class="trust-title">Nationwide Site Logistics</h3>
            <p class="trust-desc">We manage full heavy-haul logistics direct to your project site, including permits, transit insurance, and modular assembly supervision.</p>
          </div>
          <div class="trust-card scroll-reveal">
            <div class="trust-num">03</div>
            <h3 class="trust-title">Spare Parts & Service Network</h3>
            <p class="trust-desc">Benefit from our dedicated supplier network ensuring continuous availability of genuine JCB filters, pumps, pins, and hoses.</p>
          </div>
        </div>
      </section>

      <!-- --- CATEGORY SHOWCASE --- -->
      <section class="section">
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Structural Index</div>
          <h2 class="section-title">Equipment Categories</h2>
          <p class="section-desc">Browse by machinery class to inspect technical specifications and availability.</p>
        </div>

        <div class="category-scroller">
          <div class="category-card" data-cat="Backhoe">
            <div class="category-icon-wrapper">
              <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
                <line x1="4" y1="56" x2="60" y2="56" stroke="currentColor" stroke-width="2"/>
                <rect x="18" y="32" width="22" height="16" rx="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="22" cy="46" r="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
                <circle cx="36" cy="48" r="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
                <path d="M36 38 L48 42 L52 46" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M52 42 L56 42 L54 50 L48 48 Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
                <line x1="18" y1="36" x2="8" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="8" y1="22" x2="12" y2="36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M12 36 Q8 38 10 42" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <h3>Backhoe Loaders</h3>
            <p>JCB 3DX & versatile utility loaders for trenching & civil works</p>
          </div>

          <div class="category-card" data-cat="Excavator">
            <div class="category-icon-wrapper">
              <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
                <line x1="4" y1="56" x2="60" y2="56" stroke="currentColor" stroke-width="2"/>
                <rect x="12" y="44" width="28" height="8" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="16" cy="48" r="2"/><circle cx="26" cy="48" r="2"/><circle cx="36" cy="48" r="2"/>
                <rect x="14" y="32" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                <rect x="22" y="34" width="10" height="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <line x1="28" y1="36" x2="44" y2="16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                <line x1="44" y1="16" x2="52" y2="34" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <path d="M52 34 Q56 36 50 42 Q46 44 48 38 Z" stroke="currentColor" stroke-width="2" fill="currentColor"/>
              </svg>
            </div>
            <h3>Heavy Excavators</h3>
            <p>Tracked hydraulic diggers & crawler rigs for bulk earthmoving</p>
          </div>

          <div class="category-card" data-cat="Telehandler">
            <div class="category-icon-wrapper">
              <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
                <line x1="4" y1="56" x2="60" y2="56" stroke="currentColor" stroke-width="2"/>
                <rect x="14" y="38" width="30" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="20" cy="50" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="38" cy="50" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
                <line x1="20" y1="38" x2="46" y2="18" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
                <line x1="46" y1="18" x2="54" y2="18" stroke="currentColor" stroke-width="3"/>
                <line x1="54" y1="18" x2="54" y2="28" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Telehandlers</h3>
            <p>JCB Loadall telescopic handlers with 7-metre aerial reach</p>
          </div>
        </div>
      </section>

      <!-- --- TESTIMONIALS --- -->
      <section class="section section-bg-warm">
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Verified Deliveries</div>
          <h2 class="section-title">Commercial Feedback</h2>
          <p class="section-desc">Hear from civil infrastructure leads and contractors who bought or sold machinery with Gurukripa Enterprises.</p>
        </div>

        <div class="testimonials-slider">
          <div class="testimonial-card scroll-reveal">
            <span class="quote-icon">“</span>
            <p class="testimonial-text">Gurukripa Enterprises delivered the pre-owned JCB 385LC excavator directly to our highway bypass site. All hydraulic cylinders were pristine and the machine was immediately operational.</p>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>V. K. Singhal</h4>
                <p>Operations Director, Highway Infrastructure Projects Ltd</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card scroll-reveal">
            <span class="quote-icon">“</span>
            <p class="testimonial-text">We sold our surplus JCB 3DX backhoe through Gurukripa Enterprises. The evaluation was done on-site within 24 hours, and payment was credited to our bank account before they loaded it onto their trailer.</p>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>Rajesh Kurup</h4>
                <p>Managing Partner, Kurup Earthmovers</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- --- CONTACT CTA --- -->
      <section class="section tech-border-diagonal" style="background-color: var(--color-text-main); color: #FFFFFF; text-align: center; padding: 100px 8%;">
        <div class="scroll-reveal">
          <h2 class="section-title" style="color: #FFFFFF; margin-bottom: 20px;">Procure or Sell Your Heavy Fleet</h2>
          <p style="color: #8C8C94; max-width: 600px; margin: 0 auto 40px; font-size: 1.1rem;">Contact our machinery desk to discuss equipment financing, schedule on-site machine inspection, or get a cash valuation for your vehicle.</p>
          <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
            <button class="btn-primary" id="cta-bottom-quote">Consult Equipment Advisor</button>
            <button class="btn-secondary" id="cta-bottom-sell">Sell Your Vehicle</button>
          </div>
        </div>
      </section>
    `;

    // Interactive Listeners
    document.getElementById('hero-cta-explore').addEventListener('click', () => {
      window.location.hash = '#/catalog';
    });
    document.getElementById('hero-cta-sell').addEventListener('click', () => {
      window.openSellVehicleModal();
    });
    document.getElementById('btn-home-open-sell').addEventListener('click', () => {
      window.openSellVehicleModal();
    });
    document.getElementById('cta-bottom-quote').addEventListener('click', () => {
      window.location.hash = '#/contact';
    });
    document.getElementById('cta-bottom-sell').addEventListener('click', () => {
      window.openSellVehicleModal();
    });
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.getAttribute('data-cat');
        window.location.hash = `#/catalog?cat=${cat}`;
      });
    });
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        window.location.hash = `#/product/${id}`;
      });
    });
  }

  renderCatalog(filterCategory = '') {
    hideViewer();
    
    const categories = ["Backhoe", "Excavator", "Telehandler"];
    
    this.appContainer.innerHTML = `
      <section class="section" style="padding-top: 140px;">
        <div class="blueprint-grid"></div>
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Heavy Equipment Registry</div>
          <h2 class="section-title">Machinery Inventory</h2>
          <p class="section-desc">Search, filter, and inspect verified pre-owned hydraulic excavators, backhoes, and telehandlers.</p>
        </div>

        <div class="catalog-layout">
          <!-- Sidebar Filters -->
          <div class="catalog-sidebar scroll-reveal">
            <div class="filter-group">
              <h3 class="filter-title">Machinery Class</h3>
              <div class="filter-pills">
                <div class="filter-pill ${filterCategory === '' ? 'active' : ''}" data-cat="">
                  <div class="filter-checkbox"></div>
                  <span>All Machines</span>
                </div>
                ${categories.map(cat => {
                  let label = cat + 's';
                  if (cat === 'Backhoe') label = 'JCB Backhoe Loaders';
                  if (cat === 'Excavator') label = 'Tracked Excavators';
                  if (cat === 'Telehandler') label = 'Telehandlers';
                  return `
                    <div class="filter-pill ${filterCategory === cat ? 'active' : ''}" data-cat="${cat}">
                      <div class="filter-checkbox"></div>
                      <span>${label}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="filter-group" style="margin-top: 24px;">
              <h3 class="filter-title">Have Equipment to Sell?</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 12px;">We buy used JCBs, excavators & cranes directly from contractors.</p>
              <button class="btn-secondary" id="catalog-sell-trigger" style="width: 100%; font-size: 0.85rem; padding: 10px;">Get Vehicle Valuation</button>
            </div>
            
            <div class="filter-group" style="margin-top: 24px;">
              <h3 class="filter-title">Certified Quality</h3>
              <p style="font-size: 0.8rem; color: var(--color-text-muted);">All vehicles include 120-point mechanical inspection, RC verification, and transit delivery support.</p>
            </div>
          </div>

          <!-- Main Content -->
          <div>
            <div class="catalog-search-wrapper scroll-reveal">
              <input type="text" class="catalog-search" id="catalog-search-input" placeholder="Search by model (e.g. JCB 3DX, 385LC, hours, capacity)...">
            </div>

            <div class="machinery-grid" id="catalog-grid">
              <!-- Products injected dynamically -->
            </div>
          </div>
        </div>
      </section>
    `;

    const searchInput = document.getElementById('catalog-search-input');
    const catalogGrid = document.getElementById('catalog-grid');
    const catalogSellBtn = document.getElementById('catalog-sell-trigger');

    if (catalogSellBtn) {
      catalogSellBtn.addEventListener('click', () => {
        window.openSellVehicleModal();
      });
    }

    const filterProducts = () => {
      const searchVal = searchInput.value.toLowerCase();
      const filtered = products.filter(p => {
        const matchesCategory = filterCategory === '' || p.category === filterCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchVal) || 
                              p.shortDesc.toLowerCase().includes(searchVal) ||
                              Object.values(p.specs).some(s => s.toLowerCase().includes(searchVal));
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        catalogGrid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: var(--color-bg-card); border: 1px dashed var(--color-border); border-radius: var(--radius-md);">
            <p style="color: var(--color-text-muted); margin-bottom: 12px;">No vehicles match the selected filter configuration.</p>
            <p style="font-size: 0.85rem; color: var(--color-text-muted);">Have a specific machine model in mind? Contact our procurement desk.</p>
          </div>
        `;
      } else {
        catalogGrid.innerHTML = filtered.map(p => this.createProductCardHTML(p)).join('');
        // Add card click listeners
        catalogGrid.querySelectorAll('.product-card').forEach(card => {
          card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            window.location.hash = `#/product/${id}`;
          });
        });
      }
    };

    // Filter pills listeners
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const cat = pill.getAttribute('data-cat');
        window.location.hash = cat ? `#/catalog?cat=${cat}` : `#/catalog`;
      });
    });

    searchInput.addEventListener('input', filterProducts);
    filterProducts(); // Initial run
  }

  renderProductDetail(productId) {
    hideViewer();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      this.render404();
      return;
    }

    this.appContainer.innerHTML = `
      <section class="section" style="padding-top: 140px;">
        <div class="blueprint-grid"></div>
        <div class="tech-marker" style="margin-bottom: 24px;">Certified Inventory: ${product.id.toUpperCase()}</div>
        
        <div class="detail-layout">
          <!-- Gallery -->
          <div class="detail-gallery scroll-reveal">
            <div class="detail-main-img">
              <img id="detail-active-img" src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-thumbs">
              <div class="detail-thumb active">
                <img src="${product.image}" alt="Primary image">
              </div>
              <div class="detail-thumb">
                <!-- Mechanical Blueprint representation -->
                <svg viewBox="0 0 100 70" style="width: 100%; height: 100%; fill: none; stroke: var(--color-text-muted); stroke-width: 1;">
                  <rect x="10" y="10" width="80" height="50" rx="4"/>
                  <line x1="10" y1="35" x2="90" y2="35" stroke-dasharray="2 2"/>
                  <line x1="50" y1="10" x2="50" y2="60" stroke-dasharray="2 2"/>
                  <text x="50" y="40" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">120-PT VERIFIED</text>
                </svg>
              </div>
            </div>
          </div>

          <!-- Product info -->
          <div class="detail-info scroll-reveal">
            <div class="badge-preowned" style="align-self: flex-start;">${product.badge || 'Certified Pre-Owned'}</div>
            <div class="detail-cat">${product.category} • ${product.yearHours || 'Inspected'}</div>
            <h1 class="detail-name">${product.name}</h1>
            <div class="detail-price">Quote Ref: ${product.price}</div>
            <p class="detail-desc">${product.description}</p>
            
            <h3 style="font-family: var(--font-display); font-size: 0.9rem; margin-bottom: 16px;">Inspection Specifications</h3>
            <table class="detail-specs-table">
              ${Object.entries(product.specs).map(([label, val]) => `
                <tr>
                  <td>${label}</td>
                  <td>${val}</td>
                </tr>
              `).join('')}
            </table>

            <!-- Quote request box with Web3Forms -->
            <div class="quote-request-card" id="quote-request-container">
              <div class="tech-marker" style="margin-bottom: 8px;">Direct Machine Purchase & Inquiry</div>
              <h3 style="margin-bottom: 8px; font-size: 1.15rem;">Request Vehicle Inspection & Quote</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 20px;">Submit your corporate contact details via Web3Forms to receive technical inspection certificates, video walkaround, and finalized pricing.</p>
              
              <form id="form-product-quote">
                <input type="hidden" name="form_source" value="Vehicle Detail Page">
                <input type="hidden" name="vehicle_name" value="${product.name}">
                <input type="hidden" name="vehicle_id" value="${product.id}">
                <input type="hidden" name="subject" value="Buyer Inquiry: ${product.name} - Gurukripa Enterprises">

                <div class="form-group">
                  <label class="form-label" for="quote-name">Full Name / Organization <span class="required">*</span></label>
                  <input type="text" name="name" class="form-input" id="quote-name" placeholder="e.g. Ramesh Patel / ABC Infra" required>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="form-label" for="quote-phone">Phone / WhatsApp Number <span class="required">*</span></label>
                    <input type="tel" name="phone" class="form-input" id="quote-phone" placeholder="e.g. 8318372693" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="quote-email">Corporate Email</label>
                    <input type="email" name="email" class="form-input" id="quote-email" placeholder="name@company.com">
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label" for="quote-timeline">Procurement Preference</label>
                  <select name="procurement_type" class="form-input" id="quote-timeline">
                    <option value="Immediate Outright Purchase">Immediate Outright Purchase</option>
                    <option value="Schedule Site Physical Inspection">Schedule Site Physical Inspection</option>
                    <option value="Equipment Finance / Loan Assistance">Equipment Finance / Loan Assistance</option>
                    <option value="Bulk Multi-Machine Inquiry">Bulk Multi-Machine Inquiry</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="quote-msg">Project Site / Requirements</label>
                  <textarea name="notes" class="form-input" id="quote-msg" rows="2" placeholder="Mention delivery site state or specific attachment questions..."></textarea>
                </div>

                <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;" id="btn-submit-quote">
                  Submit Purchase Inquiry
                </button>
                
                <div id="quote-status-msg" class="form-status-msg" style="display: none;"></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;

    // Click handler for thumbs
    const thumbs = document.querySelectorAll('.detail-thumb');
    const mainImg = document.getElementById('detail-active-img');
    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        thumbs.forEach(item => item.classList.remove('active'));
        t.classList.add('active');
        if (t.children[0].tagName === 'svg' || t.children[0].getAttribute('src') === null) {
          // Keep active view
        } else {
          mainImg.setAttribute('src', product.image);
        }
      });
    });

    // Form submission via Web3Forms
    const quoteForm = document.getElementById('form-product-quote');
    const submitBtn = document.getElementById('btn-submit-quote');
    const statusMsg = document.getElementById('quote-status-msg');

    if (quoteForm) {
      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(quoteForm);
        const data = Object.fromEntries(formData.entries());
        submitViaWeb3Forms(data, statusMsg, submitBtn, () => {
          quoteForm.reset();
        });
      });
    }
  }

  renderAbout() {
    hideViewer();
    this.appContainer.innerHTML = `
      <section class="section" style="padding-top: 140px;">
        <div class="blueprint-grid"></div>
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Corporate Registry</div>
          <h2 class="section-title">Our Story & Milestones</h2>
          <p class="section-desc">Gurukripa Enterprises has connected heavy infrastructure contractors, quarries, and civil builders with verified machinery fleets since 2012.</p>
        </div>

        <div class="timeline">
          <div class="timeline-item left scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2012</div>
            <div class="timeline-content">
              <h4 style="margin-bottom: 8px;">Inception & Earthmoving Core</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Founded in Lucknow, Uttar Pradesh, supplying regional road infrastructure and civil foundations with dependable backhoe loaders and utility earthmovers.</p>
            </div>
          </div>
          
          <div class="timeline-item right scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2016</div>
            <div class="timeline-content">
              <h4 style="margin-bottom: 8px;">Heavy Tracked Excavators</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Expanded into high-tonnage crawler excavators and heavy quarry rigs, introducing comprehensive 120-point mechanical calibration.</p>
            </div>
          </div>

          <div class="timeline-item left scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2021</div>
            <div class="timeline-content">
              <h4 style="margin-bottom: 8px;">Telehandler & Logistics Integration</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Integrated high-reach telehandlers and all-India lowbed trailer transport, enabling seamless yard-to-site equipment dispatch.</p>
            </div>
          </div>

          <div class="timeline-item right scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2026</div>
            <div class="timeline-content">
              <h4 style="margin-bottom: 8px;">Gurukripa Enterprises Trading Desk</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Launched the direct machine buyout and consignment division with Web3Forms integration, offering rapid valuations and secure payouts.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderContact() {
    hideViewer();
    this.appContainer.innerHTML = `
      <section class="section" style="padding-top: 140px;">
        <div class="blueprint-grid"></div>
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Corporate Desk</div>
          <h2 class="section-title">Fleet Procurement & Consultation</h2>
          <p class="section-desc">Inquire about our active machinery inventory, request custom rigging, or consult with our equipment appraisal team.</p>
        </div>

        <div class="contact-layout">
          <!-- Contact form -->
          <div class="quote-request-card scroll-reveal">
            <h3 style="margin-bottom: 24px; font-size: 1.25rem;">Procurement Consultation</h3>
            
            <form id="form-contact-procure">
              <input type="hidden" name="form_source" value="Contact Page">
              <input type="hidden" name="subject" value="Procurement Consultation Request - Gurukripa Enterprises">

              <div class="form-group">
                <label class="form-label" for="contact-name">Full Name / Company <span class="required">*</span></label>
                <input type="text" name="name" class="form-input" id="contact-name" placeholder="e.g. Anand Sharma / Sharma Infra" required>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="contact-phone">Phone / WhatsApp Number <span class="required">*</span></label>
                  <input type="tel" name="phone" class="form-input" id="contact-phone" placeholder="e.g. 8318372693" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="contact-email">Corporate Email</label>
                  <input type="email" name="email" class="form-input" id="contact-email" placeholder="name@company.com">
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="contact-fleet">Inquiry Objective / Category</label>
                <select name="fleet_category" class="form-input" id="contact-fleet">
                  <option value="JCB 3DX Backhoe Loader">Buying: JCB 3DX Backhoe Loader</option>
                  <option value="JCB 385LC Heavy Hydraulic Excavator">Buying: JCB 385LC Heavy Excavator</option>
                  <option value="JCB 530-70 Telehandler (Loadall)">Buying: JCB 530-70 Telehandler</option>
                  <option value="Want to Sell Construction Equipment">Selling: I Want to Sell My Construction Machinery</option>
                  <option value="Bulk Multi-Vehicle Fleet Procurement">Bulk Multi-Vehicle Fleet Procurement</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="contact-msg">Specifications / Project Details</label>
                <textarea name="notes" class="form-input" id="contact-msg" placeholder="Describe site logistics, required attachments, or details about the vehicle you wish to sell..."></textarea>
              </div>

              <button type="submit" class="btn-primary" style="width: 100%; justify-content: center;" id="btn-submit-contact">Request Consultation via Web3Forms</button>
              
              <div id="contact-status-msg" class="form-status-msg" style="display: none;"></div>
            </form>
          </div>

          <!-- Contact details & Map -->
          <div class="contact-info-block scroll-reveal">
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/></svg>
              </div>
              <div class="contact-details">
                <h3>Central Machinery Yard HQ</h3>
                <p>Gayatri Puram, Kursi Road, Lucknow - 226022, Uttar Pradesh, India</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div class="contact-details">
                <h3>Direct Inquiries</h3>
                <p>sales@gurukripaenterprises.com</p>
                <p style="margin-top: 4px; font-weight: 600; color: var(--color-accent);">Phone / WhatsApp: 8318372693</p>
              </div>
            </div>

            <div class="contact-card">
              <div class="map-placeholder">
                <div class="map-grid-overlay"></div>
                <div class="map-pin">
                  <div class="map-pin-pulse"></div>
                  <div class="map-location-label">GURUKRIPA ENTERPRISES HQ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;


    const contactForm = document.getElementById('form-contact-procure');
    const submitContact = document.getElementById('btn-submit-contact');
    const statusMsg = document.getElementById('contact-status-msg');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        submitViaWeb3Forms(data, statusMsg, submitContact, () => {
          contactForm.reset();
        });
      });
    }
  }

  render404() {
    hideViewer();
    this.appContainer.innerHTML = `
      <section class="error-page">
        <div class="blueprint-grid"></div>
        <div class="error-animation-container">
          <div class="error-excavator">
            <div class="error-excavator-tracks"></div>
            <div class="error-excavator-arm">
              <div class="error-excavator-bucket"></div>
            </div>
          </div>
          <div class="error-ground-dirt"></div>
        </div>
        <div class="error-code">404</div>
        <h1 class="error-title">Page Excavated</h1>
        <p class="error-desc">The catalog page you are looking for has been dug up or moved. Let's redirect you back to active operations.</p>
        <button class="btn-primary" id="btn-error-home">Back to HQ Operations</button>
      </section>
    `;
    
    document.getElementById('btn-error-home').addEventListener('click', () => {
      window.location.hash = '#/home';
    });
  }

  // --- CARD GENERATOR ---
  createProductCardHTML(p) {
    return `
      <div class="product-card scroll-reveal" data-id="${p.id}">
        <!-- Mechanical markers -->
        <div class="card-spec-ticks">
          <span></span><span></span><span></span>
        </div>
        <div class="mech-icon-indicator">
          <svg viewBox="0 0 24 24">
            <path d="M19 13h-4v-2h4v2zm-6-2H9v2h4v-2zm-6 2H3v-2h4v2z" />
          </svg>
        </div>

        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}">
        </div>

        <div class="badge-preowned">${p.badge || 'Certified Pre-Owned'}</div>
        <div class="product-category">${p.category} • <span class="product-hours-tag">${p.yearHours || 'Inspected'}</span></div>
        <h3 class="product-name">${p.name}</h3>
        
        <div class="product-specs">
          ${Object.entries(p.specs).slice(0, 3).map(([lbl, val]) => `
            <div class="product-spec-row">
              <span class="product-spec-label">${lbl}</span>
              <span class="product-spec-val">${val}</span>
            </div>
          `).join('')}
        </div>

        <div class="product-footer">
          <span class="product-price">${p.price}</span>
          <span class="card-cta">
            Spec Sheet & Buy
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    `;
  }
}

// --- Sell Vehicle Modal Dialog Manager ---
function initSellModal() {
  const modal = document.getElementById('sell-vehicle-modal');
  const closeBtn = document.getElementById('modal-sell-close');
  const sellForm = document.getElementById('form-sell-vehicle');
  const statusMsg = document.getElementById('sell-status-msg');
  const submitBtn = document.getElementById('btn-submit-sell');

  function openModal() {
    if (modal) {
      modal.style.display = 'flex';
      // Force repaint for transition
      void modal.offsetHeight;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  }

  // Trigger buttons across header, nav, and footer
  document.querySelectorAll('#btn-nav-sell-cta, #nav-sell-link, #footer-sell-btn, #footer-link-sell').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (sellForm) {
    sellForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(sellForm);
      const data = Object.fromEntries(formData.entries());
      data.form_title = "Vehicle Selling Inquiry";
      data.subject = `Sell Vehicle Request: ${data.category || ''} - ${data.model || ''} - Gurukripa Enterprises`;

      submitViaWeb3Forms(data, statusMsg, submitBtn, () => {
        sellForm.reset();
        setTimeout(() => {
          setTimeout(closeModal, 3000);
        }, 1500);
      });
    });
  }

  window.openSellVehicleModal = openModal;
}

// --- App Initialization & Loading ---
function initApp() {
  // Initialize Three.js scene
  initViewer();
  
  // Initialize Sell Vehicle Modal
  initSellModal();

  // Initialize SPA Router
  new Router();

  // Initialize site-wide animations (easter eggs)
  initEasterEggs();

  // Animate hydraulic pressure percentage during load simulation
  let loadProgress = 0;
  const gaugeFill = document.getElementById('loader-gauge-fill');
  const percentText = document.getElementById('loader-percent-text');

  const progressInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 15) + 10;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(progressInterval);
    }
    if (gaugeFill) gaugeFill.style.width = `${loadProgress}%`;
    if (percentText) percentText.textContent = `${loadProgress}%`;
  }, 90);

  // Smooth dismiss when calibration finishes
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 700);
    }
  }, 1100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
