document.addEventListener("DOMContentLoaded", () => {
    const select_completo = document.getElementById("userSelect");

    // Cargar usuarios en el select
    cargarUsuarios(select_completo);

    // Evento change del select
    select_completo.addEventListener("change", () => {
        const userId = select_completo.value;
        mostrarPostsYComentarios(userId);
    });
});

// Función para cargar los usuarios en el select
async function cargarUsuarios(select) {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let usuarios = await response.json();
            usuarios.forEach(usuario => {
                const option = document.createElement("option");
                option.textContent = usuario.name;
                option.value = usuario.id;
                select.appendChild(option);
            });
}

// Función para mostrar los posts y comentarios del usuario seleccionado
async function mostrarPostsYComentarios(userId) {
    const div = document.getElementById("postsContainer");
    div.innerHTML = ""; // Limpiar contenido anterior

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await response.json();

    posts.forEach(async post => {
        const postCard = document.createElement("div");
        postCard.classList.add("col-md-6", "mb-3");
        postCard.setAttribute("id", "divprincipal");
        postCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                </div>
            </div>
        `;

        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
        const comentarios = await commentsResponse.json();
        const listacomentarios = document.createElement("ul");
        listacomentarios.classList.add("list-group", "list-group-flush");

        comentarios.forEach(comentario => {
            const comentario_li = document.createElement("li");
            comentario_li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            comentario_li.innerHTML = `
                <span>${comentario.body}</span>
                <button type="button" class="btn btn-danger btn-sm m-3 eliminar">Eliminar</button>
                <button type="button" class="btn btn-primary btn-sm m-3 modificar">Modificar</button>
            `;
            comentario_li.querySelector(".eliminar").addEventListener("click", () => {
                eliminarComentario(comentario_li);
            });
            comentario_li.querySelector(".modificar").addEventListener("click", () => {
                modificarComentario(comentario_li, comentario.id);
            });
            listacomentarios.appendChild(comentario_li);
        });

        const cardBody = postCard.querySelector(".card-body");
        cardBody.appendChild(listacomentarios);

        div.appendChild(postCard);
    });
}



// Función para eliminar un comentario
function eliminarComentario(li) {
    li.remove();
}

async function modificarComentario(li, id) {
    let mensaje = prompt("Dime qué quieres cambiar");
    let json = {
        method: "PUT",
        body: JSON.stringify({
            body: mensaje,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }
    let enviar = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, json);
    let respuesta = await enviar.json();
            console.log(respuesta);
            alert("Cambio efectuado");
            li.querySelector("span").textContent = respuesta.body;
}