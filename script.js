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
  const scrollY = window.scrollY;
  const stage1Trigger = window.innerHeight * 0.5;
  const stage2Trigger = window.innerHeight * 1.5;
  
  // Toggle classes more efficiently
  document.body.classList.toggle('bg-stage1', scrollY > stage1Trigger && scrollY <= stage2Trigger);
  document.body.classList.toggle('bg-stage2', scrollY > stage2Trigger);
  
  // Update CSS variable
  document.body.style.setProperty('--scroll-intensity', 
    Math.min(scrollY / stage1Trigger, 1));
  
  // Add to the end of animateBackground()
  const hero = document.querySelector('.hero');
  hero.style.opacity = 1 - (intensity * 0.3); // Fades hero slightly on scroll
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
