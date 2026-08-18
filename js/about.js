// About tabs interaction.
const aboutTabs = Array.from(document.querySelectorAll('.about-tab'));
const aboutPanels = Array.from(document.querySelectorAll('.about-panel'));

aboutTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    aboutTabs.forEach(item => item.classList.remove('active'));
    aboutPanels.forEach(panel => panel.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`panel-${tab.dataset.tab}`)?.classList.add('active');
  });
});
