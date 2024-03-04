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
];

document.addEventListener("DOMContentLoaded", () => {
    empezar();
});

function empezar() {
    let divs = document.getElementsByTagName("div");
    let tabla = document.createElement("table");
    document.body.appendChild(tabla);

    for (let i = 0; i < divs.length; i++) {
        let h2 = document.createElement("h2");
        h2.textContent = provincias[i].nombre;
        h2.style.textAlign = "center";
        h2.style.fontSize = "xx-large";
        h2.style.textShadow = "3px 3px 3px grey";

        let img = document.createElement("img");
        img.setAttribute("src", provincias[i].imagen);

        let precioAlojamiento = document.createElement("span");
        precioAlojamiento.textContent = "Precio de alojamiento: " + provincias[i].coste_alojamiento + " €";
        precioAlojamiento.classList.add("precio_alojamiento");
        let precioAlimentacion = document.createElement("span");
        precioAlimentacion.textContent = "Precio de alimentación: " + provincias[i].coste_alimentacion + " €";
        precioAlimentacion.classList.add("precio_alimentacion");

        let boton = document.createElement("button");
        boton.textContent = "Calcular Precio";
        boton.addEventListener("click", () => {
            let lugarExistente = document.querySelector("table tr[infolugar='" + provincias[i].nombre + "']");
            if (lugarExistente) {
                let precioActual = parseFloat(lugarExistente.querySelector("td:last-child").textContent);
                let nuevoPrecio = precioActual + provincias[i].coste_alojamiento + provincias[i].coste_alimentacion;
                lugarExistente.querySelector("td:last-child").textContent = nuevoPrecio.toFixed(2) + " €";

                if (nuevoPrecio > (provincias[i].coste_alojamiento + provincias[i].coste_alimentacion)) {
                    if (!lugarExistente.querySelector("button")) {
                        let botonEliminar = document.createElement("button");
                        botonEliminar.textContent = "-";
                        botonEliminar.addEventListener("click", () => {
                            eliminarDia(provincias[i].nombre, provincias[i].coste_alojamiento + provincias[i].coste_alimentacion);
                        });
                        lugarExistente.querySelector("td:last-child").appendChild(botonEliminar);
                    }
                }
            } else {
                añadirfila(provincias[i].nombre, provincias[i].coste_alojamiento + provincias[i].coste_alimentacion);
            }
            calcularResultadoFinal();
        });

        divs[i].appendChild(h2);
        divs[i].appendChild(img);
        divs[i].appendChild(precioAlojamiento);
        divs[i].appendChild(precioAlimentacion);
        divs[i].appendChild(boton);

        img.addEventListener("mouseover", (e) => {
            img.style.transition = "all 1s";
            precioAlimentacion.style.transition = "all 1s";
            precioAlojamiento.style.transition = "all 1s";
            img.style.filter = "blur(0.5rem)";
            precioAlojamiento.style.opacity = "100";
            precioAlimentacion.style.opacity = "100";
        });

        img.addEventListener("mouseout", (e) => {
            img, precioAlimentacion, precioAlojamiento.style.transition = "all 1s";
            img.style.filter = "none";
            precioAlimentacion.style.opacity = "0";
            precioAlojamiento.style.opacity = "0";
        });

        divs[i].setAttribute("coste_alojamiento", provincias[i].coste_alojamiento);
        divs[i].setAttribute("coste_alimentacion", provincias[i].coste_alimentacion);
    }

    // Creo la fila para el total al final de la tabla
    let filaTotal = document.createElement("tr");
    let thTotalTitulo = document.createElement("th");
    let tdTotal = document.createElement("td");
    tdTotal.setAttribute("id", "total");
    filaTotal.appendChild(thTotalTitulo);
    filaTotal.appendChild(tdTotal);
    tabla.appendChild(filaTotal);
}

function añadirfila(nombre, precio) {
    let table = document.querySelector("table");
    let tr = document.createElement("tr");
    tr.setAttribute("infolugar", nombre);
    let tdNombre = document.createElement("td");
    let tdPrecio = document.createElement("td");

    tdNombre.textContent = nombre;
    tdPrecio.textContent = precio.toFixed(2) + " €";

    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    table.appendChild(tr);
}

function calcularResultadoFinal() {
    let precios = document.querySelectorAll("table td:last-child");
    let total = 0;
    for (let i = 1; i < precios.length; i++) {
        total += parseFloat(precios[i].textContent);
    }
    let totalElement = document.getElementById("total");
    totalElement.textContent = "Total: " + total.toFixed(2) + " €";
}

function eliminarDia(nombre, precio) {
    let lugarExistente = document.querySelector("table tr[infolugar='" + nombre + "']");
    let precioActual = parseFloat(lugarExistente.querySelector("td:last-child").textContent);
    let nuevoPrecio = precioActual - precio;
    lugarExistente.querySelector("td:last-child").textContent = nuevoPrecio.toFixed(2) + " €";
    calcularResultadoFinal();
}
