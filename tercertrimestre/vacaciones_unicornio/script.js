document.addEventListener('DOMContentLoaded', () => {
    const unicornio = document.getElementById('unicornio');
    const unicornioContainer = document.getElementById('unicornio-container');
    const destinos = document.querySelectorAll('.destino');
    const mensajeVacaciones = document.getElementById('mensaje-vacaciones');
    const btnResetUnicornio = document.getElementById('btn-reset-unicornio'); // Botón de reinicio

    let unicornioOriginalParent = unicornio.parentElement; // Guardar el contenedor original
    const mensajeOriginal = mensajeVacaciones.textContent; // Guardar mensaje original

    // Función para reiniciar el estado del unicornio
    function reiniciarUnicornio() {
        // Si el unicornio está en un destino, quitarlo
        if (unicornio.parentElement.classList.contains('destino')) {
            unicornio.parentElement.removeChild(unicornio);
        }

        // Devolver el unicornio a su contenedor original si no está ya allí
        if (!unicornioOriginalParent.contains(unicornio)){
            unicornioOriginalParent.appendChild(unicornio);
        }
        
        // Resetear estilos del unicornio
        unicornio.style.position = 'static';
        unicornio.style.top = 'auto';
        unicornio.style.left = 'auto';
        unicornio.style.transform = 'none';
        unicornio.classList.remove('dragging', 'glow-effect');

        // Restaurar mensaje original
        mensajeVacaciones.textContent = mensajeOriginal;
    }

    // Evento para el botón de reinicio
    btnResetUnicornio.addEventListener('click', reiniciarUnicornio);

    // Evento cuando se empieza a arrastrar el unicornio
    unicornio.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.add('dragging');
        // Pequeño retraso para que el navegador "capture" la imagen de arrastre antes de ocultarla si es necesario
        // setTimeout(() => event.target.style.display = 'none', 0);
    });

    // Evento cuando termina el arrastre (se suelte o no en un destino válido)
    unicornio.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging');
        // event.target.style.display = 'block'; // Asegurarse de que sea visible si se ocultó
        // Si el unicornio no tiene un padre que sea un .destino, devolverlo a su contenedor original
        if (!unicornio.parentElement.classList.contains('destino')){
            if(unicornioOriginalParent && !unicornioOriginalParent.contains(unicornio)) {
                unicornioOriginalParent.appendChild(unicornio);
                unicornio.style.position = 'static'; // Resetear posicionamiento
                unicornio.style.top = 'auto';
                unicornio.style.left = 'auto';
                unicornio.style.transform = 'none';
                // No reiniciar mensaje aquí, solo si el dragend no es sobre un destino válido
                // Si el drag termina y no está en un destino, el mensaje debería reflejar eso o volver al original.
                // Consideraremos que si no está en un destino, se quiere el mensaje original.
                if (!unicornio.parentElement.classList.contains('destino')) {
                     mensajeVacaciones.textContent = mensajeOriginal;
                }
            }
        }
    });

    destinos.forEach(destino => {
        // Evento cuando un elemento arrastrable entra sobre un destino
        destino.addEventListener('dragenter', (event) => {
            event.preventDefault(); // Necesario para permitir el drop
            destino.classList.add('drag-over');
        });

        // Evento cuando un elemento arrastrable está sobre un destino
        destino.addEventListener('dragover', (event) => {
            event.preventDefault(); // Necesario para permitir el drop
            destino.classList.add('drag-over');
        });

        // Evento cuando un elemento arrastrable sale de un destino
        destino.addEventListener('dragleave', () => {
            destino.classList.remove('drag-over');
        });

        // Evento cuando se suelta un elemento arrastrable sobre un destino
        destino.addEventListener('drop', (event) => {
            event.preventDefault();
            destino.classList.remove('drag-over');
            const idUnicornio = event.dataTransfer.getData('text/plain');
            const elementoArrastrado = document.getElementById(idUnicornio);

            if (elementoArrastrado && elementoArrastrado.id === 'unicornio') {
                // Quitar el unicornio de cualquier otro destino o del contenedor inicial
                if (elementoArrastrado.parentElement) {
                    elementoArrastrado.parentElement.removeChild(elementoArrastrado);
                }
                
                // Mover el unicornio al nuevo destino
                destino.appendChild(elementoArrastrado);
                elementoArrastrado.style.position = 'absolute'; // Asegurar posicionamiento para centrarlo con CSS
                elementoArrastrado.style.top = '50%';
                elementoArrastrado.style.left = '50%';
                elementoArrastrado.style.transform = 'translate(-50%, -50%)';

                // Actualizar mensaje
                const nombreDestino = destino.dataset.nombre || 'un lugar desconocido';
                mensajeVacaciones.textContent = `¡El unicornio se fue de vacaciones a ${nombreDestino}!`;
            }
        });
    });
}); 