const keyBox = document.getElementById('keyBox');

document.addEventListener('keydown', function(event) {
  const key = event.key.toUpperCase();
  if (key >= 'A' && key <= 'Z') {
    keyBox.textContent = key;
  }
});

document.addEventListener('keyup', function(event) {
  keyBox.textContent = '';
});
