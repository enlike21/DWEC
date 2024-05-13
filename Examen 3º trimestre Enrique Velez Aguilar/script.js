document.addEventListener("DOMContentLoaded", () => {

    /* RECOJO LOS ELEMENTOS QUE NECESITO PARA TRABAJAR */
    let contenedor_tabla = document.getElementById("characterTableContainer");
    let informacion_personaje = document.getElementById("character-info");

    /* LLAMO A LA PRIMERA FUNCIÓN Y QUE LLAMARÁ A LAS SIGUIENTES */
    creartabla(contenedor_tabla, informacion_personaje);
})

/* FUNCION PARA CREAR LA TABLA CON TODA LA INFORMACIÓN DE LOS PERSONAJES */
async function creartabla(contenedor_tabla, info) {

    try {
        /* RECOJO LA INFORMACIÓN DE LA API */
        let response = await fetch("https://rickandmortyapi.com/api/character");
        let personajes = await response.json();

        /* Creo la tabla con un thead para que quede bien con bootstrap */
        let tabla = document.createElement("table");
        tabla.setAttribute("class", "table table-striped");
        thead = document.createElement("thead");
        let th_Name = document.createElement("th");
        th_Name.innerHTML = "Name";
        let th_Status = document.createElement("th");
        th_Status.innerHTML = "Status";
        let th_Species = document.createElement("th");
        th_Species.innerHTML = "Species";
        let tr_thead = document.createElement("tr");
        tr_thead.appendChild(th_Name);
        tr_thead.appendChild(th_Status);
        tr_thead.appendChild(th_Species);
        thead.appendChild(tr_thead);
        tabla.appendChild(thead);
        /* TERMINO DE AÑADIR LOS ELEMENTOS AL THEAD Y LO AÑADO A LA TABLA */

        /* CREO EL TBODY Y AÑADO TODA LA INFORMACIÓN OBTENIDA DE LA API DE LOS PERSONAJES DEL APARTADO RESULTS */
        let tbody = document.createElement("tbody");
        personajes.results.forEach(personaje => {
            let tr = document.createElement("tr");
            let td_nombre = document.createElement("td");
            td_nombre.textContent = personaje.name;
            let td_status = document.createElement("td");
            td_status.textContent = personaje.status;
            let td_species = document.createElement("td");
            td_species.textContent = personaje.species;

            /* AÑADO EL EVENTO CLICK PARA MOSTRAR LA INFORMACIÓN DEL PERSONAJE*/
            tr.addEventListener("click", () => {
                mostrarinformacion(personaje.id, info);
            });

            tr.appendChild(td_nombre);
            tr.appendChild(td_status);
            tr.appendChild(td_species);
            tbody.appendChild(tr);
        });

        /* LO AÑADO TODO A LA TABLA 👍 */
        tabla.appendChild(tbody);
        contenedor_tabla.appendChild(tabla);
    } catch (error) { /* COMPRUEBO SI HAY ERRORES ⛔ */
        console.error("Error al recoger la información de la api:", error);
        alert("Error al recoger la información de la api");
    }

}

/* FUNCIÓN PARA MOSTRAR LA INFORMACIÓN CUANDO HACEN CLICK EN EL TR DEL PERSONAJE */
function mostrarinformacion(id, info_div) {

    let lista_episodios = document.getElementById("episode-list");
    lista_episodios.textContent="";

    /* UTILIZO FETCH */
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        /* CON LA INFORMACIÓN COMPLETA DEL PERSONAJE CREO LOS ELEMENTOS QUE NECESITO Y LES AÑADO LA INFORMACIÓN */
        .then(personaje => {
            let img = document.createElement("img");
            let h1 = document.createElement("h1");
            let p_estado = document.createElement("p");
            let p_especie = document.createElement("p");
            let p_tipo = document.createElement("p");
            let p_genero = document.createElement("p");
            let p_origen = document.createElement("p");
            let p_localizacion = document.createElement("p");

            img.setAttribute("src", personaje.image);
            h1.textContent = `Nombre: ${personaje.name}`;
            p_estado.textContent = `Estado: ${personaje.status}`;
            p_especie.textContent = `Especie: ${personaje.species}`;
            p_tipo.textContent = `Tipo: ${personaje.type}`;
            p_genero.textContent = `Género: ${personaje.gender}`;
            p_origen.textContent = `Origen: ${personaje.origin.name}`;
            p_localizacion.textContent = `Localización: ${personaje.location.name}`;

            info_div.appendChild(img);
            info_div.appendChild(h1);
            info_div.appendChild(p_estado);
            info_div.appendChild(p_especie);
            info_div.appendChild(p_tipo);
            info_div.appendChild(p_genero);
            info_div.appendChild(p_origen);
            info_div.appendChild(p_localizacion);

            /* AÑADO UN CONTADOR DE TIEMPO PARA QUE DESPUÉS DE 3 SEGUNDOS SE VAYA A LA FUNCION PARA MOSTRAR LOS EPISODIOS Y ELIMINAR EL CONTENIDO ACTUAL */
            setTimeout(() => {
                mostrarepisodios(info_div, personaje);
            }, 3000);
        })
        .catch(error => {
            alert(error.message);
        });


}

/* FUNCIÓN PARA MOSTRAR LOS EPISODIOS Y ELIMINAR LA INFORMACIÓN DEL PERSONAJE LUEGO DE 3 SEGUNDOS */
function mostrarepisodios(info_personajes, personaje) {
    info_personajes.textContent="";
    let lista_episodios = document.getElementById("episode-list");
    let totalepisodios = document.createElement("p");
    totalepisodios.style.color = "blue";
    let contador = 0; /* AÑADO UN CONTADOR PARA VER EL NÚMERO DE EPISODIOS QUE EXISTEN */
    personaje.episode.forEach(episodio => {
        contador++;
        fetch(episodio) /* HAGO UN FETCH A CADA EPISODIO EN EL QUE APARECE EL PERSONAJE PARA PODER RECOGER SU NOMBRE Y SU NUMERO DE EPISODIO */
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(info_episodio => { /* LO MUESTRO */
                let p_episodio = document.createElement("p");
                p_episodio.textContent = info_episodio.episode + " " + info_episodio.name;
                lista_episodios.appendChild(p_episodio);
            })
            .catch(error => {
                alert(error.message);
            });
    })
    /* AÑADO EL NUMERO TOTAL DE EPISODIOS */
    totalepisodios.textContent = `Total episodios: ${contador}`;
    lista_episodios.appendChild(totalepisodios);
}