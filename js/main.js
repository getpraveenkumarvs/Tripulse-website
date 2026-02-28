/* ========== Mobile Navigation ========== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function toggleMenu() {
  navLinks.classList.toggle('open');
  navOverlay.classList.toggle('open');
}

if (hamburger) hamburger.addEventListener('click', toggleMenu);
if (navOverlay) navOverlay.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navOverlay.classList.remove('open');
  });
});

/* ========== Active nav link highlight ========== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ========== Scroll reveal animation ========== */
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .feature-card, .contact-info, .contact-form-card, .hp-trust__item, .hp-dest__card, .hp-pkg__tile, .hp-how__step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// CSS class for revealed items
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
