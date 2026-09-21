const combinacionesGanadoras =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "X";
let juegoTerminado = false;

const contenedorTablero = document.getElementById("tableroTresEnRaya");
const turnoActual = document.getElementById("turnoActual");
const mensaje = document.getElementById("mensajeTresEnRaya");
const btnReiniciar = document.getElementById("btnReiniciarTresEnRaya");

function crearTablero() {
    contenedorTablero.innerHTML = "";

    tablero.forEach(function (valor, indice) {
        const celda = document.createElement("div");
        celda.className = "celda";
        celda.dataset.indice = indice;
        celda.textContent = valor;
        contenedorTablero.appendChild(celda);
    });
}

crearTablero();

function verificarGanador() {
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const combinacion = combinacionesGanadoras[i]; 
        const a = combinacion[0];
        const b = combinacion[1];
        const c = combinacion[2];

        if (tablero[a] !== "" && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            return tablero[a];
        }
    }
    return null;
}

function verificarEmpate() {
    return tablero.every(function (valor) {
        return valor !== "";
    });
}

contenedorTablero.addEventListener("click", function (evento) {
    const celda = evento.target.closest(".celda");

    if (!celda) {
        return;
    }
    if (juegoTerminado) {
        return;
    }

    const indice = Number(celda.dataset.indice);

    if (tablero[indice] !== "") {
        return;
    }

    tablero[indice] = turno;
    crearTablero();

    const ganador = verificarGanador();

    if (ganador) {
        mensaje.textContent = "Ganó " + ganador + ".";
        juegoTerminado = true;
        return;
}

    if (verificarEmpate()) {
    mensaje.textContent = "Empate.";
    juegoTerminado = true;
    return;
}

turno = turno === "X" ? "O" : "X";
turnoActual.textContent = turno;
});

btnReiniciar.addEventListener("click", function () {
    tablero = ["", "", "", "", "", "", "", "", ""];
    turno = "X";
    juegoTerminado = false;
    mensaje.textContent = "";
    turnoActual.textContent = turno;
    crearTablero();
});