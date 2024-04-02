document.addEventListener("DOMContentLoaded", () => {

    //DECLARO COSAS Y RECOJO COSAS
    let categorias_array = [];
    let botonrandom = document.getElementById("random");
    let chiste = document.getElementById("chiste");
    let select = document.getElementById("categorias");

    //Ejecuto las funciones
    botonrandom.addEventListener("click", chisterandom);
    recogercategorias(select);
    select.addEventListener("change",chisteCategoria);
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
            populateSelect(JSON.parse(categorias.responseText), select);
        }
    };
}

// Función que rellena el select a partir de la respuesta
function populateSelect(arrayC, select) {
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
