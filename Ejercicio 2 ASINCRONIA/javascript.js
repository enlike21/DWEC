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
function cargarUsuarios(select) {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(usuarios => {
            usuarios.forEach(usuario => {
                const option = document.createElement("option");
                option.textContent = usuario.name;
                option.value = usuario.id;
                select.appendChild(option);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}

// Función para mostrar los posts y comentarios del usuario seleccionado
function mostrarPostsYComentarios(userId) {
    const div = document.getElementById("postsContainer");
    div.innerHTML = ""; // Limpiar contenido anterior

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(posts => {
            posts.forEach(post => {
                const postCard = document.createElement("div");
                postCard.classList.add("col-md-6", "mb-3");
                postCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                        </div>
                    </div>
                `;

                fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error ${response.status}: ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then(comentario => {
                        const listacomentarios = document.createElement("ul");
                        listacomentarios.classList.add("list-group", "list-group-flush");
                        comentario.forEach(comment => {
                            const comentario_li = document.createElement("li");
                            comentario_li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                            comentario_li.innerHTML = `
                                <span>${comment.body}</span>
                                <button type="button" class="btn btn-danger btn-sm m-3 eliminar">Eliminar</button>
                                <button type="button" class="btn btn-primary btn-sm m-3 modificar">Modificar</button>
                            `;
                            comentario_li.querySelector(".eliminar").addEventListener("click", () => {
                                eliminarComentario(comentario_li);
                            });
                            comentario_li.querySelector(".modificar").addEventListener("click", () => {
                                modificarComentario(comentario_li);
                            });
                            listacomentarios.appendChild(comentario_li);
                        });

                        const cardBody = postCard.querySelector(".card-body");
                        cardBody.appendChild(listacomentarios);
                    })
                    .catch(error => {
                        alert(error.message);
                    });

                div.appendChild(postCard);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}


// Función para eliminar un comentario
function eliminarComentario(li) {
    li.remove();
}

function modificarComentario(li) {
    let frase = prompt("Que quieres modificar");
    li.innerHTML = `
        <span>${frase}</span>
        <button type="button" class="btn btn-danger btn-sm m-3 eliminar">Eliminar</button>
        <button type="button" class="btn btn-primary btn-sm m-3 modificar">Modificar</button>
    `;
}