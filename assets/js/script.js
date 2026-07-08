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




