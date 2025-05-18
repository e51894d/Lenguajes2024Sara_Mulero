document.getElementById("calcular").addEventListener("click", function() {
    const numero = Number(document.getElementById("numero").value);
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    
    if (!isNaN(numero) && numero > 0) {
        for (let n = 1; n <= numero; n++) {
            const tabla = document.createElement("div");
            tabla.innerHTML = `<strong>Tabla del ${n}</strong><br>`;
            for (let i = 0; i <= 10; i++) {
                tabla.innerHTML += `${n} X ${i} = ${n * i}<br>`;
            }
            resultado.appendChild(tabla);
        }
    } else {
        resultado.innerHTML = "Por favor, ingrese un número válido mayor que 0.";
    }
});
