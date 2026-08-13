// Navigation behavior, mobile menu, and active section handling.
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const mobileNav = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('.menu-toggle');

function toggleMenu() {
  mobileNav?.classList.toggle('open');
}

function closeMenuOnResize() {
  if (window.innerWidth > 740) {
    mobileNav?.classList.remove('open');
  }
}

function updateActiveSection() {
  const sections = document.querySelectorAll('main section[id]');
  let current = sections[0]?.id;
  sections.forEach(section => {
    const top = window.scrollY + 140;
    if (top >= section.offsetTop) current = section.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === `#${current}`);
  });
}

menuToggle?.addEventListener('click', toggleMenu);
window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('load', updateActiveSection);
window.addEventListener('resize', closeMenuOnResize);
navLinks.forEach(link => link.addEventListener('click', () => mobileNav?.classList.remove('open')));
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileNav?.classList.remove('open')));
