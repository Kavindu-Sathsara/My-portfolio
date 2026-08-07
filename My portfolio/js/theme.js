// Theme toggle and local storage memory.
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  const nextTheme = theme === 'light' ? 'light-theme' : '';
  root.classList.toggle('light-theme', theme === 'light');
  document.body.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'light' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
  }
}

function initTheme() {
  const storedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(storedTheme);
  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.classList.contains('light-theme') ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
    showToast(`Theme switched to ${nextTheme}`);
  });
}

initTheme();
