

const timelineList = document.getElementById("timeline-list");

if (timelineList) {

    const timelineData = [
        { year: '1972', title: 'Création d\'Eurofeu', description: 'Fondation par Nicole et Michel Lahouati. Société de négoce de matériel incendie, 150 m² à Le Mesnil-Thomas (28).' },
        { year: '1976', title: 'Signalisation & Plans', description: 'Eurofeu devient SAS. Création de la marque Eurosignal pour la fabrication de panneaux et plans d\'évacuation.' },
        { year: '1981', title: 'Premier Extincteur', description: 'Premier extincteur fabriqué à Mesnil-Thomas dans un nouvel atelier de 1 500 m². Naissance de la gamme propre.' },
        { year: '1986', title: 'Réseau de Distribution', description: 'Création d\'un réseau dédié aux petites entreprises (LRS — Le Réseau Sécurité).' },
        { year: '1995', title: 'Intégration Chevalier Bertrand', description: 'Intégration du fournisseur d\'embouts d\'extincteurs Chevalier Bertrand. Maîtrise complète du circuit de fabrication.' },
        { year: '1996', title: 'Certification ISO 9001', description: 'Certification qualité ISO 9001 pour l\'unité de production. Engagement fort envers la qualité.' },
        { year: '1998', title: 'Département Formation', description: 'Création du département formation pour répondre à la demande croissante de formations incendie et sécurité.' },
        { year: '2003', title: 'Nouveau Site Industriel', description: 'Déménagement sur le site industriel La Forêt : 21 500 m² d\'usine/entrepôt et 1 600 m² de bureaux.' },
        { year: '2007', title: 'Création Eurofeu Services', description: 'Fusion de plusieurs entités régionales et création d\'Eurofeu Services, réseau national de vente directe.' },
        { year: '2013', title: 'Certification ISO 14001', description: 'Engagement environnemental renforcé avec la validation de la norme ISO 14001.' },
        { year: '2014', title: 'Label Origine France Garantie', description: 'Eurofeu, 1er fabricant d\'extincteurs à obtenir le label "ORIGINE FRANCE GARANTIE".' },
        { year: '2020', title: 'Nouveau Présidence', description: 'Prise de présidence par Éric Hentges avec le soutien du fonds d\'investissement français CAPZA.' },
        { year: '2022', title: '50 ans d\'Eurofeu', description: 'Célébration des 50 ans. Refonte complète de la charte graphique. Acquisition d\'AMI2S pour son expertise SSI.' },
        { year: '2024', title: 'IK Partners Actionnaire', description: 'CAPZA réduit sa participation. IK Partners devient actionnaire majoritaire, ouvrant de nouvelles perspectives de croissance.' }
    ];

    timelineData.forEach((item, index) => {
        const itemElement = document.createElement("div");

        itemElement.className = `timeline-item ${index % 2 === 0 ? "left" : "right"}`;

        itemElement.innerHTML = `
            <div class="timeline-content">
                <div class="card">
                    <div class="card-year gradient-text">${item.year}</div>
                    <div class="card-title">${item.title}</div>
                    <p class="card-description">${item.description}</p>
                </div>
            </div>
            <div class="timeline-dot"></div>
            <div class="spacer"></div>
        `;

        timelineList.appendChild(itemElement);
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".timeline-item").forEach(item => {
        observer.observe(item);
    });
}

(function(){
  try {
    // Show loader only once per browser tab/session
    if (sessionStorage.getItem("preloaderShown")) {
      const loader = document.getElementById("pgLoader");
      if (loader) loader.remove();
      return;
    }

    sessionStorage.setItem("preloaderShown", "true");

    var loader = document.getElementById('pgLoader');
    if (!loader) return;

    var percentEl = document.getElementById('pgLoaderPercent');
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var MIN_MS = prefersReduced ? 0 : 1800;
    var startTime = performance.now();
    var pageLoaded = false;
    var displayedPct = 0;
    var rafId = null;
    var finished = false;
 
    function setInert(state){
      var kids = document.querySelectorAll('body > *');
      for (var i = 0; i < kids.length; i++){
        var el = kids[i];
        if (el === loader) continue;
        if ('inert' in el) el.inert = state;
      }
    }
 
    document.addEventListener('DOMContentLoaded', function(){
      document.body.style.overflow = 'hidden';
      setInert(true);
    });
 
    function tick(now){
      var elapsed = now - startTime;
      var t = Math.min(elapsed / Math.max(MIN_MS, 1), 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var cap = pageLoaded ? 100 : 96;
      var target = Math.min(cap, Math.round(eased * 100));
      if (displayedPct < target){
        displayedPct += 1;
        if (percentEl) percentEl.textContent = displayedPct;
        loader.style.setProperty('--pg-progress', displayedPct / 100);
      }
      if (displayedPct >= 100){
        finish();
        return;
      }
      rafId = requestAnimationFrame(tick);
    }
 
    function finish(){
      if (finished) return;
      finished = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (percentEl) percentEl.textContent = 100;
      loader.style.setProperty('--pg-progress', 1);
      var flareDelay = prefersReduced ? 0 : 300;
      loader.classList.add('is-flaring');
      window.setTimeout(function(){
        loader.classList.add('is-leaving');
        setInert(false);
        document.body.style.overflow = '';
        var removeDelay = prefersReduced ? 260 : 950;
        window.setTimeout(function(){
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, removeDelay);
      }, flareDelay);
    }
 
    window.addEventListener('load', function(){ pageLoaded = true; });
    window.setTimeout(function(){ pageLoaded = true; }, 8000);
 
    if (prefersReduced){
      if (document.readyState === 'complete'){
        finish();
      } else {
        window.addEventListener('load', function(){ finish(); }, { once: true });
      }
    } else {
      rafId = requestAnimationFrame(tick);
    }
  } catch (err) {
    var l = document.getElementById('pgLoader');
    if (l && l.parentNode) l.parentNode.removeChild(l);
    if (document.body) document.body.style.overflow = '';
  }
})();







(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
  const targets = document.querySelectorAll(
    [
      ".product-image-box",
      ".section-tag",
      ".product-info h3",
      ".product-desc",
      ".spec-item",
      ".product-features li",
      ".product-detail .nav-cta",
      ".footer-inner > *",
      ".footer-bottom"
    ].join(", ")
  );
 
  if (!targets.length) return;
 
  // No JS-driven motion needed: show everything immediately.
  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("reveal-in"));
    return;
  }
 
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
 
  targets.forEach((el) => io.observe(el));
})();


// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
    }
  });
},{threshold:0.12});
revealEls.forEach(el => observer.observe(el));

// Mobile menu
function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}

// Close mobile menu on outside click
document.getElementById('mobileMenu').addEventListener('click', function(e){
  if(e.target === this) toggleMenu();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 60
    ? 'rgba(26,26,26,0.99)'
    : 'rgba(26,26,26,0.96)';
});

// Animated stats counter on hero
function animateCounter(el, target, suffix){
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if(!start) start = timestamp;
    const prog = Math.min((timestamp - start)/duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if(prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      setTimeout(() => animateCounter(document.getElementById('stat1'), 38, 'ans'), 400);
      setTimeout(() => animateCounter(document.getElementById('stat2'), 12, 'K+'), 600);
      setTimeout(() => animateCounter(document.getElementById('stat3'), 350, '+'), 800);
      heroObserver.disconnect();
    }
  });
},{threshold:0.5});

// Add IDs to stat nums for counter animation
const statNums = document.querySelectorAll('.hero-stat-num');
if(statNums[0]) statNums[0].id='stat1';
if(statNums[1]) statNums[1].id='stat2';
if(statNums[2]) statNums[2].id='stat3';
if(statNums[0]) heroObserver.observe(statNums[0]);

// Smooth form submit feedback
const contactBtn = document.querySelector('.contact-form .btn-primary');

if (contactBtn) {
    contactBtn.addEventListener('click', function () {
        this.textContent = '✓ Demande envoyée — réponse sous 24h';
        this.style.background = '#1a6e3a';
        this.disabled = true;
    });
}


const productsGrid = document.getElementById("productsGrid");

