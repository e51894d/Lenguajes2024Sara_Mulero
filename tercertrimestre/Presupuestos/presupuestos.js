document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const anchoInput = document.getElementById('ancho');
    const altoInput = document.getElementById('alto');
    const largoInput = document.getElementById('largo');
    const materialSelect = document.getElementById('material');
    const btnCalcular = document.getElementById('btnCalcular');

    const precioBaseInput = document.getElementById('precioBase');
    const incrementoPlasticoInput = document.getElementById('incrementoPlastico');
    const incrementoCartonInput = document.getElementById('incrementoCarton');
    const incrementoMaderaInput = document.getElementById('incrementoMadera');
    const ivaInput = document.getElementById('iva');

    const resDimensiones = document.getElementById('resDimensiones');
    const resVolumen = document.getElementById('resVolumen');
    const resSuperficie = document.getElementById('resSuperficie');
    const resMaterial = document.getElementById('resMaterial');
    const resPrecioSinIva = document.getElementById('resPrecioSinIva');
    const resPrecioConIva = document.getElementById('resPrecioConIva');
    const mensajesErrorDiv = document.getElementById('mensajesError');

    // Función para formatear a moneda (Euro)
    function formatearMoneda(valor) {
        return valor.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
    }

    // Función para mostrar mensajes de error
    function mostrarErrores(errores) {
        mensajesErrorDiv.innerHTML = ''; // Limpiar errores anteriores
        if (errores.length > 0) {
            const listaErrores = document.createElement('ul');
            errores.forEach(error => {
                const itemError = document.createElement('li');
                itemError.textContent = error;
                listaErrores.appendChild(itemError);
            });
            mensajesErrorDiv.appendChild(listaErrores);
            // Limpiar resultados si hay errores
            resDimensiones.textContent = 'Dimensiones de la caja: --';
            resVolumen.textContent = 'Volumen en cm³: --';
            resSuperficie.textContent = 'Superficie en cm²: --';
            resMaterial.textContent = 'Material seleccionado: --';
            resPrecioSinIva.textContent = 'Precio sin IVA: --';
            resPrecioConIva.textContent = 'Precio con IVA: --';
        } 
    }
    
    // Función principal de cálculo
    btnCalcular.addEventListener('click', () => {
        mensajesErrorDiv.innerHTML = ''; // Limpiar errores al inicio de un nuevo cálculo
        let errores = [];

        // 1. Obtener y convertir valores de entrada
        const ancho = parseFloat(anchoInput.value);
        const alto = parseFloat(altoInput.value);
        const largo = parseFloat(largoInput.value);
        const material = materialSelect.value;

        const precioBaseM2 = parseFloat(precioBaseInput.value);
        const incPlastico = parseFloat(incrementoPlasticoInput.value);
        const incCarton = parseFloat(incrementoCartonInput.value);
        const incMadera = parseFloat(incrementoMaderaInput.value);
        const ivaPorcentaje = parseFloat(ivaInput.value);

        // 2. Validaciones
        if (isNaN(ancho) || isNaN(alto) || isNaN(largo) || ancho <= 0 || alto <= 0 || largo <= 0) {
            errores.push('Las dimensiones deben ser números positivos.');
        }
        if (isNaN(precioBaseM2) || precioBaseM2 <=0) errores.push('El precio base por m² debe ser un número positivo.');
        if (isNaN(incPlastico) || incPlastico < 0) errores.push('El incremento para plástico debe ser un número positivo o cero.');
        if (isNaN(incCarton) || incCarton < 0) errores.push('El incremento para cartón debe ser un número positivo o cero.');
        if (isNaN(incMadera) || incMadera < 0) errores.push('El incremento para madera debe ser un número positivo o cero.');
        if (isNaN(ivaPorcentaje) || ivaPorcentaje < 0) errores.push('El IVA debe ser un número positivo o cero.');

        const dimensiones = [ancho, alto, largo].filter(d => !isNaN(d) && d > 0);
        if (dimensiones.length === 3) {
            dimensiones.sort((a, b) => a - b); // Ordenar para encontrar min y max
            const dimMin = dimensiones[0];
            const dimMax = dimensiones[2];

            if (dimMin < 5) {
                errores.push('Ninguna dimensión puede ser menor a 5 cm.');
            }
            if (dimMax > 100) {
                errores.push('Ninguna dimensión puede ser mayor a 100 cm.');
            }
            if ((dimMax / dimMin) > 5) {
                errores.push('La relación entre la dimensión más grande y la más pequeña no puede superar el factor de 5.');
            }
        } else if (errores.length === 0) { // Solo si no hay errores de NaN previos
            errores.push('Por favor, ingrese las tres dimensiones de la caja.');
        }

        if (errores.length > 0) {
            mostrarErrores(errores);
            return;
        }

        // 3. Cálculos
        // Superficie en cm^2 = 2 * (ancho*largo + ancho*alto + largo*alto)
        const superficieCm2 = 2 * (ancho * largo + ancho * alto + largo * alto);
        const superficieM2 = superficieCm2 / 10000; // Convertir cm^2 a m^2

        // Volumen en cm^3
        const volumenCm3 = ancho * alto * largo;

        let costoBase = superficieM2 * precioBaseM2;
        let incrementoMaterial = 0;
        let nombreMaterial = '';

        switch (material) {
            case 'plastico':
                incrementoMaterial = costoBase * (incPlastico / 100);
                nombreMaterial = 'Plástico';
                break;
            case 'carton':
                incrementoMaterial = costoBase * (incCarton / 100);
                nombreMaterial = 'Cartón';
                break;
            case 'madera':
                incrementoMaterial = costoBase * (incMadera / 100);
                nombreMaterial = 'Madera';
                break;
        }

        const precioSinIva = costoBase + incrementoMaterial;
        const precioConIva = precioSinIva * (1 + ivaPorcentaje / 100);

        // 4. Mostrar Resultados
        resDimensiones.textContent = `Dimensiones de la caja: ${ancho}cm x ${alto}cm x ${largo}cm`;
        resVolumen.textContent = `Volumen en cm³: ${volumenCm3.toFixed(2)}`;
        resSuperficie.textContent = `Superficie en cm²: ${superficieCm2.toFixed(2)} (Superficie en m²: ${superficieM2.toFixed(4)})`;
        resMaterial.textContent = `Material seleccionado: ${nombreMaterial}`;
        resPrecioSinIva.textContent = `Precio sin IVA: ${formatearMoneda(precioSinIva)}`;
        resPrecioConIva.textContent = `Precio con IVA: ${formatearMoneda(precioConIva)}`;
    });
});
