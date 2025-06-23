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

// Hero visibility enforcement with permanent lock
function enforceHeroVisibility() {
  const heroMainHeading = document.querySelector('.hero-main-heading');
  const heroSubheading = document.querySelector('.hero-subheading');
  
  if (heroMainHeading) {
    heroMainHeading.style.opacity = '1';
    heroMainHeading.style.transform = 'translateY(0)';
    heroMainHeading.style.visibility = 'visible';
    heroMainHeading.style.animation = 'none'; // Remove conflicting animations
  }
  
  if (heroSubheading) {
    heroSubheading.style.opacity = '1';
    heroSubheading.style.transform = 'translateY(0)';
    heroSubheading.style.visibility = 'visible';
    heroSubheading.style.animation = 'none'; // Remove conflicting animations
  }
}

// Background gradient animation
const animateBackground = () => {
  const scrollPosition = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
  
  document.body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
};

// Optimized scroll handler
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
  
  // Immediately enforce hero visibility
  enforceHeroVisibility();
  
  // Additional insurance for hero visibility
  setTimeout(enforceHeroVisibility, 1000);
  
  // Initial animations
  animateBackground();
}

// ====================== EVENT LISTENERS ======================
window.addEventListener('scroll', () => {
  handleScroll();
});

window.addEventListener('load', () => {
  init();
  // Final enforcement after all resources load
  setTimeout(enforceHeroVisibility, 1500);
});

window.addEventListener('resize', init);

// ====================== HERO HEADING PROTECTION ======================
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".text-section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));
});


// ====================== POLYFILLS ======================
// IntersectionObserver polyfill for older browsers
if (!('IntersectionObserver' in window)) {
  import('intersection-observer').then(() => init());
}
