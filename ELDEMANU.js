// Espacio para declarar (¿inicializar?) variables globales
const main = document.querySelector("#items");
const carritoHTML = document.querySelector("#carrito");
const carrito = [];
const botonVaciar = document.querySelector("#boton-vaciar");
const total = document.querySelector("#total");
/** Manejador a ejecutar cuando la página se haya cargado.
 * Entre otras cosas, será necesario generar y mostrar los productos disponibles y el carrito
 */
renderProductos();
botonVaciar.addEventListener("click", vaciarCarrito);
/**
 * Funcion que se encarga de mostrar todos los productos del archivo JSON
 */
function renderProductos() {
  // Haremos la misma operación por cada uno de los items del JSON

  extras.forEach((extra) => {
    // Estructura
    // Necesitamos un div con las clases card y col-sm-4
    let divCard = document.createElement("div");
    divCard.classList.add("card", "col-sm-4");
    // Body
    // Necesitamos un div con la clase card-body
    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");

    // Titulo
    // Creamos un h5 con la clase card-title y el texto del atributo nombre
    let tituloH5 = document.createElement("h5");
    tituloH5.classList.add("card-title");
    tituloH5.textContent = extra.nombre;
    // Imagen
    // Creamos una imagen con la clase img-fluid y el src del atributo imagen
    let imgCard = document.createElement("img");
    imgCard.classList.add("img-fluid");
    imgCard.setAttribute("src", extra.imagen);
    // Precio
    // Creamos un párrafo con la clase card-text y el texto del atributo precio junto a la moneda
    let parrafoPrecio = document.createElement("p");
    parrafoPrecio.classList.add("card-text");
    parrafoPrecio.textContent = extra.precio;
    // Boton
    // Creamos un botón con la clase btn y btn-primary, el texto '+' y un atributo id con el valor apropiado del JSON
    let boton = document.createElement("button");
    boton.classList.add("btn", "btn-primary");
    boton.textContent = "+";
    boton.setAttribute("id", extra.id);

    // También tendremos que asociar el manejador para el evento click
    boton.addEventListener("click", addExtra);

    // Insertamos la imagen, el título, el precio y el botón añadir al div con la clase card-body
    divCardBody.appendChild(imgCard);
    divCardBody.appendChild(tituloH5);
    divCardBody.appendChild(parrafoPrecio);
    divCardBody.appendChild(boton);
    // Insertamos el div con la clase card-body a div de la estructura
    divCard.appendChild(divCardBody);
    // Insertamos en elemento main con id items
    main.appendChild(divCard);
  });
}

/**
 * Función que muestra todos los productos guardados en el array carrito
 */
function renderCarrito() {
  // Vaciamos todo el html del carrito
  carritoHTML.innerHTML = "";
  // Quitamos los duplicados porque necesitamos una sola linea por extra
  let carritoSinDuplicados = Array.from(new Set(carrito));

  // Por cada extra se creará un nodo (linea)
  carritoSinDuplicados.forEach((extra) => {
    // Obtenemos el extra que necesitamos buscándolo en el JSON (function filter)
    let item = extras.filter((item) => item["id"] == extra)[0]; // 👁️ => NO olvidar que viene en array
    let nUnidades = 0;
    carrito.forEach((extraCarritoOriginal) => {
      if (extraCarritoOriginal == item.id) nUnidades++;
    });
    // Creamos el nodo del item del carrito. Elemeto li con el texto: unidades x nombre - precioItem
    let li = document.createElement("li");
    li.textContent = `${nUnidades} x ${item.nombre} - ${(
      parseFloat(item.precio) * nUnidades
    ).toFixed(2)}`;
    // Le añadimos las clases css list-group-item, text-right y mx-2
    li.classList.add("list-group-item", "text-right", "mx-2");

    // Creamos el boton de borrar con las propiedades adjuntas.
    const miBoton = document.createElement("button");
    miBoton.textContent = "X";
    miBoton.style.marginLeft = "1rem";
    miBoton.dataset.item = JSON.stringify(item);
    // Le añadimos las clases css 'btn', 'btn-danger', 'mx-5'
    miBoton.classList.add("btn", "btn-danger", "mx-5");
    // Le añadimos el manejador para el evento click
    miBoton.addEventListener("click", borrarItemCarrito);
    // Insertamos botón en nodo carrito
    li.appendChild(miBoton);
    // Insertamos nodo en carrito
    carritoHTML.appendChild(li);
    // Mostramos el precio total en el HTML
    calcularTotal();
  });
}

/**
 * Función encargada de añadir un producto al carrito de la compra
 */
function addExtra(evento) {
  let idExtra = evento.target.id;
  // Insertamos el id del extra en al array de nuestro carrito
  carrito.push(idExtra);
  // Generamos el carrito
  renderCarrito();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID del atributo creado en el botón
  let extra = evento.target.dataset.item;
  let idExtra = JSON.parse(extra).id;

  // Opción 1: Borramos productos de uno en uno
  const index = carrito.indexOf(idExtra); // Buscamos el índice del elemento

  if (index != -1) {
    carrito.splice(index, 1); // Eliminamos el elemento del array
  }

  // Opción 2: Borramos todos los productos

  // Volvemos a renderizar
  renderCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
  let precioTotal = 0;

  // Recorremos el array del carrito. Una manera de hacerlo es usando las funciones reduce y filter.
  carrito.forEach((extraEscogido) => {
    let precio = parseFloat(
      extras.find((extra) => extra.id == extraEscogido).precio
    );
    precioTotal += precio;
  });
  total.textContent = precioTotal.toFixed(2);
}

/**
 * Función que vacia el carrito y vuelve a pintarlo
 */
function vaciarCarrito() {
  // como esta declarado como CONST no puedo redeclarlo
  carrito.length = 0;
  // Renderizamos los cambios
  renderCarrito();
}