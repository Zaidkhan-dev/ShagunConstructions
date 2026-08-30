import { initViewer, showViewer, hideViewer } from './viewer.js';
import { initEasterEggs } from './easter-eggs.js';

// --- Product Database ---
export const products = [
  {
    id: "ex-450",
    name: "TITAN EX-450",
    category: "Excavator",
    price: "$289,000",
    image: "/excavator.jpg",
    shortDesc: "Heavy crawler excavator designed for extreme site excavation and bulk loading operations.",
    description: "The TITAN EX-450 crawler excavator represents the pinnacle of earthmoving engineering. Outfitted with high-pressure variable displacement pumps and a fuel-efficient common rail diesel engine, the EX-450 delivers unmatched breakout force and digging depths for commercial construction and mining.",
    specs: {
      "Operating Weight": "45.2 Tonnes",
      "Bucket Capacity": "2.1 - 2.8 m³",
      "Engine Power": "320 HP (239 kW)",
      "Max Digging Depth": "8.2 Meters",
      "Hydraulic Pressure": "34.3 MPa"
    }
  },
  {
    id: "cr-1200",
    name: "AETOS CR-1200",
    category: "Crane",
    price: "$850,000",
    image: "/crane.jpg",
    shortDesc: "Telescopic crawler crane designed for high-altitude lift capability and extreme load stability.",
    description: "Built for heavy industrial lift and erection duties, the AETOS CR-1200 telescopic crane combines crawler mobility with a high-capacity lattice structure. It is capable of operations on soft soils where traditional rubber-tired mobile cranes cannot travel.",
    specs: {
      "Lift Capacity": "120 Tonnes",
      "Max Boom Length": "62 Meters",
      "Operating Weight": "118 Tonnes",
      "Engine Power": "350 HP (261 kW)",
      "Gradeability": "30%"
    }
  },
  {
    id: "jcb-3dx",
    name: "APEX JCB-3DX",
    category: "JCB",
    price: "$78,000",
    image: "/jcb.jpg",
    shortDesc: "Versatile B2B backhoe loader engineered for utility excavation, roadworks, and local lifting.",
    description: "The APEX JCB-3DX backhoe loader is the utility workhorse of the industry. Offering extreme maneuverability, low operational costs, and dual-function bucket/loader configuration, it is ideal for medium-scale civil projects.",
    specs: {
      "Operating Weight": "7.46 Tonnes",
      "Loader Bucket Capacity": "1.0 m³",
      "Backhoe Bucket Capacity": "0.26 m³",
      "Engine Power": "74 HP (55 kW)",
      "Max Travel Speed": "40 km/h"
    }
  },
  {
    id: "sl-60",
    name: "KRAFT SL-60",
    category: "ScissorLift",
    price: "$45,000",
    image: "/scissorlift.jpg",
    shortDesc: "Mobile electric scissor lift platform engineered for high-altitude B2B maintenance and installation.",
    description: "The KRAFT SL-60 scissor lift is engineered for safe aerial operations in commercial buildings and warehouses. Featuring robust crossing scissor hydraulic extensions, emergency lowering valves, and a slide-out deck extension, it ensures optimal reach and load capacity.",
    specs: {
      "Platform Height": "12.0 Meters",
      "Lift Capacity": "450 kg",
      "Operating Weight": "3.2 Tonnes",
      "Extendable Deck": "1.2 Meters",
      "Power Source": "Battery (24V DC)"
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
        e.preventDefault();
        const route = link.getAttribute('data-route');
        if (route) {
          window.location.hash = `#${route}`;
          this.navContainer.classList.remove('mobile-active');
        }
      });
    });

    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => {
        this.navContainer.classList.toggle('mobile-active');
      });
    }

    // Default route checks (robust hash fallback)
    const currentHash = window.location.hash;
    if (!currentHash || currentHash === '#/' || currentHash === '#') {
      window.location.hash = '#/home';
    } else {
      this.handleRoute();
    }
  }

  handleRoute() {
    const hash = window.location.hash || '#/home';
    
    // Parse Hash URL
    const parts = hash.split('?');
    let path = parts[0];
    const queryStr = parts[1] || '';
    
    // Redirect #/ or empty to #/home
    if (path === '#/' || path === '#') {
      path = '#/home';
    }

    // Hide the 3D viewer by default for non-home pages
    if (path !== '#/home') {
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

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Match Routes
    if (path === '#/home') {
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
      if (`#${route}` === path) {
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
          <div class="hero-tag"><span></span>Engineering Precision</div>
          <h1 class="hero-title">High-Trust<br>Industrial <span>Machinery</span></h1>
          <p class="hero-description">Shagun Construction delivers premium, high-capacity commercial construction vehicles to corporate buyers. Engineered for absolute uptime.</p>
          <div class="hero-ctas">
            <button class="btn-primary" id="hero-cta-explore">
              Explore Catalog
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="btn-secondary" id="hero-cta-quote">Request Quote</button>
          </div>

          <!-- --- HERO METRIC STATS CARD (Mobile Reference Layout) --- -->
          <div class="hero-stats-card">
            <div class="stat-item">
              <div class="stat-value">15k+</div>
              <div class="stat-label">EQUIPMENT DEPLOYED</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">50+</div>
              <div class="stat-label">GLOBAL PARTNERS</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">98%</div>
              <div class="stat-label">UPTIME RATE</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">4.9/5</div>
              <div class="stat-label">SAFETY RATING</div>
            </div>
          </div>
        </div>
      </section>

      <!-- --- FEATURED MACHINERY --- -->
      <section class="section">
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Fleet Core</div>
          <h2 class="section-title">Featured Fleet</h2>
          <p class="section-desc">Our flagship industrial lineup built to operate under the most severe demands.</p>
        </div>
        
        <div class="machinery-grid">
          ${products.slice(0, 3).map(p => this.createProductCardHTML(p)).join('')}
        </div>
      </section>

      <!-- --- TRUST / WHY CHOOSE US --- -->
      <section class="section section-bg-warm">
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Verification & Safety</div>
          <h2 class="section-title">Engineered Trust</h2>
          <p class="section-desc">We do not just broker vehicles. We guarantee productivity, logistics, and parts uptime.</p>
        </div>

        <div class="trust-grid">
          <div class="trust-card scroll-reveal">
            <div class="trust-num">01</div>
            <h3 class="trust-title">Pre-delivery Calibration</h3>
            <p class="trust-desc">Every piece of machinery undergoes complete hydraulic pressure, mechanical joint load, and chassis structural tests prior to dispatch.</p>
          </div>
          <div class="trust-card scroll-reveal">
            <div class="trust-num">02</div>
            <h3 class="trust-title">Global Logistics Setup</h3>
            <p class="trust-desc">We manage full heavy-haul logistics direct to site, including clearance, permitting, and modular assembly supervision.</p>
          </div>
          <div class="trust-card scroll-reveal">
            <div class="trust-num">03</div>
            <h3 class="trust-title">98% Parts SLA</h3>
            <p class="trust-desc">Our rapid-supply logistics hubs guarantee critical mechanical and hydraulic components arrive on site within 24-48 hours.</p>
          </div>
        </div>
      </section>

      <!-- --- CATEGORY SHOWCASE --- -->
      <section class="section">
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Structural Index</div>
          <h2 class="section-title">Categories</h2>
          <p class="section-desc">Select a core machinery class to filter specifications and availability.</p>
        </div>

        <div class="category-scroller">
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
            <h3>Excavators</h3>
            <p>Tracked digging systems for bulk soil shifting</p>
          </div>
          <div class="category-card" data-cat="Crane">
            <div class="category-icon-wrapper">
              <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
                <line x1="4" y1="56" x2="60" y2="56" stroke="currentColor" stroke-width="2"/>
                <rect x="8" y="40" width="36" height="10" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="16" cy="50" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="36" cy="50" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M34 40 L40 40 L44 45 L44 50 L34 50 Z" stroke="currentColor" stroke-width="2" fill="none"/>
                <line x1="14" y1="40" x2="48" y2="10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="14" y1="40" x2="44" y2="20" stroke="currentColor" stroke-width="1.5"/>
                <line x1="48" y1="10" x2="44" y2="20" stroke="currentColor" stroke-width="1.5"/>
                <line x1="24" y1="31" x2="29" y2="34" stroke="currentColor" stroke-width="1"/>
                <line x1="34" y1="22" x2="39" y2="25" stroke="currentColor" stroke-width="1"/>
                <line x1="48" y1="10" x2="48" y2="30" stroke="currentColor" stroke-width="1.5"/>
                <path d="M48 30 Q51 32 48 34 Q45 36 46 32" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <h3>Heavy Cranes</h3>
            <p>Lattice & telescopic heavy erection rigs</p>
          </div>
          <div class="category-card" data-cat="JCB">
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
            <h3>JCB Loaders</h3>
            <p>Multi-purpose utility loaders & backhoes</p>
          </div>
          <div class="category-card" data-cat="ScissorLift">
            <div class="category-icon-wrapper">
              <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
                <line x1="4" y1="56" x2="60" y2="56" stroke="currentColor" stroke-width="2"/>
                <rect x="16" y="46" width="32" height="6" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="22" cy="52" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="42" cy="52" r="3" stroke="currentColor" stroke-width="2" fill="none"/>
                <line x1="20" y1="46" x2="44" y2="34" stroke="currentColor" stroke-width="2"/>
                <line x1="44" y1="46" x2="20" y2="34" stroke="currentColor" stroke-width="2"/>
                <circle cx="32" cy="40" r="1.5" fill="currentColor"/>
                <line x1="20" y1="34" x2="44" y2="22" stroke="currentColor" stroke-width="2"/>
                <line x1="44" y1="34" x2="20" y2="22" stroke="currentColor" stroke-width="2"/>
                <circle cx="32" cy="28" r="1.5" fill="currentColor"/>
                <line x1="16" y1="22" x2="48" y2="22" stroke="currentColor" stroke-width="2"/>
                <rect x="18" y="10" width="28" height="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <line x1="28" y1="10" x2="28" y2="22" stroke="currentColor" stroke-width="1"/>
                <line x1="36" y1="10" x2="36" y2="22" stroke="currentColor" stroke-width="1"/>
              </svg>
            </div>
            <h3>Scissor Lifts</h3>
            <p>Aerial work platforms for warehouse utilities</p>
          </div>
        </div>
      </section>

      <!-- --- TESTIMONIALS --- -->
      <section class="section section-bg-warm">
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Verified Deliveries</div>
          <h2 class="section-title">Commercial Feedback</h2>
          <p class="section-desc">Hear from heavy-infrastructure operations leads across B2B contracts.</p>
        </div>

        <div class="testimonials-slider">
          <div class="testimonial-card scroll-reveal">
            <span class="quote-icon">“</span>
            <p class="testimonial-text">Shagun Construction's rig calibration is pristine. The excavator delivered to our dam project was in immediate field-operational order. Outstanding compliance.</p>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>V. K. Singhal</h4>
                <p>Operations Lead, Infrastructure Projects Ltd</p>
              </div>
            </div>
          </div>
          <div class="testimonial-card scroll-reveal">
            <span class="quote-icon">“</span>
            <p class="testimonial-text">The 98% parts SLA has saved our project timeline multiple times. When a hydraulic cylinder seal blew in the scissor lift, they had a replacement on site in under 18 hours.</p>
            <div class="testimonial-author">
              <div class="author-info">
                <h4>Rajesh Kurup</h4>
                <p>Director of Logistics, Kurup Agricultural Corp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- --- CONTACT CTA --- -->
      <section class="section tech-border-diagonal" style="background-color: var(--color-text-main); color: #FFFFFF; text-align: center; padding: 100px 8%;">
        <div class="scroll-reveal">
          <h2 class="section-title" style="color: #FFFFFF; margin-bottom: 20px;">Procure Your Heavy Fleet</h2>
          <p style="color: #8C8C94; max-width: 600px; margin: 0 auto 40px; font-size: 1.1rem;">Contact our industrial advisory desk to discuss lease terms, tailored rigging setups, or schedule bulk machinery delivery.</p>
          <button class="btn-primary" id="cta-bottom-quote">Consult Fleet Advisor</button>
        </div>
      </section>
    `;

    // Add Interactive Listeners
    document.getElementById('hero-cta-explore').addEventListener('click', () => {
      window.location.hash = '#/catalog';
    });
    document.getElementById('hero-cta-quote').addEventListener('click', () => {
      window.location.hash = '#/contact';
    });
    document.getElementById('cta-bottom-quote').addEventListener('click', () => {
      window.location.hash = '#/contact';
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
    
    // Categories list
    const categories = ["Excavator", "Crane", "JCB", "ScissorLift"];
    
    this.appContainer.innerHTML = `
      <section class="section" style="padding-top: 140px;">
        <div class="blueprint-grid"></div>
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Heavy Equipment Registry</div>
          <h2 class="section-title">Fleet Catalog</h2>
          <p class="section-desc">Search, filter, and compare hydraulic construction and industrial transport machinery.</p>
        </div>

        <div class="catalog-layout">
          <!-- Sidebar Filters -->
          <div class="catalog-sidebar scroll-reveal">
            <div class="filter-group">
              <h3 class="filter-title">Machinery Class</h3>
              <div class="filter-pills">
                <div class="filter-pill ${filterCategory === '' ? 'active' : ''}" data-cat="">
                  <div class="filter-checkbox"></div>
                  <span>Show All Fleet</span>
                </div>
                ${categories.map(cat => {
                  let label = cat + 's';
                  if (cat === 'ScissorLift') label = 'Scissor Lifts';
                  return `
                    <div class="filter-pill ${filterCategory === cat ? 'active' : ''}" data-cat="${cat}">
                      <div class="filter-checkbox"></div>
                      <span>${label}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            
            <div class="filter-group">
              <h3 class="filter-title">Quote Reference</h3>
              <p style="font-size: 0.8rem; color: var(--color-text-muted);">Pricing shown indicates base dealer delivery. Lease packages can be custom calibrated.</p>
            </div>
          </div>

          <!-- Main Content -->
          <div>
            <div class="catalog-search-wrapper scroll-reveal">
              <input type="text" class="catalog-search" id="catalog-search-input" placeholder="Search by vehicle model name or specifications...">
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
          <div style="grid-column: 1/-1; text-align: center; padding: 60px; border: 1px dashed var(--color-border); border-radius: var(--radius-md);">
            <p style="color: var(--color-text-muted);">No vehicles match the selected filter configuration.</p>
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
        <div class="tech-marker" style="margin-bottom: 24px;">Spec-Sheet: ${product.id.toUpperCase()}</div>
        
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
                <!-- Fallback blueprint layout -->
                <svg viewBox="0 0 100 70" style="width: 100%; height: 100%; fill: none; stroke: var(--color-text-muted); stroke-width: 1;">
                  <rect x="10" y="10" width="80" height="50" rx="4"/>
                  <line x1="10" y1="35" x2="90" y2="35" stroke-dasharray="2 2"/>
                  <line x1="50" y1="10" x2="50" y2="60" stroke-dasharray="2 2"/>
                  <text x="50" y="40" font-size="8" text-anchor="middle" fill="currentColor" stroke="none">BLUEPRINT VIEW</text>
                </svg>
              </div>
            </div>
          </div>

          <!-- Product info -->
          <div class="detail-info scroll-reveal">
            <div class="detail-cat">${product.category}</div>
            <h1 class="detail-name">${product.name}</h1>
            <div class="detail-price">Quote Ref: ${product.price}</div>
            <p class="detail-desc">${product.description}</p>
            
            <h3 style="font-family: var(--font-display); font-size: 0.9rem; margin-bottom: 16px;">Technical Specifications</h3>
            <table class="detail-specs-table">
              ${Object.entries(product.specs).map(([label, val]) => `
                <tr>
                  <td>${label}</td>
                  <td>${val}</td>
                </tr>
              `).join('')}
            </table>

            <!-- Quote request box -->
            <div class="quote-request-card" id="quote-request-container">
              <h3 style="margin-bottom: 12px; font-size: 1.1rem;">Request Technical Quote</h3>
              <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 20px;">Submit your lease/purchase configuration. Our engineering desk will respond in 2 hours.</p>
              
              <div class="form-group">
                <label class="form-label">Corporate Email</label>
                <input type="email" class="form-input" id="quote-email" placeholder="name@company.com">
              </div>
              <div class="form-group">
                <label class="form-label">Delivery Timeline</label>
                <select class="form-input" id="quote-timeline">
                  <option>Immediate (Under 30 days)</option>
                  <option>Q3 / Q4 Delivery</option>
                  <option>Bulk Fleet Lease (Long Term)</option>
                </select>
              </div>
              <button class="btn-primary" style="width: 100%; justify-content: center;" id="btn-submit-quote">Submit Quote Request</button>
              <div id="quote-success-msg" style="display: none; margin-top: 16px; padding: 12px; background-color: var(--color-bg-light); border: 1px solid var(--color-accent); color: var(--color-text-main); font-weight: 600; font-size: 0.85rem; text-align: center; border-radius: var(--radius-sm);">
                ✓ Quote request logged. Ref: SH-${Math.floor(1000 + Math.random()*9000)}
              </div>
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
        // If it's the second thumb, show blueprint, else show product image
        if (t.children[0].tagName === 'svg' || t.children[0].getAttribute('src') === null) {
          // Keep active source or mock
        } else {
          mainImg.setAttribute('src', product.image);
        }
      });
    });

    // Form submission
    const submitBtn = document.getElementById('btn-submit-quote');
    const emailInput = document.getElementById('quote-email');
    const successMsg = document.getElementById('quote-success-msg');
    submitBtn.addEventListener('click', () => {
      if (emailInput.value.trim() === '') {
        alert('Please provide a corporate email to log your quote.');
        return;
      }
      submitBtn.style.display = 'none';
      successMsg.style.display = 'block';
    });
  }

  renderAbout() {
    hideViewer();
    this.appContainer.innerHTML = `
      <section class="section" style="padding-top: 140px;">
        <div class="blueprint-grid"></div>
        <div class="section-header scroll-reveal">
          <div class="tech-marker">Corporate Registry</div>
          <h2 class="section-title">Our Story & Milestones</h2>
          <p class="section-desc">Shagun Construction has served major engineering and agricultural projects with high-spec machinery fleets since 2012.</p>
        </div>

        <div class="timeline">
          <div class="timeline-item left scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2012</div>
            <div class="timeline-content">
              <h4 style="margin-bottom: 8px;">Inception & Excavation Core</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Founded in Pune, supplying local road development projects with standard 20-tonne excavators and utility backhoes.</p>
            </div>
          </div>
          
          <div class="timeline-item right scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2016</div>
            <div class="timeline-content">
              <h4 style="margin-bottom: 8px;">Industrial Heavy-Lifts</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Expanded into mobile and crawler cranes, establishing a certification and calibration bay to service high-hazard projects.</p>
            </div>
          </div>

          <div class="timeline-item left scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2020</div>
            <div class="timeline-content">
              <h4 style="margin-bottom: 8px;">Agro-Logistics Integration</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Introduced crawler-mounted hydraulic sugar lift vehicles to support bulk log and sugarcane processing sites across India.</p>
            </div>
          </div>

          <div class="timeline-item right scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-year">2026</div>
            <div class="timeline-content">
              <h4 style="margin-bottom: 8px;">Corporate Fleet Hub</h4>
              <p style="font-size: 0.9rem; color: var(--color-text-muted);">Re-engineered our B2B model to incorporate real-time hydraulic monitoring and guaranteed 48-hour site parts SLA support.</p>
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
          <h2 class="section-title">Fleet Procurement</h2>
          <p class="section-desc">Initiate a lease, query fleet specifications, or arrange logistics coordinates with our central dispatch.</p>
        </div>

        <div class="contact-layout">
          <!-- Contact form -->
          <div class="quote-request-card scroll-reveal">
            <h3 style="margin-bottom: 24px; font-size: 1.25rem;">Procurement Consultation</h3>
            
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="contact-name" placeholder="John Doe">
            </div>
            
            <div class="form-group">
              <label class="form-label">Corporate Email</label>
              <input type="email" class="form-input" id="contact-email" placeholder="j.doe@company.com">
            </div>
            
            <div class="form-group">
              <label class="form-label">Fleet Category</label>
              <select class="form-input" id="contact-fleet">
                <option>Excavator Fleet</option>
                <option>Crane Heavy Erection</option>
                <option>Sugar Lift / Agro-Loaders</option>
                <option>JCB Utility Loaders</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Specifications / Requirements</label>
              <textarea class="form-input" id="contact-msg" placeholder="Describe site logistics, tonnage requirements, or custom lift heights..."></textarea>
            </div>

            <button class="btn-primary" style="width: 100%; justify-content: center;" id="btn-submit-contact">Request Consultation</button>
            
            <div id="contact-success-msg" style="display: none; margin-top: 16px; padding: 12px; background-color: var(--color-bg-light); border: 1px solid var(--color-accent); color: var(--color-text-main); font-weight: 600; font-size: 0.85rem; text-align: center; border-radius: var(--radius-sm);">
              ✓ Inquiry logged. Our heavy fleet consultant will contact you at your logged email.
            </div>
          </div>

          <!-- Contact details & Map -->
          <div class="contact-info-block scroll-reveal">
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/></svg>
              </div>
              <div class="contact-details">
                <h3>Global Dispatch HQ</h3>
                <p>Sector 11, Industrial Estate, Pune, Maharashtra 411018, India</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div class="contact-details">
                <h3>Sales Office</h3>
                <p>sales@shagunconstruction.com</p>
                <p>+91 20 555 0199</p>
              </div>
            </div>

            <!-- Custom blueprint map design -->
            <div class="map-container">
              <div class="map-blueprint-lines"></div>
              <div class="map-location-marker">
                <div class="map-marker-pin"></div>
                <div class="map-location-label">SHAGUN HQ</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    const submitContact = document.getElementById('btn-submit-contact');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const successMsg = document.getElementById('contact-success-msg');
    
    submitContact.addEventListener('click', () => {
      if (nameInput.value.trim() === '' || emailInput.value.trim() === '') {
        alert('Please fill out the corporate contact fields.');
        return;
      }
      submitContact.style.display = 'none';
      successMsg.style.display = 'block';
    });
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

        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        
        <div class="product-specs">
          ${Object.entries(p.specs).slice(0, 2).map(([lbl, val]) => `
            <div class="product-spec-row">
              <span class="product-spec-label">${lbl}</span>
              <span class="product-spec-val">${val}</span>
            </div>
          `).join('')}
        </div>

        <div class="product-footer">
          <span class="product-price">${p.price}</span>
          <span class="card-cta">
            Spec Sheet
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    `;
  }
}

// --- App Initialization & Loading ---
function initApp() {
  // Initialize Three.js scene
  initViewer();
  
  // Initialize SPA Router
  new Router();

  // Initialize site-wide animations (easter eggs)
  initEasterEggs();

  // Hide Loading Screen when assets are parsed (allow 1.5s for hydraulic load simulation)
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = 0;
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 800);
    }
  }, 1200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
