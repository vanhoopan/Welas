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
let isScrolling;

function handleScroll() {
  // Clear any existing scroll timeout
  window.clearTimeout(isScrolling);
  
  // Call animations
  revealOnScroll();
  animateBackground();
  
  // Set a timeout to debounce scroll events
  isScrolling = setTimeout(() => {
    // Optional: Add any post-scroll logic here
  }, 66); // ~15fps for performance
}

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      section.classList.add('visible');
    }
  });
};

const animateBackground = () => {
  const scrollPosition = window.scrollY;
  const stage1Trigger = window.innerHeight * 0.5;
  const stage2Trigger = window.innerHeight * 1.5;

  // Remove all classes first
  document.body.classList.remove('bg-stage1', 'bg-stage2');
  
  // Dramatic color stages
  if (scrollPosition > stage2Trigger) {
    document.body.classList.add('bg-stage2');
  } else if (scrollPosition > stage1Trigger) {
    document.body.classList.add('bg-stage1');
  }
  
  // Smooth color intensity (extra drama)
  const intensity = Math.min(scrollPosition / stage1Trigger, 1);
  document.body.style.setProperty('--scroll-intensity', intensity);
};

// Event listeners
window.addEventListener('scroll', handleScroll); // Combined scroll handler
window.addEventListener('load', () => {
  rotateWords();
  revealOnScroll();
  animateBackground();
});

// Start rotating text
setInterval(rotateWords, 2000);
rotateWords(); // Initial call
