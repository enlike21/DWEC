//Cuando cargue el contenido del DOM, emplea la función comenzar
document.addEventListener("DOMContentLoaded", comenzar);

//Función para imprimir el contenido del localStorage
function comenzar() {
    let colocartexto = document.getElementById("position");
    let p = document.createElement("p");
    let nombre = localStorage.getItem("nombre_cancion");
    let fila = localStorage.getItem("fila");
    let columna = localStorage.getItem("columna");
    p.innerHTML = "El titulo de la cancion era: " + nombre + " Y estaba en el div en la fila: " + fila + " y en la columna: " + columna;
    colocartexto.appendChild(p);
}

