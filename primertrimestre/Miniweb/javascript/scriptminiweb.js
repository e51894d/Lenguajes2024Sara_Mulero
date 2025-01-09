const darkenButton = document.getElementById('darkenButton');
const container = document.querySelector('.container');

//para alternar la clase 'dark' en el contenedor//
darkenButton.addEventListener('click', () => {
    container.classList.toggle('dark');
});