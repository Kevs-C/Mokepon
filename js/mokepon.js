// Variables globales
let jugadorMascota;
let vidasJugador = 10; // Cambiar a 10 puntos de vida
let vidasEnemigo = 10; // Cambiar a 10 puntos de vida

// Función para iniciar el juego
function iniciarJuego() {
    document.getElementById('boton-mascota').addEventListener('click', seleccionarMascota);
    document.getElementById('boton-espada').addEventListener('click', () => atacar(1));
    document.getElementById('boton-arco').addEventListener('click', () => atacar(2));
    document.getElementById('boton-escudo').addEventListener('click', () => atacar(0.5));
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego);

    document.getElementById('seleccionar-ataque').style.display = 'none'; // Oculta ataques inicialmente
}

// Función para seleccionar mascota
function seleccionarMascota() {
    const inputs = document.getElementsByName('mascota');
    for (const input of inputs) {
        if (input.checked) {
            jugadorMascota = input.id;
            document.getElementById('mascota-jugador').innerText = jugadorMascota;
            iniciarBatalla();
            return;
        }
    }
    alert('Por favor, selecciona una mascota.');
}

// Función para iniciar la batalla
function iniciarBatalla() {
    document.getElementById('seleccionar-mascota').style.display = 'none'; // Oculta selección de mascota
    document.getElementById('seleccionar-ataque').style.display = 'block'; // Muestra ataques
}

// Función para atacar
function atacar(dano) {
    vidasEnemigo -= dano;
    actualizarMensaje(`Has atacado con un arma que quita ${dano} puntos.`);
    actualizarVidas();

    if (vidasEnemigo <= 0) {
        actualizarMensaje('¡Felicidades! Has ganado la batalla.');
        deshabilitarBotones();
    } else {
        contraAtaque();
    }
}

// Función para el contraataque del enemigo
function contraAtaque() {
    const danoEnemigo = Math.floor(Math.random() * 3) + 1; // Daño aleatorio entre 1 y 3
    vidasJugador -= danoEnemigo;
    actualizarMensaje(`El enemigo te ha atacado y quitó ${danoEnemigo} puntos.`);
    actualizarVidas();

    if (vidasJugador <= 0) {
        actualizarMensaje('Oh no, has perdido la batalla.');
        deshabilitarBotones();
    }
}

// Función para actualizar vidas en pantalla
function actualizarVidas() {
    document.getElementById('vidas-jugador').innerText = vidasJugador;
    document.getElementById('vidas-enemigo').innerText = vidasEnemigo;
}

// Función para actualizar mensajes
function actualizarMensaje(mensaje) {
    document.getElementById('resultado').innerText = mensaje;
}

// Función para deshabilitar los botones de ataque
function deshabilitarBotones() {
    const botones = document.getElementsByClassName('boton-ataque');
    for (const boton of botones) {
        boton.disabled = true;
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    location.reload();
}

// Iniciar el juego al cargar la página
window.addEventListener('load', iniciarJuego);