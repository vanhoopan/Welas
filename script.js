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

// Replace your IntersectionObserver with this
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Only remove visible class if scrolled past
      if (entry.boundingClientRect.top < 0) {
        entry.target.classList.remove('visible');
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
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
