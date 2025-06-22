const rotatingWords = document.querySelectorAll('.rotating-text .word');
let currentWordIndex = 0;

setInterval(() => {
  rotatingWords[currentWordIndex].classList.remove('active');
  currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
  rotatingWords[currentWordIndex].classList.add('active');
}, 3000);


const sections = document.querySelectorAll('.text-section');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      section.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
