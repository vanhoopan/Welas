// ====================== ROTATING TEXT ======================
const rotating3DWords = document.querySelectorAll('.rotating-word');
let rotatingIndex = 0;

function rotateWords() {
  rotating3DWords.forEach(word => word.classList.remove('show'));
  rotating3DWords[rotatingIndex].classList.add('show');
  rotatingIndex = (rotatingIndex + 1) % rotating3DWords.length;
}

// ====================== SCROLL ANIMATIONS ======================
const sections = document.querySelectorAll('.text-section');
let lastScrollPosition = 0;
let ticking = false;

// Enhanced Intersection Observer for sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Hero visibility enforcement
function enforceHeroVisibility() {
  const heroHeadings = document.querySelectorAll('.hero-main-heading, .hero-subheading');
  heroHeadings.forEach(heading => {
    heading.style.opacity = '1';
    heading.style.transform = 'translateY(0)';
    heading.style.visibility = 'visible';
  });
}

// Background gradient animation
const animateBackground = () => {
  const scrollPosition = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
  
  document.body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
};

// Combined scroll handler
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      animateBackground();
      ticking = false;
    });
    ticking = true;
  }
};

// ====================== INITIALIZATION ======================
function init() {
  // Start rotating text
  rotateWords();
  setInterval(rotateWords, 2000);
  
  // Observe all sections
  sections.forEach(section => sectionObserver.observe(section));
  
  // Set hero image height
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.height = `${window.innerHeight * 0.8}px`;
  }
  
  // Ensure hero headings stay visible
  setTimeout(enforceHeroVisibility, 2000); // After all animations complete
  
  // Initial animations
  animateBackground();
}

// ====================== EVENT LISTENERS ======================
window.addEventListener('scroll', () => {
  handleScroll();
  enforceHeroVisibility(); // Extra protection
});

window.addEventListener('load', init);
window.addEventListener('resize', init);

// ====================== HERO HEADING PROTECTION ======================
// Additional protection for hero headings
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.willChange = 'transform, opacity';
  }
  
  // Force visible state after a short delay
  setTimeout(() => {
    document.querySelectorAll('.hero-main-heading, .hero-subheading').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.visibility = 'visible';
    });
  }, 2500);
});

// ====================== POLYFILLS ======================
// IntersectionObserver polyfill for older browsers
if (!('IntersectionObserver' in window)) {
  import('intersection-observer').then(() => init());
}
