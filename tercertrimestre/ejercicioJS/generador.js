
document.addEventListener("DOMContentLoaded", function () {
    
    const listaColores = document.getElementById('listaColores');
    const entradaBusqueda = document.getElementById('entradaBusqueda');
    const botonRecargar = document.getElementById('botonRecargar');

    //generar paleta de colores al cargar
    generarPaletaColores();

    //función para generar paleta
    function generarPaletaColores() {
        
        const maxColores = 21;
        const arregloColores = [];

        for (let i = 0; i < maxColores; i++) {
            const colorHexAleatorio = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
            arregloColores.push(colorHexAleatorio);
        }

        mostrarListaColores(arregloColores);
    }

    //mstrar lista de colores
    function mostrarListaColores(arregloColores) {
        listaColores.innerHTML = ''; // Limpiar la lista anterior

        arregloColores.forEach((valorHex, indice) => {
            
            const elemento = document.createElement('li');
            
            elemento.classList.add('color');
            elemento.innerHTML = `
						<div class="caja-color" style="background: ${valorHex}"></div>
						<span class="valor-hex">${valorHex}</span>
					`;
            elemento.addEventListener('click', () => copiarColorAlPortapapeles(valorHex, indice));
            listaColores.appendChild(elemento);
        });
    }

    //copiar color al portapapeles
    function copiarColorAlPortapapeles(valorHex, indice) {
        
        navigator.clipboard.writeText(valorHex)
            .then(() => {
                alert('¡Color copiado!');
            })
            .catch(() => {
                alert('¡Error al copiar el color!');
            });
    }

    //evento de búsqueda
    entradaBusqueda.addEventListener('input', () => {
        
        const valorBusqueda = entradaBusqueda.value.toLowerCase();

        const mapeoColores = {
            rojo: ["#FF0000", "#FF5733", "#c21919", "#FF6347", "#FF4500"],
            verde: ["#00FF00", "#33FF73", "#C3FF00", "#228B22", "#008000"],
            azul: ["#0000FF", "#3373FF", "#00C3FF", "#1E90FF", "#4169E1"],
            //se pueden añadir más colores
        };

        const coloresCoincidentes = mapeoColores[valorBusqueda] || [];

        if (coloresCoincidentes.length > 0) {
            mostrarListaColores(coloresCoincidentes);
        } else {
            generarPaletaColores();
        }
    });

    //botón para recargar
    botonRecargar.addEventListener('click', generarPaletaColores);
});
