const provincias = [
    {
        "id": 1,
        "nombre": "Almería",
        "coste_alojamiento": 12,
        "coste_alimentacion": 22,
        "imagen": "imagen/almeria.jpg"
    },
    {
        "id": 2,
        "nombre": "Granada",
        "coste_alojamiento": 143.2,
        "coste_alimentacion": 22,
        "imagen": "imagen/granada.jpg"
    },
    {
        "id": 3,
        "nombre": "Málaga",
        "coste_alojamiento": 98.5,
        "coste_alimentacion": 25,
        "imagen": "imagen/malaga.jpg"
    },
    {
        "id": 4,
        "nombre": "Sevilla",
        "coste_alojamiento": 120.7,
        "coste_alimentacion": 28,
        "imagen": "imagen/sevilla.jpg"
    },
    {
        "id": 5,
        "nombre": "Córdoba",
        "coste_alojamiento": 85.3,
        "coste_alimentacion": 20,
        "imagen": "imagen/Cordoba-1.jpg"
    }
    // Puedes seguir añadiendo más provincias aquí
];

//Para asegurarme que todo ha cargado ya
document.addEventListener("DOMContentLoaded", ()=>{
    empezar();
});


function empezar() {
    let divs = document.getElementsByTagName("div");
    
    for (let i = 0; i < divs.length; i++) {
        // Crea los elementos para cada provincia
        let h2 = document.createElement("h2");
        h2.textContent = provincias[i].nombre;
        h2.style.textAlign = "center";
        h2.style.fontSize = "xx-large";
        h2.style.textShadow="3px 3px 3px grey";
        
        let img = document.createElement("img");
        img.setAttribute("src", provincias[i].imagen);
        
        let precioAlojamiento = document.createElement("span");
        precioAlojamiento.textContent = "Precio de alojamiento: " + provincias[i].coste_alojamiento + " €";
        precioAlojamiento.classList.add("precio_alojamiento"); // Agrega la clase "precio" al span
        let precioAlimentacion = document.createElement("span");
        precioAlimentacion.textContent = "Precio de alimentacion: " + provincias[i].coste_alimentacion + " €";
        precioAlimentacion.classList.add("precio_alimentacion"); // Agrega la clase "precio" al span
        
        //GUARDO EL BOTON DE CADA DIV PARA
        let boton = divs[i].querySelector("button");
        
        //PONER LOS ELEMENTOS ANTES DEL BOTON EN CADA DIV
        divs[i].insertBefore(h2, boton);
        divs[i].insertBefore(img, boton);
        
        divs[i].appendChild(precioAlojamiento);
        divs[i].appendChild(precioAlimentacion);
        
        // Añade eventos de ratón a las imágenes
        img.addEventListener("mouseover", (e) => {
            img.style.transition = "all 1s";
            precioAlimentacion.style.transition = "all 1s";
            precioAlojamiento.style.transition = "all 1s";
            img.style.filter = "blur(0.5rem)";
            precioAlojamiento.style.opacity = "100"; // Muestro el precio al pasar el ratón
            precioAlimentacion.style.opacity = "100"; // Muestro el precio al pasar el ratón
        });
        
        img.addEventListener("mouseout", (e) => {
            img,precioAlimentacion,precioAlojamiento.style.transition = "all 1s";
            img.style.filter = "none";
            precioAlimentacion.style.opacity = "0"; // Oculta el precio al retirar el ratón
            precioAlojamiento.style.opacity = "0"; // Oculta el precio al retirar el ratón
        });

        //AQUI TENGO QUE HACER UN FOR PARA RECORRER LOS BOTONES Y HACER LA FUNCION
        //CALCULAR PRECIOS 🤓👆

    }



}

function calcularprecios(){
//Tabla para mostrar los datos
let tabla = document.createElement("table");
let tr_nombres = document.createElement("tr");
let tr_precios = document.createElement("tr");
let td_precio = document.createElement("td");
let th_nombre = document.createElement("th");



}