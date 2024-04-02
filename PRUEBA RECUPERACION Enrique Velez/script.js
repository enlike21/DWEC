let carrito = [];
let flag = false;

document.addEventListener("DOMContentLoaded", () => {
    empezar();
    renderfiltrado();
});

function empezar() {

    if (flag==false){
        bienes.forEach(bien => {

            // Estructura
            // Necesitamos un div con las clases card y col-sm-4
            let divMaster = document.createElement('div');
            divMaster.classList.add("card", "col-sm-4");

            // Body
            // Necesitamos un div con la clase card-body
            let divbody = document.createElement("div");
            divbody.classList.add("card-body");

            //Creo el nombre
            let nombre = document.createElement("h5");
            nombre.textContent = bien.active_name;
            nombre.classList.add("card-title");

            //Añado el organismo
            let organismo = document.createElement("p");
            organismo.textContent = bien.counseling;
            organismo.classList.add("card-text");

            //Añado la provincia
            let provincia = document.createElement("p");
            provincia.textContent = bien.province;
            provincia.classList.add("card-text");

            //Añado el uso
            let uso = document.createElement("p");
            uso.textContent = bien.current_usage;
            uso.classList.add("card-text");
            uso.setAttribute("id", bien.id);

            //Funcion click para filtrar el listado de inmuebles
            uso.addEventListener("click", filtrar);

            // Insertamos el nombre, organismo, provincia y y el uso en el div con la clase card-body
            divbody.appendChild(nombre);
            divbody.appendChild(organismo);
            divbody.appendChild(provincia);
            divbody.appendChild(uso);

            // Insertamos el div con la clase card-body a div de la estructura
            divMaster.appendChild(divbody);

            // Insertamos en elemento main con id items
            let main = document.getElementById("items");
            main.appendChild(divMaster);

            carrito_original();
        })

        //ESTO ES INTENTANDO QUE CAMBIE LA PAGINA AL CAMBIAR EL CARRITO, EN EL CARRITO SOLO HAY UNA PROVINCIA, POR LO QUE LE DIGO QUE SI LA PRONVICIA DEL BIEN, ES IGUAL AL CARRITO, ME PINTE
    } 
    else{
        bienes.forEach(bien => {
            if(bien.province == carrito[0]){
            // Estructura
            // Necesitamos un div con las clases card y col-sm-4
            let divMaster = document.createElement('div');
            divMaster.classList.add("card", "col-sm-4");

            // Body
            // Necesitamos un div con la clase card-body
            let divbody = document.createElement("div");
            divbody.classList.add("card-body");

            //Creo el nombre
            let nombre = document.createElement("h5");
            nombre.textContent = bien.active_name;
            nombre.classList.add("card-title");

            //Añado el organismo
            let organismo = document.createElement("p");
            organismo.textContent = bien.counseling;
            organismo.classList.add("card-text");

            //Añado la provincia
            let provincia = document.createElement("p");
            provincia.textContent = bien.province;
            provincia.classList.add("card-text");

            //Añado el uso
            let uso = document.createElement("p");
            uso.textContent = bien.current_usage;
            uso.classList.add("card-text");
            uso.setAttribute("id", bien.id);

            //Funcion click para filtrar el listado de inmuebles
            uso.addEventListener("click", filtrar);

            // Insertamos el nombre, organismo, provincia y y el uso en el div con la clase card-body
            divbody.appendChild(nombre);
            divbody.appendChild(organismo);
            divbody.appendChild(provincia);
            divbody.appendChild(uso);

            // Insertamos el div con la clase card-body a div de la estructura
            divMaster.appendChild(divbody);

            // Insertamos en elemento main con id items
            let main = document.getElementById("items");
            main.appendChild(divMaster);
            }
        })
    }
}

function renderfiltrado() {
    let lista = document.getElementById("totales");
    lista.innerHTML = "";
    let total = 0;
    let carritoSinDuplicados = [];

    provincias.forEach(provincia => {
        //Añado todas las provincias
        carritoSinDuplicados.push(provincia);
    })

        for (let i = 0; i < carritoSinDuplicados.length; i++) {
            let div_lista = document.createElement("div");

            //Creo el boton para cada provincia para posteriormente filtrar
            let boton_provincia = document.createElement("button");
            boton_provincia.classList.add("btn", "btn-primary");

            //Añado el nombre de la provincia al boton
            boton_provincia.textContent = carritoSinDuplicados[i];

            //El ID es el nombre de la provincia
            boton_provincia.setAttribute("id", carritoSinDuplicados[i]);
            boton_provincia.addEventListener("click", filtrar);
            div_lista.appendChild(boton_provincia);

            //Creo un parrafo y miro cuantas veces aparece en el carrito este mismo nombre, para saber cuantos bienes contiene
            let p = document.createElement("p");
            let nBienes = carrito.filter(nBienes => nBienes == carritoSinDuplicados[i]).length;
            p.textContent = nBienes;
            div_lista.classList.add("list-group-item", "text-center", "mx-2");
            div_lista.appendChild(p);
            lista.appendChild(div_lista);
            total += nBienes;
        }

        //Añado boton para resetear los filtros y volver a su estado original
        let boton_resetear = document.createElement("button");
        boton_resetear.textContent = "Resetear filtros";
        boton_resetear.classList.add("btn", "btn-danger", "mx-5");
        boton_resetear.addEventListener("click", resetearfiltros);
        lista.appendChild(boton_resetear);
        let parrafoFiltros = document.createElement("p");
        parrafoFiltros.textContent = "Filtro aplicado:";
        let parrafototal = document.createElement("p");
        parrafototal.textContent = "Total inmuebles: " + total;
        lista.appendChild(parrafoFiltros);
        lista.appendChild(parrafototal);
    }

    //FUNCION PARA FILTRAR EL CONTENIDO DEL CARRITO PARA QUE LUEGO APAREZCA EN EL ASIDE
function filtrar(evento) {
    carrito = [];
    bienes.forEach(bien => {
        if(bien.province == evento.target.id){
            carrito.push(bien.province);
        }
    })
    flag=true;
    renderfiltrado();
    empezar();
}

//FUNCION PARA ELIMINAR LOS FILTROS Y VOLVER AL RESULTADO ORIGINAL
function resetearfiltros() {
    carrito_original();
    renderfiltrado();
}

function carrito_original() {
    carrito = [];
    bienes.forEach(bien => {
        //Añado todas las provincias de los bienes que existen al carrito
        carrito.push(bien.province);
    })
}