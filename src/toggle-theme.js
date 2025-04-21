const toggleThemeButton = document.getElementById('toggle-mode');

toggleThemeButton.addEventListener('click', (event) => {
  document.documentElement.classList.toggle('dark-theme');
})