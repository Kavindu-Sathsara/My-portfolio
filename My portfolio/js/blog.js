// Blog search, category filtering, and related articles.
const blogCards = Array.from(document.querySelectorAll('.blog-card'));
const blogSearch = document.querySelector('#blog-search');
const blogFilters = Array.from(document.querySelectorAll('.blog-filter'));

function applyBlogFilters() {
  const active = document.querySelector('.blog-filter.active')?.dataset.filter || 'all';
  const query = (blogSearch?.value || '').toLowerCase();
  blogCards.forEach(card => {
    const matchesCategory = active === 'all' || card.dataset.category === active;
    const matchesQuery = card.dataset.title.toLowerCase().includes(query) || card.dataset.summary.toLowerCase().includes(query);
    card.style.display = matchesCategory && matchesQuery ? 'block' : 'none';
  });
}

blogFilters.forEach(filter => filter.addEventListener('click', () => {
  blogFilters.forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  applyBlogFilters();
}));

blogSearch?.addEventListener('input', applyBlogFilters);
applyBlogFilters();
