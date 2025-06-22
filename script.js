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
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = Math.min(scrollPosition / documentHeight * 1.5, 1);
  
  document.body.style.background = `
    linear-gradient(
      to bottom,
      var(--white) 0%,
      var(--light-blue) ${scrollPercentage * 100}%,
      var(--light-blue) 100%
    )
  `;
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