if (productsGrid) {

    const productsData = [
            {
                id: 1,
                name: 'Extincteur Poudre ABC 6kg',
                category: 'extincteurs',
                description: 'Extincteur polyvalent pour feux de classe A, B et C. Idéal pour les environnements industriels.',
                price: '89,99 €',
                certification: 'ISO 9001',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ef4444;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23dc2626;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Crect x="80" y="40" width="140" height="200" rx="20" fill="url(%23grad1)"/%3E%3Ccircle cx="150" cy="35" r="15" fill="%23fbbf24"/%3E%3Crect x="140" y="25" width="20" height="20" fill="%23fbbf24"/%3E%3Ctext x="150" y="160" font-size="24" fill="white" text-anchor="middle" font-weight="bold"%3EABC%3C/text%3E%3Ctext x="150" y="190" font-size="14" fill="white" text-anchor="middle"%3E6kg%3C/text%3E%3C/svg%3E'
            },
            {
                id: 2,
                name: 'Extincteur CO₂ 5kg',
                category: 'extincteurs',
                description: 'Extincteur CO₂ pour feux électriques et liquides. Nettoyage facile sans résidu.',
                price: '125,50 €',
                certification: 'ISO 14001',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23374151;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23111827;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Crect x="85" y="50" width="130" height="190" rx="18" fill="url(%23grad2)"/%3E%3Ccircle cx="150" cy="40" r="12" fill="%23ef4444"/%3E%3Crect x="145" y="30" width="10" height="15" fill="%23ef4444"/%3E%3Ctext x="150" y="160" font-size="20" fill="%23f3f4f6" text-anchor="middle" font-weight="bold"%3ECO₂%3C/text%3E%3Ctext x="150" y="190" font-size="14" fill="%23d1d5db" text-anchor="middle"%3E5kg%3C/text%3E%3C/svg%3E'
            },
            {
                id: 3,
                name: 'Panneau Sortie Secours',
                category: 'signalisation',
                description: 'Panneau luminescent haute visibilité pour évacuation d\'urgence. Conforme aux normes.',
                price: '45,00 €',
                certification: 'CE',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2310b981;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23059669;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Crect x="50" y="80" width="200" height="140" rx="10" fill="url(%23grad3)"/%3E%3Ctext x="150" y="170" font-size="32" fill="white" text-anchor="middle" font-weight="bold"%3E🚪%3C/text%3E%3Ctext x="150" y="230" font-size="12" fill="%23d1d5db" text-anchor="middle"%3ESORTIE%3C/text%3E%3C/svg%3E'
            },
            {
                id: 4,
                name: 'Détecteur de Fumée Autonome',
                category: 'detection',
                description: 'Détecteur photoélectrique avec batterie autonome. Alarme sonore 85dB.',
                price: '35,99 €',
                certification: 'EN 14604',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f97316;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23ea580c;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Ccircle cx="150" cy="150" r="80" fill="url(%23grad4)"/%3E%3Ccircle cx="150" cy="150" r="60" fill="%231a1f3a"/%3E%3Ccircle cx="150" cy="150" r="40" fill="%23f97316" opacity="0.3"/%3E%3Ctext x="150" y="160" font-size="24" fill="white" text-anchor="middle" font-weight="bold"%3E🔔%3C/text%3E%3C/svg%3E'
            },
            {
                id: 5,
                name: 'Couverture Anti-Feu 1.5x1.5m',
                category: 'equipements',
                description: 'Couverture de sécurité anti-feu en fibre de verre. Protection maximale pour personnes.',
                price: '65,00 €',
                certification: 'ISO 9001',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%236366f1;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%234f46e5;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Cpath d="M 80 100 L 220 100 L 220 220 L 80 220 Z" fill="url(%23grad5)" stroke="%23fbbf24" stroke-width="3"/%3E%3Ctext x="150" y="165" font-size="28" fill="white" text-anchor="middle" font-weight="bold"%3E🛡️%3C/text%3E%3C/svg%3E'
            },
            {
                id: 6,
                name: 'Extincteur Mousse 9L',
                category: 'extincteurs',
                description: 'Extincteur mousse pour feux d\'hydrocarbures. Efficacité rapide et durable.',
                price: '155,00 €',
                certification: 'ISO 9001',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad6" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ec4899;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23be185d;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Crect x="75" y="35" width="150" height="210" rx="22" fill="url(%23grad6)"/%3E%3Ccircle cx="150" cy="30" r="18" fill="%23fbbf24"/%3E%3Crect x="142" y="15" width="16" height="20" fill="%23fbbf24"/%3E%3Ctext x="150" y="155" font-size="22" fill="white" text-anchor="middle" font-weight="bold"%3EMOUSSE%3C/text%3E%3Ctext x="150" y="185" font-size="14" fill="white" text-anchor="middle"%3E9L%3C/text%3E%3C/svg%3E'
            },
            {
                id: 7,
                name: 'Plan d\'Évacuation Personnalisé',
                category: 'signalisation',
                description: 'Plan d\'évacuation sur mesure conforme aux normes. Impression haute qualité.',
                price: '120,00 €',
                certification: 'CE',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad7" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23f59e0b;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23d97706;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Crect x="60" y="60" width="180" height="180" rx="8" fill="url(%23grad7)"/%3E%3Cline x1="80" y1="100" x2="220" y2="100" stroke="white" stroke-width="2"/%3E%3Cline x1="80" y1="130" x2="220" y2="130" stroke="white" stroke-width="2"/%3E%3Cline x1="80" y1="160" x2="220" y2="160" stroke="white" stroke-width="2"/%3E%3Cline x1="80" y1="190" x2="220" y2="190" stroke="white" stroke-width="2"/%3E%3Ctext x="150" y="235" font-size="12" fill="%23d1d5db" text-anchor="middle"%3EPLAN%3C/text%3E%3C/svg%3E'
            },
            {
                id: 8,
                name: 'Détecteur Thermique Fixe',
                category: 'detection',
                description: 'Détecteur thermique haute sensibilité. Réaction rapide aux élévations de température.',
                price: '78,50 €',
                certification: 'EN 54-5',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad8" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ef4444;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23991b1b;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Ccircle cx="150" cy="150" r="70" fill="url(%23grad8)"/%3E%3Cpath d="M 150 100 L 160 140 L 150 180 L 140 140 Z" fill="%23fbbf24" opacity="0.8"/%3E%3Ctext x="150" y="235" font-size="12" fill="%23d1d5db" text-anchor="middle"%3ETHERMIQUE%3C/text%3E%3C/svg%3E'
            },
            {
                id: 9,
                name: 'Gilet de Sécurité Haute Visibilité',
                category: 'equipements',
                description: 'Gilet réfléchissant conforme aux normes. Confortable et durable pour usage prolongé.',
                price: '22,99 €',
                certification: 'EN 471',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad9" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23fbbf24;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f59e0b;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Cpath d="M 100 80 L 200 80 L 190 200 L 110 200 Z" fill="url(%23grad9)"/%3E%3Crect x="115" y="100" width="70" height="80" fill="%231a1f3a"/%3E%3Cline x1="120" y1="110" x2="180" y2="110" stroke="%23ef4444" stroke-width="3"/%3E%3Cline x1="120" y1="140" x2="180" y2="140" stroke="%23ef4444" stroke-width="3"/%3E%3Cline x1="120" y1="170" x2="180" y2="170" stroke="%23ef4444" stroke-width="3"/%3E%3C/svg%3E'
            },
            {
                id: 10,
                name: 'Extincteur Eau 6L',
                category: 'extincteurs',
                description: 'Extincteur eau pulvérisée pour feux de classe A. Refroidissement efficace.',
                price: '75,00 €',
                certification: 'ISO 9001',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad10" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%233b82f6;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%231e40af;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Crect x="85" y="45" width="130" height="195" rx="20" fill="url(%23grad10)"/%3E%3Ccircle cx="150" cy="38" r="14" fill="%23fbbf24"/%3E%3Crect x="144" y="28" width="12" height="18" fill="%23fbbf24"/%3E%3Ctext x="150" y="160" font-size="20" fill="white" text-anchor="middle" font-weight="bold"%3EEAU%3C/text%3E%3Ctext x="150" y="190" font-size="14" fill="white" text-anchor="middle"%3E6L%3C/text%3E%3C/svg%3E'
            },
            {
                id: 11,
                name: 'Signalisation Incendie Complète',
                category: 'signalisation',
                description: 'Kit complet de signalisation incendie. Tous les panneaux nécessaires pour la conformité.',
                price: '280,00 €',
                certification: 'CE',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad11" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23ef4444;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23991b1b;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Crect x="50" y="50" width="200" height="200" rx="12" fill="url(%23grad11)"/%3E%3Ctext x="150" y="120" font-size="28" fill="white" text-anchor="middle" font-weight="bold"%3E⚠️%3C/text%3E%3Ctext x="150" y="180" font-size="16" fill="white" text-anchor="middle" font-weight="bold"%3EKIT%3C/text%3E%3Ctext x="150" y="210" font-size="12" fill="%23fbbf24" text-anchor="middle"%3ECOMPLETE%3C/text%3E%3C/svg%3E'
            },
            {
                id: 12,
                name: 'Centrale de Détection Incendie',
                category: 'detection',
                description: 'Centrale de détection 4 zones. Gestion intelligente des alarmes incendie.',
                price: '450,00 €',
                certification: 'EN 54-2',
                image: '../../assets/images/Extincteur.png" viewBox="0 0 300 300"%3E%3Cdefs%3E%3ClinearGradient id="grad12" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23374151;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23111827;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="300" height="300" fill="%231a1f3a"/%3E%3Crect x="60" y="60" width="180" height="180" rx="10" fill="url(%23grad12)" stroke="%23ef4444" stroke-width="2"/%3E%3Ccircle cx="100" cy="110" r="12" fill="%23ef4444"/%3E%3Ccircle cx="150" cy="110" r="12" fill="%2310b981"/%3E%3Ccircle cx="200" cy="110" r="12" fill="%2310b981"/%3E%3Crect x="80" y="160" width="140" height="40" rx="4" fill="%23ef4444" opacity="0.3"/%3E%3Ctext x="150" y="185" font-size="12" fill="%23fbbf24" text-anchor="middle" font-weight="bold"%3E4 ZONES%3C/text%3E%3C/svg%3E'
            }
        ];

        // ============================================
        // DOM ELEMENTS
        // ============================================
        const searchInput = document.getElementById('searchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // ============================================
        // STATE MANAGEMENT
        // ============================================
        let currentFilter = 'tous';
        let currentSearch = '';
        let filteredProducts = [...productsData];

        // ============================================
        // UTILITY FUNCTIONS
        // ============================================
        function renderProducts(products) {
            if (products.length === 0) {
                productsGrid.innerHTML = `
                    <div class="empty-state">
                        <h3>Aucun produit trouvé</h3>
                        <p>Essayez une autre recherche ou un autre filtre.</p>
                    </div>
                `;
                return;
            }

            productsGrid.innerHTML = products.map(product => `
                <article class="product-card scroll-reveal" data-category="${product.category}">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                        <span class="certification-badge">${product.certification}</span>
                    </div>
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">${product.price}</span>
                            <button class="btn-view-product" aria-label="Voir le produit ${product.name}">Voir</button>
                        </div>
                    </div>
                </article>
            `).join('');

            // Trigger scroll reveal animations
            observeScrollReveal();
            attachProductCardListeners();
        }

        function filterProducts() {
            filteredProducts = productsData.filter(product => {
                const matchesFilter = currentFilter === 'tous' || product.category === currentFilter;
                const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                                     product.description.toLowerCase().includes(currentSearch.toLowerCase());
                return matchesFilter && matchesSearch;
            });

            renderProducts(filteredProducts);
        }

        // ============================================
        // EVENT LISTENERS
        // ============================================
        filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterProducts();
        });
    });

        // ============================================
        // SCROLL REVEAL ANIMATION
        // ============================================
        function observeScrollReveal() {
            const revealElements = document.querySelectorAll('.scroll-reveal');

            const revealOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            };

            const revealOnScroll = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, revealOptions);

            revealElements.forEach(element => revealOnScroll.observe(element));
        }

        // ============================================
        // PRODUCT CARD INTERACTIONS
        // ============================================
        function attachProductCardListeners() {
            const buttons = document.querySelectorAll('.btn-view-product');
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const card = btn.closest('.product-card');
                    const productName = card.querySelector('.product-name').textContent;
                    showNotification(`Produit sélectionné: ${productName}`);
                });
            });
        }

        // ============================================
        // NOTIFICATION SYSTEM
        // ============================================
        function showNotification(message) {
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(249, 115, 22, 0.8));
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                font-size: 0.9rem;
                font-weight: 500;
                z-index: 2000;
                animation: slideIn 0.3s ease-out;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }

                // ============================================
                // SMOOTH SCROLL
                // ============================================
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            });
          });

          // ============================================
          // INITIALIZATION
          // ============================================
          renderProducts(filteredProducts);
          observeScrollReveal();

          // Add animations
          const style = document.createElement('style');
          style.textContent = `
                        @keyframes slideIn {
                            from {
                                transform: translateX(400px);
                                opacity: 0;
                            }
                            to {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }

                        @keyframes slideOut {
                            from {
                                transform: translateX(0);
                                opacity: 1;
                            }
                            to {
                                transform: translateX(400px);
                                opacity: 0;
                            }
                        }

                        @media (max-width: 768px) {
                            @keyframes slideIn {
                                from {
                                    transform: translateX(100vw);
                                    opacity: 0;
                                }
                                to {
                                    transform: translateX(0);
                                    opacity: 1;
                                }
                            }

                            @keyframes slideOut {
                                from {
                                    transform: translateX(0);
                                    opacity: 1;
                                }
                                to {
                                    transform: translateX(100vw);
                                    opacity: 0;
                                }
                            }
                        }
                    `;
          document.head.appendChild(style);

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================
  // Debounce search input for better performance
  function debounce(func, wait) {
    let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        const debouncedSearch = debounce(() => {
            filterProducts();
        }, 300);

        if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        debouncedSearch();
    });
}

        // Lazy loading for images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });
            document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
        }
 

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".mobile-dropdown-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            this.parentElement.classList.toggle("active");
        });
    });
});

 