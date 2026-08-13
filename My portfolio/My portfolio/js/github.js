// GitHub API integration and visitor counter placeholder.
const reposGrid = document.getElementById('repos-grid');
const visitorCountEl = document.getElementById('visitor-count');
const copyEmailButton = document.getElementById('copy-email');

async function loadGitHubRepos() {
  if (!reposGrid) return;
  try {
    const response = await fetch('https://api.github.com/users/octocat/repos?per_page=3');
    if (!response.ok) throw new Error('GitHub request failed');
    const repos = await response.json();
    reposGrid.innerHTML = repos.map(repo => `
      <article class="certificate-card reveal">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'A public repository from GitHub.'}</p>
        <div class="meta">
          <span class="badge">★ ${repo.stargazers_count}</span>
          <span class="badge">↻ ${repo.forks_count}</span>
        </div>
      </article>
    `).join('');
  } catch (error) {
    reposGrid.innerHTML = '<article class="certificate-card"><p>GitHub data is temporarily unavailable.</p></article>';
  }
}

function setVisitorCount() {
  const stored = Number(localStorage.getItem('portfolio-visitors') || 0);
  const next = stored + 1;
  localStorage.setItem('portfolio-visitors', String(next));
  if (visitorCountEl) visitorCountEl.textContent = next;
}

copyEmailButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('hello@arielle.dev');
    showToast('Email copied to clipboard');
  } catch (error) {
    showToast('Copy failed');
  }
});

window.addEventListener('offline', () => showToast('You are offline. Some data may be unavailable.'));

loadGitHubRepos();
setVisitorCount();
