const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
);

revealItems.forEach((item) => revealObserver.observe(item));

const parallaxNodes = document.querySelectorAll('[data-parallax]');
let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;

  parallaxNodes.forEach((node) => {
    const speed = Number(node.getAttribute('data-parallax')) || 0;
    const y = Math.round(scrollY * speed * 0.2);
    node.style.transform = `translate3d(0, ${y}px, 0)`;
  });

  ticking = false;
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
updateParallax();
