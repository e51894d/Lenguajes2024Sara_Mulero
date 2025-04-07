let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let intervalo;

function actualizarInterfaz() {
  document.getElementById("minutos").textContent = minutos.toString().padStart(2, '0');
  document.getElementById("segundos").textContent = segundos.toString().padStart(2, '0');
  document.getElementById("milisegundos").textContent = milisegundos.toString().padStart(3, '0');
}

function iniciar() {
  if (!intervalo) {
    intervalo = setInterval(() => {
      milisegundos += 10;
      if (milisegundos >= 1000) {
        milisegundos = 0;
        segundos++;
      }
      if (segundos >= 60) {
        segundos = 0;
        minutos++;
      }
      actualizarInterfaz();
    }, 10);
  }
}

function detener() {
  clearInterval(intervalo);
  intervalo = null;
}

function reiniciar() {
  detener();
  minutos = 0;
  segundos = 0;
  milisegundos = 0;
  actualizarInterfaz();
}
