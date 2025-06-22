// Rotating Text Functionality
const rotating3DWords = document.querySelectorAll('.rotating-word');
let rotatingIndex = 0;

function rotateWords() {
  rotating3DWords.forEach(word => word.classList.remove('show'));
  rotating3DWords[rotatingIndex].classList.add('show');
  rotatingIndex = (rotatingIndex + 1) % rotating3DWords.length;
}

// Scroll Animations
let lastScrollPosition = 0;
const sections = document.querySelectorAll('.text-section');
const heroContent = document.querySelector('.hero-content');

// Smooth Background and Section Effects
const animateOnScroll = () => {
  const scrollPosition = window.scrollY;
  
  // 1. Background Gradient Effect
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
  document.body.style.backgroundPosition = `0 ${scrollPercent * 100}%`;
  
  // 2. Hero Content Fade
  if (heroContent) {
    const opacity = 1 - Math.min(scrollPosition / 500, 0.7);
    heroContent.style.opacity = opacity;
  }
  
  // 3. Section Animations
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.75;
    section.classList.toggle('visible', isVisible);
  });
  
  lastScrollPosition = scrollPosition;
};

// Initialize Everything
function init() {
  // Start rotating text
  rotateWords();
  setInterval(rotateWords, 2000);
  
  // Trigger first scroll update
  animateOnScroll();
  
  // Set hero image height
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.height = `${window.innerHeight}px`;
  }
}

// Event Listeners
window.addEventListener('scroll', () => {
  requestAnimationFrame(animateOnScroll);
});
window.addEventListener('resize', init);
window.addEventListener('load', init);
