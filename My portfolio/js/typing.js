// Typing animation for the hero headline.
const typingTarget = document.querySelector('[data-typing]');
const roles = ['BICT Undergraduate', 'Tech Blogger', 'Network Enthusiast'];

function typeLoop() {
  if (!typingTarget) return;
  let index = 0;
  let charIndex = 0;
  let deleting = false;
  const tick = () => {
    const currentRole = roles[index];
    typingTarget.textContent = currentRole.slice(0, charIndex);
    if (!deleting && charIndex < currentRole.length) {
      charIndex += 1;
    } else if (!deleting && charIndex === currentRole.length) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    } else if (deleting && charIndex > 0) {
      charIndex -= 1;
    } else {
      deleting = false;
      index = (index + 1) % roles.length;
    }
    setTimeout(tick, deleting ? 60 : 90);
  };
  tick();
}

typeLoop();
