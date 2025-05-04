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

	function copiarColorAlPortapapeles(valorHex) {
		navigator.clipboard.writeText(valorHex)
			.then(() => alert(`¡Color ${valorHex} copiado al portapapeles!`))
			.catch(() => alert('¡Error al copiar el color!'));
	}

	botonRecargar.addEventListener('click', generarPaletaColores);
});
