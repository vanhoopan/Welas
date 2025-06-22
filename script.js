// Rotating text functionality
const rotating3DWords = document.querySelectorAll('.rotating-word');
let rotatingIndex = 0;

function rotateWords() {
  rotating3DWords.forEach(word => word.classList.remove('show'));
  rotating3DWords[rotatingIndex].classList.add('show');
  rotatingIndex = (rotatingIndex + 1) % rotating3DWords.length;
}

// Scroll animations
const sections = document.querySelectorAll('.text-section');
let scrollTimeout;

function handleScroll() {
  // Debounce scroll events
  window.cancelAnimationFrame(scrollTimeout);
  scrollTimeout = window.requestAnimationFrame(() => {
    revealOnScroll();
    animateBackground();
  });
}

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    section.classList.toggle('visible', rect.top < triggerBottom);
  });
};

const animateBackground = () => {
  const scrollPosition = window.scrollY;
  const maxScroll = window.innerHeight * 2;
  const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
  
  // Ultra-smooth background
  document.body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
};

// New Intersection Observer for sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.15, // Triggers when 15% of section is visible
  rootMargin: '0px 0px -100px 0px' // Bottom offset
});

// Initialize everything
function init() {
  // Observe all sections
  document.querySelectorAll('.text-section').forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Start animations
  rotateWords();
  animateBackground();
  setInterval(rotateWords, 2000);
}

// Event listeners
window.addEventListener('scroll', () => {
  requestAnimationFrame(animateBackground);
});
window.addEventListener('load', init);
