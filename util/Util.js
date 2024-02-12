function crearTabla() {
    // Selecciona todos los elementos <li> dentro del contenedor
    const elementosTabla = document.querySelectorAll(".contenedor li");
  
    // Crea los elementos de encabezado
    const encabezadoAlumnos = document.createElement("th");
    encabezadoAlumnos.textContent = "Alumnos";
  
    const encabezadoNombre = document.createElement("th");
    encabezadoNombre.textContent = "Nombre";
  
    const encabezadoApellido = document.createElement("th");
    encabezadoApellido.textContent = "Apellido";
  
    // Crea las filas de encabezado
    const filaEncabezado = document.createElement("tr");
    filaEncabezado.appendChild(encabezadoAlumnos);
  
    const filaEncabezado2 = document.createElement("tr");
    filaEncabezado2.appendChild(encabezadoNombre);
    filaEncabezado2.appendChild(encabezadoApellido);
  
    // Crea el elemento <thead> y añade las filas de encabezado
    const thead = document.createElement("thead");
    thead.appendChild(filaEncabezado);
    thead.appendChild(filaEncabezado2);
  
    // Crea la tabla y añade el <thead>
    const tabla = document.createElement("table");
    tabla.appendChild(thead);
  
    // Itera sobre cada elemento de la lista
    elementosTabla.forEach((alumno) => {
      // Divide el texto del elemento en nombre y apellido
      const nombreApellido = alumno.textContent.split(" ");
      const nombre = nombreApellido[0];
      const apellido = nombreApellido[1];
  
      // Crea una fila para cada alumno y agrega celdas de nombre y apellido
      const fila = document.createElement("tr");
      const celdaNombre = document.createElement("td");
      const celdaApellido = document.createElement("td");
  
      celdaNombre.textContent = nombre;
      celdaApellido.textContent = apellido;
  
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaApellido);
  
      // Agrega la fila a la tabla
      tabla.appendChild(fila);
    });
  
    // Selecciona el contenedor de la tabla y agrega la tabla creada
    const contenedorTabla = document.querySelector(".tablita");
    contenedorTabla.appendChild(tabla);
  }
  
  /* FUNCIONES LOCAL STORAGE */
  
  function guardarEnLocalStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  }
  function obtenerDeLocalStorage(clave) {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
  }
  function eliminarDeLocalStorage(clave) {
    localStorage.removeItem(clave);
  }
  function limpiarLocalStorage() {
    localStorage.clear();
  }
  /* FIN FUNCIONES LOCAL STORAGE */
  
  /* FUNCIONES VENTANAS */
  function abrirVentana(url, nombreVentana, opciones) {
    window.open(url, nombreVentana, opciones);
  }
  
  function cerrarVentana() {
    window.close();
  }
  
  function irAPagina(url) {
    window.location.href = url;
  }
  
  function recargarPagina() {
    window.location.reload();
  }
  /* FIN FUNCIONES VENTANA */
  
  /* FUNCIONES COMUNES ASQUEROSAS  */
  function generarNumerosAleatoriosSinRepetir() {
    let numerosNoRepetidos = new Set(); // <- Set se encarga por si solo de que los valores no sean repetidos
    do {
      let numero = Math.floor(Math.random() * 10);
      numerosNoRepetidos.add(numero);
    } while (numerosNoRepetidos.size < 10);
  
    let numerosUnicos = Array.from(numerosNoRepetidos); //<-- luego lo convertimos a un array y lo devolvemos
    return numerosUnicos;
  }
  
  function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  /* FIN FUNCIONES ASQUEROSAS */
  
  /* FUNCIONES DE EVENTOS QUE PUEDE ESTAR BIEN TENER POR AQUI */
  
  /* 3. Utilizar event.stopPropagation() o event.preventDefault():
  Si deseas detener la propagación de un evento o prevenir el comportamiento predeterminado, 
  pero no necesariamente eliminar el evento, puedes hacerlo dentro de la función de manejo de eventos. Por ejemplo:
   */
  
  // Función de manejo de evento
  function manejarClick(event) {
    event.stopPropagation(); // Detiene la propagación del evento
    event.preventDefault(); // Previene el comportamiento predeterminado del evento
  }
  
  /* La historia de eliminar eventos con explicacion:
  
  // Función de manejo de evento
  function manejarClick() {
    console.log("¡Se hizo clic en el botón!"); --> Siempre necesitamos un manejador si lo queremos eliminar, es decir, que hay que escribir la funcion de manera ortodoxa
  }
  
  // Registrar el evento
  document.getElementById("miBoton").addEventListener("click", manejarClick);
  
  // Eliminar el evento
  document.getElementById("miBoton").removeEventListener("click", manejarClick);
  
  */
  
  /* FUNCIONES VALIDACION */
  
  function validarEmail(email) {
    // Expresión regular para validar un correo electrónico
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function validarNumeroEntero(numero) {
    return Number.isInteger(numero);
  }
  
  function validarLongitudCampo(campo, longitudMinima, longitudMaxima) {
    let longitud = campo.value.trim().length;
    return longitud >= longitudMinima && longitud <= longitudMaxima;
  }
  
  // Ejemplo de uso:
  /* let campo = document.getElementById('campo');
  let longitudMinima = 3;
  let longitudMaxima = 20;
  if (validarLongitudCampo(campo, longitudMinima, longitudMaxima)) {
      console.log('Longitud de campo válida.');
  } else {
      console.log(`El campo debe tener entre ${longitudMinima} y ${longitudMaxima} caracteres.`);
  } */
  
  function validarCamposObligatorios(formulario) {
      let camposObligatorios = formulario.querySelectorAll('[required]');
      let valido = true;
      camposObligatorios.forEach(campo => {
          if (campo.value.trim() === '') {
              valido = false;
              mostrarError(campo, 'Este campo es obligatorio.');
          }
      });
      return valido;
  }
  
  // Función auxiliar para mostrar un mensaje de error debajo del campo
  function mostrarError(campo, mensaje) {
      let error = document.createElement('div');
      error.textContent = mensaje;
      error.classList.add('error');
      campo.parentNode.insertBefore(error, campo.nextSibling);
  }
  
  // Ejemplo de uso:
  let formulario = document.getElementById('miFormulario');
  formulario.addEventListener('submit', function(event) {
      event.preventDefault();
      if (validarCamposObligatorios(formulario)) {
          formulario.submit();
      } else {
          console.log('Por favor, completa todos los campos obligatorios.');
      }
  });