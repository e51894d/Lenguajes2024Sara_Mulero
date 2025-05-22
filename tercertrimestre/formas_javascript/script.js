const colors = ['white', 'red', 'blue', 'green', 'yellow'];
const colorNames = {
    'white': 'Blanco',
    'red': 'Rojo',
    'blue': 'Azul',
    'green': 'Verde',
    'yellow': 'Amarillo'
};
let currentColorIndex = 0;

// Elementos draggables
const draggables = document.querySelectorAll('.draggable');
const bigSquare = document.getElementById('bigSquare');

// Contadores
const squareCount = document.getElementById('squareCount');
const circleCount = document.getElementById('circleCount');
const triangleCount = document.getElementById('triangleCount');
const squareColor = document.getElementById('squareColor');
const circleColor = document.getElementById('circleColor');
const triangleColor = document.getElementById('triangleColor');

// Función para actualizar contadores
function updateCounters() {
    const bigSquareRect = bigSquare.getBoundingClientRect();
    const allShapes = bigSquare.querySelectorAll('svg');
    
    let squares = 0;
    let circles = 0;
    let triangles = 0;
    let lastSquareColor = 'Blanco';
    let lastCircleColor = 'Blanco';
    let lastTriangleColor = 'Blanco';

    allShapes.forEach(shape => {
        const shapeRect = shape.getBoundingClientRect();
        // Verificar si la forma está completamente dentro del cuadrado grande
        if (shapeRect.left >= bigSquareRect.left &&
            shapeRect.right <= bigSquareRect.right &&
            shapeRect.top >= bigSquareRect.top &&
            shapeRect.bottom <= bigSquareRect.bottom) {
            
            const fill = shape.querySelector('rect, circle, polygon').getAttribute('fill');
            const colorName = colorNames[fill] || 'Blanco';
            
            if (shape.querySelector('rect')) {
                squares++;
                lastSquareColor = colorName;
            }
            if (shape.querySelector('circle')) {
                circles++;
                lastCircleColor = colorName;
            }
            if (shape.querySelector('polygon')) {
                triangles++;
                lastTriangleColor = colorName;
            }
        }
    });
    
    squareCount.textContent = squares;
    circleCount.textContent = circles;
    triangleCount.textContent = triangles;
    squareColor.textContent = lastSquareColor;
    circleColor.textContent = lastCircleColor;
    triangleColor.textContent = lastTriangleColor;
}

// Cambiar color al hacer clic
function changeColor(element) {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    const shape = element.querySelector('rect, circle, polygon');
    if (shape) {
        shape.setAttribute('fill', colors[currentColorIndex]);
    }
}

// Hacer un elemento draggable con clonación
function makeDraggable(draggable) {
    let isDragging = false;
    let hasMoved = false;
    let initialX, initialY;
    let xOffset = 0, yOffset = 0;

    // Agregar evento de clic para cambiar color
    draggable.addEventListener('click', (e) => {
        if (!hasMoved) {
            e.stopPropagation();
            changeColor(draggable);
        }
    });

    draggable.addEventListener('mousedown', (e) => {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        hasMoved = false;
        isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let dx = e.clientX - initialX;
            let dy = e.clientY - initialY;

            if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                hasMoved = true;
            }

            const bigSquareRect = bigSquare.getBoundingClientRect();
            const draggableRect = draggable.getBoundingClientRect();

            let newX = dx;
            let newY = dy;

            const maxX = bigSquareRect.width - draggableRect.width;
            const maxY = bigSquareRect.height - draggableRect.height;

            xOffset = Math.min(Math.max(0, newX), maxX);
            yOffset = Math.min(Math.max(0, newY), maxY);

            setTranslate(xOffset, yOffset, draggable);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Posicionar el elemento con transform
function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Configuración inicial de los elementos originales
draggables.forEach(original => {
    let isDragging = false;
    let hasMoved = false;
    let initialX, initialY;
    let currentX, currentY;

    // Clic: cambia color
    original.addEventListener('click', (e) => {
        if (!hasMoved) {
            e.stopPropagation();
            changeColor(original);
        }
    });

    // Mousedown: comenzar arrastre
    original.addEventListener('mousedown', (e) => {
        initialX = e.clientX;
        initialY = e.clientY;
        hasMoved = false;
        isDragging = true;
    });

    // Mousemove: detectar movimiento
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            if (Math.abs(e.clientX - initialX) > 1 || Math.abs(e.clientY - initialY) > 2) {
                hasMoved = true;
            }
            currentX = e.clientX;
            currentY = e.clientY;
        }
    });

    // Mouseup: clonar figura si hubo movimiento
    document.addEventListener('mouseup', (e) => {
        if (isDragging && hasMoved) {
            const bigSquareRect = bigSquare.getBoundingClientRect();
            const mouseX = e.clientX - bigSquareRect.left;
            const mouseY = e.clientY - bigSquareRect.top;

            const clone = original.cloneNode(true);
            clone.classList.add('draggable');

            // Copiar el color actual
            const originalShape = original.querySelector('rect, circle, polygon');
            const cloneShape = clone.querySelector('rect, circle, polygon');
            const fill = originalShape.getAttribute('fill');
            cloneShape.setAttribute('fill', fill);

            // Posición absoluta en contenedor
            clone.style.position = 'absolute';
            clone.style.left = `${mouseX - 25}px`;
            clone.style.top = `${mouseY - 25}px`;
            clone.style.transform = 'none';

            bigSquare.appendChild(clone);
            makeDraggable(clone);
            updateCounters(); // Actualizar contadores después de clonar
        }
        isDragging = false;
    });
});

// Inicializar contadores
updateCounters();
