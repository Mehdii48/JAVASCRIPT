// Variables globales
let numeroSecreto = 0;
let intentosMaximos = 0;
let intentosHechos = 0;

// Elementos del DOM
const inputIntentos = document.querySelector('header input[type="number"]');
const btnGuardar = document.querySelector('header button.btn');
const btnReiniciar = document.querySelectorAll('header button.btn')[1];
const inputAdivina = document.querySelector('.guess');
const btnProbar = document.querySelector('.zona-joc button.btn');
const pIntentosRestantes = document.querySelector('.zona-joc div p');
const zonaMensaje = document.querySelector('.zona-missatge');
const body = document.body;

// Función para guardar los intentos máximos
function guardarIntentos() {
    const intentos = parseInt(inputIntentos.value);
    if (intentos > 0) {
        intentosMaximos = intentos;
        intentosHechos = 0;
        numeroSecreto = Math.floor(Math.random() * 100) + 1;
        pIntentosRestantes.textContent = `Intentos restantes: ${intentosMaximos}`;
        zonaMensaje.textContent = "¡Comenzamos la partida!";
        body.style.backgroundColor = '#222';
        inputAdivina.value = '';
        inputAdivina.disabled = false;
        btnProbar.disabled = false;
    } else {
        alert("Introduce un número de intentos válido (mayor que 0).");
    }
}

// Función para jugar una prueba
function jugar() {
    const adivinanza = parseInt(inputAdivina.value);
    if (isNaN(adivinanza) || adivinanza < 1 || adivinanza > 100) {
        alert("Introduce un número entre 1 y 100.");
        return;
    }
    intentosHechos++;
    const intentosRestantes = intentosMaximos - intentosHechos;
    pIntentosRestantes.textContent = `Intentos restantes: ${intentosRestantes}`;

    if (adivinanza === numeroSecreto) {
        zonaMensaje.textContent = "¡Correcto, has adivinado el número!";
        body.style.backgroundColor = 'green';
        inputAdivina.disabled = true;
        btnProbar.disabled = true;
    } else {
        if (intentosRestantes === 0) {
            zonaMensaje.textContent = `¡Has perdido! El número era ${numeroSecreto}.`;
            body.style.backgroundColor = 'red';
            inputAdivina.disabled = true;
            btnProbar.disabled = true;
        } else {
            if (adivinanza > numeroSecreto) {
                zonaMensaje.textContent = "El número secreto es más PEQUEÑO.";
            } else {
                zonaMensaje.textContent = "El número secreto es más GRANDE.";
            }
        }
    }

    inputAdivina.value = '';
    inputAdivina.focus();
}

// Función para reiniciar el juego
function reiniciar() {
    intentosMaximos = 0;
    intentosHechos = 0;
    numeroSecreto = 0;
    inputIntentos.value = '';
    inputAdivina.value = '';
    inputAdivina.disabled = true;
    btnProbar.disabled = true;
    pIntentosRestantes.textContent = 'Intentos restantes: 0';
    zonaMensaje.textContent = "¡Comienza por seleccionar el número de intentos y haz clic en Guardar!";
    body.style.backgroundColor = '#222';
}

// Eventos
btnGuardar.addEventListener('click', guardarIntentos);
btnProbar.addEventListener('click', jugar);
btnReiniciar.addEventListener('click', reiniciar);

// Inicialización
reiniciar();
