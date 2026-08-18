// Command palette for quick navigation.
const commandPalette = document.getElementById('command-palette');
const commandInput = document.getElementById('command-input');
const commandItems = Array.from(document.querySelectorAll('.command-item'));

function openCommandPalette() {
  commandPalette?.classList.add('open');
  commandInput?.focus();
}

function closeCommandPalette() {
  commandPalette?.classList.remove('open');
}

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openCommandPalette();
  }
  if (event.key === 'Escape') closeCommandPalette();
});

commandItems.forEach(item => item.addEventListener('click', () => {
  const text = item.textContent.trim();
  if (text.includes('About')) document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  if (text.includes('Projects')) document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  if (text.includes('Contact')) document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  closeCommandPalette();
}));

commandPalette?.addEventListener('click', (event) => {
  if (event.target === commandPalette) closeCommandPalette();
});
