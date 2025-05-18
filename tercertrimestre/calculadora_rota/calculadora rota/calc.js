let resultado = document.getElementById("resultado");

function agregarNumero(num) {
  if (num === "punto") {
    if (!resultado.value.includes(".")) {
      resultado.value += ".";
    }
  } else {
    resultado.value += num;
  }
}

/*borrar pantalla*/
function limpiar() {
  resultado.value = "";
}

/*borrar carácter*/
function borrar() {
  resultado.value = resultado.value.slice(0, -1);
}

function operar(op) {
  try {
    let valor = parseFloat(resultado.value);

    switch (op) {
      case "raiz":
        resultado.value = Math.sqrt(valor);
        break;

      case "fraccion":
        if (valor !== 0) {
          resultado.value = 1 / valor;
        } else {
          resultado.value = "Error";
        }
        break;

      case "x²":
        resultado.value = Math.pow(valor, 2);
        break;

      default:
        resultado.value += op; /*para operaciones normales (+, -, *, /)*/
        break;
    }
  } catch (error) {
    resultado.value = "Error";
  }
}

/*convertir a binario o hexadecimal*/
function calcular(tipo) {
  try {
    let valor = eval(resultado.value);

    if (tipo === "bin") {
      resultado.value = valor.toString(2);
    } else if (tipo === "hex") {
      resultado.value = valor.toString(16).toUpperCase();
    } else {
      resultado.value = valor; /*resultado normal*/
    }
  } catch (error) {
    resultado.value = "Error";
  }
}
