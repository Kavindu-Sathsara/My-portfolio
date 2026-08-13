// Photography gallery lightbox and filtering.
const photoCards = Array.from(document.querySelectorAll('.photo-card'));
const galleryFilters = Array.from(document.querySelectorAll('.gallery-filter'));
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox img');
const lightboxClose = document.querySelector('#lightbox .close-btn');

function showLightbox(src) {
  lightboxImage.src = src;
  lightbox.classList.add('open');
}

photoCards.forEach(card => {
  card.addEventListener('click', () => showLightbox(card.dataset.src));
});

lightboxClose?.addEventListener('click', () => lightbox.classList.remove('open'));
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.classList.remove('open');
});

galleryFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    galleryFilters.forEach(item => item.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;
    photoCards.forEach(card => {
      card.style.display = category === 'all' || card.dataset.category === category ? 'block' : 'none';
    });
  });
});
