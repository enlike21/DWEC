document.addEventListener("DOMContentLoaded", () => {
    let select = document.createElement("select");
    crearselect(select);
    select.addEventListener("change", recuperarPost_Usuarios);
});

// FUNCION PARA CREAR EL SELECT CON LOS IDS DE LOS USUARIOS
function crearselect(select) {
    let posts = new XMLHttpRequest();
    let userIds = new Set(); // HAGO UN SET PARA QUE NO SE REPITAN LOS ID
    posts.open("GET", "https://jsonplaceholder.typicode.com/posts");
    posts.send();
    posts.onload = function () {
        if (posts.status != 200) {
            alert(`Error ${posts.status}: ${posts.statusText}`);
        } else {
            // AÑADO LOS ID DE LOS USUARIOS AL SET PARA QUE NO SE REPITAN LOS VALORES
            JSON.parse(posts.responseText).forEach(post => {
                userIds.add(post.userId);
            });
            // LUEGO LO TRANSFORMO EN UN ARRAY
            usuarios_en_Select(Array.from(userIds), select);
        }
    };
}

// Relleno el select con la informacion del array
function usuarios_en_Select(arrayC, select) {
    arrayC.forEach(userId => {
        let option = document.createElement("option");
        option.textContent = userId;
        option.setAttribute("value", userId);
        select.appendChild(option);
    });
    document.body.appendChild(select);
}

// FUNCION PARA RECUPERAR LOS POST DEL USUARIO Y SUS COMENTARIOS Y IMPRIMIRLOS POR PANTALLA
function recuperarPost_Usuarios() {
    let usuario = this.options[this.selectedIndex].value;

    // CREO LA LISTA PARA PONER LOS POSTS
    let lista_post = document.createElement("ol");
    lista_post.classList.add("list-group", "list-group-flush");
    lista_post.innerHTML = "";
    //FIN DE LISTAS

    //RECOJO LOS POST
    let post_por_usuario = new XMLHttpRequest();
    post_por_usuario.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${usuario}`);
    post_por_usuario.send();
    post_por_usuario.onload = function () {
        if (post_por_usuario.status != 200) {
            alert(`Error ${post_por_usuario.status}: ${post_por_usuario.statusText}`);
        } else {
            let h3_posts = document.createElement("h3");
            h3_posts.textContent = `Los posts del usuario con id=${usuario} son:`;
            h3_posts.classList.add("card-title");
            let posts = JSON.parse(post_por_usuario.responseText);
            posts.forEach(post => {
                let postLi = document.createElement("li");
                postLi.classList.add("list-group-item");
                postLi.textContent = post.title;

                // Para cada post, obtengo sus comentarios
                let comentarios_por_post = new XMLHttpRequest();    
                comentarios_por_post.open("GET", `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
                comentarios_por_post.send();
                comentarios_por_post.onload = function () {
                    if (comentarios_por_post.status === 200) {
                        let comentarios = JSON.parse(comentarios_por_post.responseText);
                        comentarios.forEach(comentario => {
                            let comentarioLi = document.createElement("li");
                            comentarioLi.classList.add("list-group-item");
                            comentarioLi.style.fontWeight = "bold";
                            comentarioLi.textContent = comentario.body;
                            lista_post.appendChild(postLi);
                            lista_post.appendChild(comentarioLi);
                        });
                    }
                };
                
                
            });
            
            // ELIMINO TANTO LA LISTA ANTERIOR PARA QUE NO SE SUPERPONGAN COMO EL H3
            let listas_anteriores = document.querySelectorAll("ol");
            listas_anteriores.forEach(lista => {
                lista.remove();
            });

            let h3s_anteriores = document.querySelectorAll("h3");
            h3s_anteriores.forEach(h3 => {
                h3.remove();
            });

            document.body.appendChild(h3_posts);
            document.body.appendChild(lista_post);
            document.body.appendChild(h3_comentarios);
        }
    };
}
