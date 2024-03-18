// Espacio para declarar (¿inicializar?) variables globales
let arrayprecio = [];

//CARGO LA PAGINA PARA EVITAR QUE EL CONTENIDO NO APAREZCA POR QUÉ NO HA CARGADO TODAVÍA
document.addEventListener("DOMContentLoaded", renderProductos);
document.addEventListener("DOMContentLoaded", renderCarrito);

/**
 * Funcion que se encarga de mostrar todos los productos del archivo JSON
*/
function renderProductos() {
    let main = document.getElementById("items"); //RECOJO EL MAIN
    // Haremos la misma operación por cada uno de los items del JSON
    
    // Body
    // Necesitamos un div con la clase card-body
    for(let i = 0; i !=6; i++) {
        let creardivs=document.createElement("div");
        creardivs.setAttribute("class", "card-body");
        main.appendChild(creardivs);
        
    }

    //RECORRO TODO EL ARRAY DE DIVS Y LES VOY CREANDO Y AÑADIENDO LOS ELEMENTOS HTML QUE NECESITO
    let divs=document.getElementsByTagName("div");
    for(let i = 0; i <divs.length; i++) {
        // Titulo
        // Creamos un h5 con la clase card-title y el texto del atributo nombre 
        let h5=document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.setAttribute("nombre",extras[i].nombre);
        h5.textContent = extras[i].nombre;
        
        // Imagen
        // Creamos una imagen con la clase img-fluid y el src del atributo imagen 
        let img=document.createElement("img");
        img.setAttribute("class","img-fluid");
        img.setAttribute("src",extras[i].imagen);
        
        // Precio
        // Creamos un párrafo con la clase card-text y el texto del atributo precio junto a la moneda 
        let parrafo=document.createElement("p");
        parrafo.setAttribute("class","card-text");
        parrafo.setAttribute("precio",extras[i].precio+"$");
        parrafo.textContent=extras[i].precio;
        // Boton
        // Creamos un botón con la clase btn y btn-primary, el texto '+' y un atributo id con el valor apropiado del JSON 
        // También tendremos que asociar el manejador para el evento click
        let boton=document.createElement("button");
        boton.setAttribute("class","btn");
        boton.setAttribute("class","btn-primary");
        boton.innerHTML="+";
        boton.setAttribute("id",extras[i].id);
        //CREO EL MANEJADOR ON CLICK PARA QUE SE VAYAN AÑADIENDO LOS PRECIOS A LA LISTA
        boton.addEventListener("click",()=>{
            let ul=document.getElementsByTagName("ul")[0];
            //BUSCO SI EXISTE UN LI CON UN ID YA UTILIZADO, PARA SABER SI YA EXISTE Y ASÍ NO CREARLO DE NUEVO
            let elementoexistente = ul.querySelector("li [id='" + extras[i].id + "']");

            //SI YA EXISTE, ACTUALIZO EL PRECIO AÑADIENDOLE EL PRECIO NUEVO
            if(elementoexistente){
                let precioActual = parseFloat(elementoexistente.textContent);
                let nuevoPrecio = precioActual + extras[i].precio;
                elementoexistente.textContent = nuevoPrecio.toFixed(2);
                calcularTotal(nuevoPrecio);
            } else{
                //SI NO EXISTE, CREO EL ELEMENTO LI, LE AÑADO EL ID PARA PODER IDENTIFICARLO Y LLAMMO A LA FUNCION CALCULAR TOTAL PARA QUE SUME LOS VALORES
                //POR MEDIO DE UN ARRAY
                let li=document.createElement("li");
                li.setAttribute("id",extras[i].id);
                li.textContent=extras[i].nombre +" "+ extras[i].precio+" $";
                ul.appendChild(li);
                arrayprecio.push(extras[i].precio);
                calcularTotal(arrayprecio);
                
            }

            

        });
        
        
        //Inserto todo en el div card-body
        divs[i].appendChild(h5);
        divs[i].appendChild(img);
        divs[i].appendChild(parrafo);
        divs[i].appendChild(boton);
        
        
        
    }
    
}

/**
 * Función que muestra todos los productos guardados en el array carrito
*/
function renderCarrito() {
    
    
    
    // Creamos el boton de borrar con las propiedades adjuntas.
        // Le añadimos las clases css 'btn', 'btn-danger', 'mx-5'
        // Le añadimos el manejador para el evento click
        
        // Insertamos botón en nodo carrito
        
        // Insertamos nodo en carrito
        
        // Mostramos el precio total en el HTML
    }
    
/**
 * Función encargada de añadir un producto al carrito de la compra
*/
function addExtra(evento) {
    
    // Insertamos el id del extra en al array de nuestro carrito
    
    // Generamos el carrito
    renderCarrito();
    
}

/**
 * Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
    
    // Obtenemos el producto ID del atributo creado en el botón
    
    // Opción 1: Borramos productos de uno en uno
    
    // Opción 2: Borramos todos los productos
    
    // Volvemos a renderizar
    renderCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
*/
function calcularTotal(array) {
    //RECORRO EL ARRAY Y LO SUMO
    let span=document.getElementById("total");
    let preciototal=0;
    for(let i =0 ;i<array.length; i++){
        preciototal+=parseFloat(array[i]);
        
    }
    span.innerHTML=preciototal.toFixed(2) + " $";
}

/**
 * Función que vacia el carrito y vuelve a pintarlo
*/
function vaciarCarrito() {
    // Limpiamos los productos guardados
    
    // Renderizamos los cambios
    renderCarrito();
}