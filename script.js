// ====================== ROTATING TEXT ======================
const rotating3DWords = document.querySelectorAll('.rotating-word');
let rotatingIndex = 0;

function rotateWords() {
  rotating3DWords.forEach(word => word.classList.remove('show'));
  rotating3DWords[rotatingIndex].classList.add('show');
  rotatingIndex = (rotatingIndex + 1) % rotating3DWords.length;
}

// ====================== SMOOTH SCROLL EFFECTS ======================
let lastScrollPosition = 0;
let ticking = false;

const sections = document.querySelectorAll('.text-section');
const heroImage = document.querySelector('.hero-image');
const heroContent = document.querySelector('.hero-content');

// Modern Intersection Observer for sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Smooth background and parallax effects
const animateScroll = (scrollPosition) => {
  // 1. Gradient scroll effect
  const maxScroll = window.innerHeight * 2;
  const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
  document.body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
  
  // 2. Hero image parallax (subtle movement)
  if (heroImage) {
    const parallaxOffset = scrollPosition * 0.3;
    heroImage.style.transform = `translateY(${parallaxOffset}px)`;
  }
  
  // 3. Hero content fade out
  if (heroContent) {
    const opacity = 1 - Math.min(scrollPosition / 500, 0.8);
    heroContent.style.opacity = opacity;
    heroContent.style.transform = `translateY(${scrollPosition * 0.15}px)`;
  }
  
  // 4. Direction-aware scroll for extra smoothness
  const scrollDirection = scrollPosition > lastScrollPosition ? 'down' : 'up';
  lastScrollPosition = scrollPosition;
};

// Optimized scroll handler
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      animateScroll(window.scrollY);
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
  
  // Set initial hero styles
  if (heroContent) {
    heroContent.style.willChange = 'opacity, transform';
  }
  if (heroImage) {
    heroImage.style.willChange = 'transform';
  }
  
  // Trigger first render
  animateScroll(window.scrollY);
}

// ====================== EVENT LISTENERS ======================
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', init);
window.addEventListener('resize', () => animateScroll(window.scrollY));

// ====================== POLYFILL FOR OLDER BROWSERS ======================
// IntersectionObserver polyfill for Safari < 12.1
if (!('IntersectionObserver' in window)) {
  import('intersection-observer').then(() => init());
} else {
  init();
}
