// Espacio para declarar (¿inicializar?) variables globales
let carrito = [];
/** Manejador a ejecutar cuando la página se haya cargado.
 * Entre otras cosas, será necesario generar y mostrar los productos disponibles y el carrito
*/
document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencia a la lista y al botón de vaciar carrito
    let boton_borrar_todo = document.getElementById("boton-vaciar");
    boton_borrar_todo.addEventListener("click", vaciarCarrito);
    
    // Renderizar productos disponibles
    renderProductos();
});


/**
 * Funcion que se encarga de mostrar todos los productos del archivo JSON
*/
function renderProductos() {
    // Haremos la misma operación por cada uno de los items del JSON
    extras.forEach(extra => {
        
        // Estructura
        // Necesitamos un div con las clases card y col-sm-4
        let divMaster = document.createElement('div');
        divMaster.classList.add("card", "col-sm-4");
        
        // Body
        // Necesitamos un div con la clase card-body
        let divbody = document.createElement("div");
        divbody.classList.add("card-body");
        
        // Titulo
        // Creamos un h5 con la clase card-title y el texto del atributo nombre
        let titulo = document.createElement("h5");
        titulo.classList.add("card-title");
        titulo.textContent = extra.nombre;
        
        // Imagen
        // Creamos una imagen con la clase img-fluid y el src del atributo imagen
        let imagen = document.createElement("img");
        imagen.setAttribute("src", extra.imagen);
        imagen.classList.add("img-fluid");
        
        // Precio
        // Creamos un párrafo con la clase card-text y el texto del atributo precio junto a la moneda
        let precio = document.createElement("p");
        precio.classList.add("card-text");
        precio.textContent = extra.precio + " $";
        
        // Boton
        // Creamos un botón con la clase btn y btn-primary, el texto '+' y un atributo id con el valor apropiado del JSON
        let boton_sumar = document.createElement("button");
        boton_sumar.textContent = "+";
        boton_sumar.setAttribute("id", extra.id);
        boton_sumar.classList.add("btn", "btn-primary");
        
        // También tendremos que asociar el manejador para el evento click
        boton_sumar.addEventListener("click", addExtra);
        
        // Insertamos la imagen, el título, el precio y el botón añadir al div con la clase card-body
        divbody.appendChild(imagen);
        divbody.appendChild(titulo);
        divbody.appendChild(precio);
        divbody.appendChild(boton_sumar);
        
        // Insertamos el div con la clase card-body a div de la estructura
        divMaster.appendChild(divbody);
        
        // Insertamos en elemento main con id items
        let main = document.getElementById("items");
        main.appendChild(divMaster);
    });
    
    
    
    
    
    
    
    
}

/**
 * Función que muestra todos los productos guardados en el array carrito
*/
function renderCarrito() {
    // Vaciamos todo el html del carrito
    const lista = document.getElementById("carrito");
    lista.innerHTML = "";
    
    // Quitamos los duplicados porque necesitamos una sola línea por extra
    const carritoSinDuplicados = Array.from(new Set(carrito));
    
    // Por cada extra en el carrito, creamos un nodo (línea)
    carritoSinDuplicados.forEach(item => {
        // Obtenemos el extra correspondiente del array 'extras'
        const elemento = extras.find(elemento => elemento.id == item);
        
        // Contamos el número de veces que se repite el extra en el carrito
        const nUnidades = carrito.filter(repeticionescarrito => repeticionescarrito == item).length;
        
        // Creamos el nodo del item del carrito (li) con el texto: unidades x nombre - precioItem
        const li = document.createElement("li");
        li.textContent = `${nUnidades} x ${elemento.nombre} - ${(parseFloat(elemento.precio) * nUnidades).toFixed(2)}`;
        
        // Le añadimos las clases css list-group-item, text-right y mx-2
        li.classList.add("list-group-item", "text-right", "mx-2");
        
        // Creamos el botón de borrar con las propiedades adjuntas
        const miBoton = document.createElement("button");
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        
        // Le añadimos las clases css 'btn', 'btn-danger', 'mx-5'
        miBoton.classList.add("btn", "btn-danger", "mx-5");
        
        // Le añadimos el manejador para el evento click
        miBoton.addEventListener("click", borrarItemCarrito);
        
        // Insertamos botón en nodo carrito
        li.appendChild(miBoton);
        
        // Insertamos nodo en carrito
        lista.appendChild(li);
    });
    
    // Mostramos el precio total en el HTML
    calcularTotal();
}


/**
 * Función encargada de añadir un producto al carrito de la compra
*/
function addExtra(evento) {
    
    // Insertamos el id del extra en al array de nuestro carrito
    let id_extra = evento.target.id;
    carrito.push(id_extra);
    // Generamos el carrito
    renderCarrito();
    
}

/**
 * Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
    
    // Obtenemos el ID del producto a eliminar
    const idProducto = evento.target.dataset.item;

    // Opción 1: Borramos productos de uno en uno
    // Encuentra el índice del producto en el carrito
    const index = carrito.indexOf(idProducto);
    
    // Si se encuentra el producto en el carrito, lo eliminamos
    if (index !== -1) {
        carrito.splice(index, 1);
    }
    
    // Volvemos a renderizar
    renderCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
*/
function calcularTotal() {
    // Recorremos el array del carrito. Una manera de hacerlo es usando las funciones reduce y filter.
    let total = document.querySelector("#total");
    let suma=0;
    
    carrito.forEach(item =>{
        let elemento = extras.find(elemento => elemento.id == item);
        suma+=elemento.precio;
    })
    total.textContent=suma.toFixed(2) + " $";
    
}

/**
* Función que vacia el carrito y vuelve a pintarlo
*/
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderCarrito();
}