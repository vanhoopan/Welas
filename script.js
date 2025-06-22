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
  
  // Smooth background positioning
  document.body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
  
  // Optional: Fade out hero content gradually
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = 1 - (scrollPercent * 0.5);
  }
};

// Initialize everything
function init() {
  rotateWords();
  revealOnScroll();
  animateBackground();
  setInterval(rotateWords, 2000);
}

// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', init);
