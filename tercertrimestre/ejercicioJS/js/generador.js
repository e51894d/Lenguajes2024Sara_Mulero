//"DOMContentLoaded": evento que se activa cuando todo el HTML ha sido cargado (sin esperar imágenes).
//.addEventListener(): para ejecutar un código cuando quiero que ocurra un evento
//getElementById(...): obtenerr elementos html con un id specifico

document.addEventListener("DOMContentLoaded", function () {
	
    const listaColores = document.getElementById('listaColores');
	const botonRecargar = document.getElementById('botonRecargar');

	generarPaletaColores();

	function generarPaletaColores() {
		const maxColores = 20;
		const arregloColores = [];

		for (let i = 0; i < maxColores; i++) {
			
			const colorHexAleatorio = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
			arregloColores.push(colorHexAleatorio);
		}

		mostrarListaColores(arregloColores);
	}

	function mostrarListaColores(arregloColores) {
		
		listaColores.innerHTML = '';

		arregloColores.forEach((valorHex) => {
			
			const elemento = document.createElement('ul');
			
			elemento.classList.add('color');
			elemento.innerHTML = `
				<div class="caja-color" style="background: ${valorHex}"></div>
				<span class="valor-hex">${valorHex}</span>
			`;
			
			elemento.addEventListener('click', () => copiarColorAlPortapapeles(valorHex));
			listaColores.appendChild(elemento);
		});
	}

	botonRecargar.addEventListener('click', generarPaletaColores);
});

