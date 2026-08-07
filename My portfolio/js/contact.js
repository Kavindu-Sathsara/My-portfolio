// Contact form validation and toast feedback.
const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const formStatus = document.querySelector('#form-status');

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setError(input, message) {
  const error = input.parentElement.querySelector('.error');
  if (error) error.textContent = message;
}

function clearError(input) {
  const error = input.parentElement.querySelector('.error');
  if (error) error.textContent = '';
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  if (!nameInput.value.trim()) { setError(nameInput, 'Please enter your name.'); valid = false; }
  else clearError(nameInput);
  if (!validateEmail(emailInput.value.trim())) { setError(emailInput, 'Please enter a valid email.'); valid = false; }
  else clearError(emailInput);
  if (!messageInput.value.trim()) { setError(messageInput, 'Please add a message.'); valid = false; }
  else clearError(messageInput);
  if (!valid) return;
  formStatus.textContent = 'Message sent successfully.';
  form.reset();
  showToast('Thanks for reaching out');
});
