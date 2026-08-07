// Main initialization for the portfolio experience.
const ui = {
  preloader: document.querySelector('.preloader'),
  progressBar: document.querySelector('.progress-bar'),
  revealItems: document.querySelectorAll('.reveal'),
  backToTop: document.querySelector('.back-to-top'),
  counters: document.querySelectorAll('[data-counter]'),
  toast: document.querySelector('.toast')
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  ui.progressBar.style.width = `${percent}%`;
}

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  ui.revealItems.forEach(item => observer.observe(item));
}

function animateCounters() {
  ui.counters.forEach(counter => {
    const target = Number(counter.dataset.counter || 0);
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased).toString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function backToTopToggle() {
  ui.backToTop.classList.toggle('visible', window.scrollY > 540);
}

function showToast(message) {
  if (!ui.toast) return;
  ui.toast.textContent = message;
  ui.toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => ui.toast.classList.remove('show'), 2200);
}

function handlePreloader() {
  if (!ui.preloader) return;
  window.addEventListener('load', () => {
    ui.preloader.classList.add('hidden');
    setTimeout(() => ui.preloader.remove(), 500);
  });
}

function initParallax() {
  const cards = document.querySelectorAll('.hero-card, .section-card, .skill-card, .project-card');
  window.addEventListener('mousemove', (event) => {
    cards.forEach((card, index) => {
      if (!card.classList.contains('hero-card')) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
    });
  });
  window.addEventListener('mouseleave', () => {
    cards.forEach(card => card.style.transform = '');
  });
}

function init() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  updateProgressBar();
  revealOnScroll();
  handlePreloader();
  initParallax();
  backToTopToggle();
  window.addEventListener('scroll', () => {
    updateProgressBar();
    backToTopToggle();
  }, { passive: true });
  window.addEventListener('resize', updateProgressBar);
  document.querySelector('.back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });
  const counterSection = document.querySelector('[data-counter-section]');
  if (counterSection) observer.observe(counterSection);
}

init();
