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

// Replace your animateScroll function with:
const animateScroll = (scrollPosition) => {
  // 1. Gradient scroll
  const maxScroll = window.innerHeight * 2;
  const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
  document.body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
  
  // 2. Hero content fade only (no movement)
  if (heroContent) {
    const opacity = 1 - Math.min(scrollPosition / 800, 0.7);
    heroContent.style.opacity = opacity;
  }
  
  // 3. Handle scroll-up fading for sections
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const visibility = Math.min(
        1 - (window.innerHeight - rect.top) / (window.innerHeight * 0.3),
        1
      );
      section.style.opacity = visibility;
      section.style.transform = `translateY(${(1 - visibility) * 20}px) scale(${0.95 + (visibility * 0.05)})`;
    }
  });
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
