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

// 1. Remove hero movement on scroll - we'll only fade content
// 2. Set white text for hero elements (done via CSS later)
document.querySelectorAll('.hero-content, .hero h2, .hero p, .rotating-text-3d, .hero .cta-button').forEach(el => {
  el.style.color = '#ffffff';
  el.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
});

// Enhanced Intersection Observer with fade-out
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const target = entry.target;
    const isAboveViewport = entry.boundingClientRect.top < 0;
    
    // 3. Smooth fade-out when scrolling up
    if (!entry.isIntersecting && isAboveViewport) {
      const viewportHeight = window.innerHeight;
      const distanceFromTop = -entry.boundingClientRect.top;
      const fadeOutPercent = Math.min(distanceFromTop / (viewportHeight * 0.3), 1);
      
      target.style.opacity = 1 - fadeOutPercent;
      target.style.transform = `translateY(${distanceFromTop * 0.2}px) scale(${1 - (fadeOutPercent * 0.05)})`;
    } 
    else {
      target.classList.toggle('visible', entry.isIntersecting);
      if (entry.isIntersecting) {
        target.style.opacity = 1;
        target.style.transform = 'translateY(0) scale(1)';
      }
    }
  });
}, {
  threshold: Array.from({ length: 100 }, (_, i) => i * 0.01), // 100 checkpoints
  rootMargin: '0px 0px -50px 0px'
});

// Optimized scroll handler (hero stays fixed)
const animateScroll = (scrollPosition) => {
  // Gradient scroll only
  const maxScroll = window.innerHeight * 2;
  const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
  document.body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
  
  // Hero content fade only (no movement)
  if (heroContent) {
    const opacity = 1 - Math.min(scrollPosition / 600, 0.7); // Slower fade
    heroContent.style.opacity = opacity;
  }
};

// ====================== INITIALIZATION ======================
function init() {
  // Start rotating text
  rotateWords();
  setInterval(rotateWords, 2000);
  
  // Observe all sections
  sections.forEach(section => {
    sectionObserver.observe(section);
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
  });
  
  // Set initial styles
  if (heroContent) {
    heroContent.style.willChange = 'opacity';
  }
  
  animateScroll(window.scrollY);
}

// ====================== EVENT LISTENERS ======================
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      animateScroll(window.scrollY);
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener('load', init);
window.addEventListener('resize', () => animateScroll(window.scrollY));
