const toggleModeButton = document.getElementById('toggle-mode');

toggleModeButton.addEventListener('click', (event) => {
  document.documentElement.classList.toggle('dark-theme');
})