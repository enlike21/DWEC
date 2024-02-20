//Cuando cargue el contenido del DOM, emplea la función comenzar
document.addEventListener("DOMContentLoaded", comenzar);

//Función para comprobar si ha aceptado el alert para poder implementar las funciones
function comenzar() {
    comenzar = confirm("Quieres ejecutar la pagina?");
    if (comenzar) {
        realizarelexamen();
    }
}

let contador = 0; //CONTADOR PARA VER SI YA HA CLICKADO EN EL DIV, SI CLICKA POR SEGUNDA VEZ, SE ELIMINA EL CONTENIDO

function realizarelexamen() {
    let div = document.getElementsByTagName("div");
    //Recorro todos los divs que hay para comprobar si les han dado click
    for (let i = 0; i < div.length; i++) {

        div[i].addEventListener("click", (e) => {
            contador++;
            if (contador % 2 != 0) {
                let audio = div[i].querySelector('audio'); //Recogo el audio que contiene el div
                let audio_src = audio.getAttribute("src"); //Recogo el src del audio
                let genero = div[i].getAttribute("data-genero"); //Recogo el genero del div
                audio.play(); //EMPIEZA EL AUDIO

                let parrafo = document.createElement("p"); //CREO UN PARRAFO PARA INCLUIR EL GENERO
                parrafo.innerHTML = "Se esta reproduciendo una pista de audio del genero " + genero;
                div[i].appendChild(parrafo);

                let enlace = document.createElement("a"); //CREO UN ENLACE PARA QUE TE MANDE A LA URL DE LA CANCIÓN
                enlace.innerHTML = "Para seguir descubriendo nuevos temas visite";
                let url = audio_src.substring(14, 34);
                enlace.setAttribute("href", "https://" + url);
                enlace.setAttribute("target", "_blank"); //La creo en una nueva pestaña
                div[i].appendChild(enlace);

                let fila = div[i].getAttribute("data-fila"); //Recogo la fila del div
                let columna = div[i].getAttribute("data-columna"); //Recogo la columna del div
                let arr = audio_src.split('/')
                let nombre = (arr[arr.length - 1]) // devuelve el nombre de la canción
                localStorage.setItem("nombre_cancion", nombre);
                localStorage.setItem("fila", fila);
                localStorage.setItem("columna", columna);
                let br = document.createElement("br"); //Para separar los elementos
                div[i].appendChild(br);
                let a_la_otra_pagina = document.createElement("a"); //El otro enlace en el que voy a mostrar el contenido guardado en el localStorage
                a_la_otra_pagina.innerHTML = "Pulse aqui para registrar su actividad y mandarla a terceros";
                a_la_otra_pagina.setAttribute("href", "seo.html");
                div[i].appendChild(a_la_otra_pagina);
            }
            else {
                //ELIMINO LOS ELEMENTOS QUE ESTABAN EN EL DIV Y PARO EL AUDIO
                let br = document.getElementsByTagName("br")[0];
                let enlace = document.getElementsByTagName("a")[0];
                let a_la_otra_pagina = document.getElementsByTagName("a")[1];
                let parrafo = document.getElementsByTagName("p")[0];
                e.currentTarget.removeChild(br);
                e.currentTarget.removeChild(enlace);
                e.currentTarget.removeChild(a_la_otra_pagina);
                div[i].removeChild(parrafo);
                let audio = div[i].querySelector('audio');
                audio.pause();
            }

        })
    }
}