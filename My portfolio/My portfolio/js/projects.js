// Project filtering, search, modal, and lazy loading.
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const filterChips = Array.from(document.querySelectorAll('.filter-chip'));
const projectSearch = document.querySelector('#project-search');
const modalBackdrop = document.querySelector('#project-modal');
const modalBody = document.querySelector('#project-modal .modal');
const closeModal = document.querySelector('#project-modal .close-btn');

const projectData = [
  {
    title: 'NeonOS',
    category: 'web',
    summary: 'A terminal-inspired operating system UI with immersive motion.',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    link: '#'
  },
  {
    title: 'Signal Vault',
    category: 'security',
    summary: 'A secure dashboard for privacy workflows and threat analytics.',
    tags: ['Security', 'Analytics', 'UI'],
    link: '#'
  },
  {
    title: 'Lumen Commerce',
    category: 'product',
    summary: 'Commerce experience focused on high-conversion product storytelling.',
    tags: ['UX', 'Performance', 'Design'],
    link: '#'
  }
];

function applyProjectFilters() {
  const active = document.querySelector('.filter-chip.active')?.dataset.filter || 'all';
  const query = (projectSearch?.value || '').toLowerCase();
  projectCards.forEach(card => {
    const matchesCategory = active === 'all' || card.dataset.category === active;
    const matchesQuery = card.dataset.title.toLowerCase().includes(query) || card.dataset.summary.toLowerCase().includes(query);
    card.style.display = matchesCategory && matchesQuery ? 'block' : 'none';
  });
}

filterChips.forEach(chip => chip.addEventListener('click', () => {
  filterChips.forEach(item => item.classList.remove('active'));
  chip.classList.add('active');
  applyProjectFilters();
}));

projectSearch?.addEventListener('input', applyProjectFilters);

function openProjectModal(project) {
  modalBody.innerHTML = `
    <div class="modal-header">
      <h3>${project.title}</h3>
      <button class="close-btn" aria-label="Close">×</button>
    </div>
    <p>${project.summary}</p>
    <div class="meta">
      ${project.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
    </div>
    <div class="actions">
      <a class="btn btn-primary" href="${project.link}">Launch Project</a>
    </div>
  `;
  modalBackdrop.classList.add('open');
}

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const project = projectData.find(item => item.title === card.dataset.title) || projectData[0];
    openProjectModal(project);
  });
});

function closeProjectModal() {
  modalBackdrop.classList.remove('open');
}

closeModal?.addEventListener('click', closeProjectModal);
modalBackdrop?.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) closeProjectModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeProjectModal();
});

applyProjectFilters();
