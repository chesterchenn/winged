const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  window.electronAPI.run();
});
