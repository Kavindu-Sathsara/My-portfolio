// Premium cursor and magnetic interaction.
const cursorDot = document.createElement('div');
cursorDot.id = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorRing = document.createElement('div');
cursorRing.id = 'cursor-ring';
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

function moveCursor(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateCursor);
}

function setHoverState() {
  document.querySelectorAll('a, button, .project-card, .skill-card, .btn, .social-pill, .magnetic').forEach(element => {
    element.addEventListener('mouseenter', () => cursorRing.style.width = '60px');
    element.addEventListener('mouseleave', () => cursorRing.style.width = '38px');
  });
}

function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    document.body.classList.add('touch-device');
    return;
  }
  document.addEventListener('mousemove', moveCursor);
  window.addEventListener('mousedown', () => {
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(0.9)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(1.15)`;
  });
  window.addEventListener('mouseup', () => {
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) scale(1)`;
  });
  setHoverState();
  animateCursor();
}

initCursor();
