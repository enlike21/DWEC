let ul = document.getElementsByClassName("listaAlumnos")[0];
let crearTabla = document.getElementById("btnTabla");
let posiciontabla = document.getElementsByClassName("tablita")[0];

crearTabla.addEventListener("click", () => {
    let li_completa = document.getElementsByTagName("li");
    let tabla = document.createElement("table");
    tabla.setAttribute("id","tabla");
    posiciontabla.appendChild(tabla);

    let trEncabezado = document.createElement("tr");
    tabla.appendChild(trEncabezado);

    let thNombre = document.createElement("th");
    thNombre.textContent = "Nombre";
    trEncabezado.appendChild(thNombre);

    let thApellido = document.createElement("th");
    thApellido.textContent = "Apellido";
    trEncabezado.appendChild(thApellido);

    for (let i = 0; i < li_completa.length; i++) {
        let tr = document.createElement("tr");
        tabla.appendChild(tr);

        let nombreyapellido = li_completa[i].textContent.split(" ");

        let tdNombre = document.createElement("td");
        tdNombre.textContent = nombreyapellido[0];
        tr.appendChild(tdNombre);
        
        let tdApellido = document.createElement("td");
        tdApellido.textContent = nombreyapellido[1];
        tr.appendChild(tdApellido);
    }
});

let boton_incorporacion = document.getElementById("incorporacion");

boton_incorporacion.addEventListener("click", () => {
    let nombreNuevo=document.getElementsByName("nombre")[0].value;
    let apellidoNuevo=document.getElementsByName("apellido")[0].value;
    let linuevo=document.createElement("li");
    linuevo.textContent=nombreNuevo+apellidoNuevo;
    ul.appendChild(linuevo);
    
    let nuevomiembrotabla=document.getElementById("tabla");
    let tr=document.createElement("tr");
    nuevomiembrotabla.appendChild(tr);
    let tdNombre = document.createElement("td");
    let tdApellido = document.createElement("td");
    tdNombre.textContent=nombreNuevo;
    tdApellido.textContent=apellidoNuevo;
    tr.appendChild(tdNombre);
    tr.appendChild(tdApellido);
})
