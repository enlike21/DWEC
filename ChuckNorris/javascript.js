document.addEventListener("DOMContentLoaded", () => {

    //DECLARO COSAS Y RECOJO COSAS
    let categorias_array = [];
    let botonrandom = document.getElementById("random");
    let chiste = document.getElementById("chiste");
    let select = document.getElementById("categorias");
    let botontexto = document.getElementById("enviartexto");
    
    //Ejecuto las funciones
    botonrandom.addEventListener("click", chisterandom);
    recogercategorias(select);
    select.addEventListener("change",chisteCategoria);
    botontexto.addEventListener("click", buscartexto);
    
})


//FUNCION PARA CHISTE RANDOM
function chisterandom() {
    
    let random = new XMLHttpRequest();
    random.open("GET", "https://api.chucknorris.io/jokes/random");
    random.send();
    random.onload = function () {
        if (random.status != 200) { // analiza el estado HTTP de la respuesta
            alert(`Error ${random.status}: ${random.statusText}`); // ej. 404: No encontrado
        } else {
            chiste.textContent = JSON.parse(random.responseText).value;
        }
    };
}

//FUNCION PARA RECOGER LAS CATEGORIAS DE LA API
function recogercategorias(select) {
    let categorias = new XMLHttpRequest();
    categorias.open("GET", "https://api.chucknorris.io/jokes/categories");
    categorias.send();
    categorias.onload = function () {
        if (categorias.status != 200) {
            alert(`Error ${categorias.status}: ${categorias.statusText}`); // ej. 404: No encontrado
        } else {
            //ME GUARDO EN EL ARRAY TODAS LAS CATEGORIAS EXISTENTES
            categoriasenSelect(JSON.parse(categorias.responseText), select);
        }
    };
}

// Función que rellena el select a partir de la respuesta
function categoriasenSelect(arrayC, select) {
    arrayC.forEach((categoria) => {
        let option = document.createElement("option");
        option.textContent = categoria;
        option.setAttribute("value", categoria);
        select.appendChild(option);
    })
}

function chisteCategoria(){
    let categoria = this.options[this.selectedIndex].value;
    let chistecategorico = new XMLHttpRequest();
    chistecategorico.open("GET", `https://api.chucknorris.io/jokes/random?category=${categoria}`);
    chistecategorico.send();
    chistecategorico.onload = function () {
        if (chistecategorico.status != 200) {
            alert(`Error ${chistecategorico.status}: ${chistecategorico.statusText}`);
        } else {
            chiste.textContent = JSON.parse(chistecategorico.responseText).value;
        }
    };
}

//FUNCION PARA BUSCAR LOS CHISTES POR TEXTO
function buscartexto() {
    let inputtexto = document.getElementById("palabra");
    let chiste_texto = new XMLHttpRequest();
    chiste_texto.open("GET", `https://api.chucknorris.io/jokes/search?query=${inputtexto.value}`);
    chiste_texto.send();
    chiste_texto.onload = function() {
        if (chiste_texto.status != 200) {
            alert(`Error ${chiste_texto.status}: ${chiste_texto.statusText}`);
        } else {
            let chistesEncontrados = JSON.parse(chiste_texto.responseText).result; //TE DEVUELVE EL RESULTADO DE TODOS LAS RESPUESTAS EXISTENTES
            if (chistesEncontrados.length > 0) {
                chiste.textContent = chistesEncontrados[0].value; //ESCOGEMOS LA PRIMERA OPCIÓN
            } else {
                chiste.textContent = "No se encontraron chistes relacionados con esa palabra.";
            }
        }
    };
}