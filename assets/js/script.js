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
document.querySelector('.contact-form .btn-primary').addEventListener('click', function(){
  this.textContent = '✓ Demande envoyée — réponse sous 24h';
  this.style.background = '#1a6e3a';
  this.disabled = true;
});












