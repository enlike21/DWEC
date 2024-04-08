document.addEventListener("DOMContentLoaded", () => {
    let select = document.createElement("select");
    crearselect(select);
    select.addEventListener("change", recuperarPost_Usuarios);
});

//FUNCION PARA CREAR EL SELECT CON LOS IDS DE LOS USUARIOS
function crearselect(select) {
    let posts = new XMLHttpRequest();
    let userIds = new Set(); // HAGO UN SET PARA QUE NO SE REPITAN LOS ID
    posts.open("GET", "https://jsonplaceholder.typicode.com/posts");
    posts.send();
    posts.onload = function () {
        if (posts.status != 200) {
            alert(`Error ${posts.status}: ${posts.statusText}`);
        } else {
            //AÑADO LOS ID DE LOS USUARIOS AL SET PARA QUE NO SE REPITAN LOS VALORES
            JSON.parse(posts.responseText).forEach(post => {
                userIds.add(post.userId);
            });
            //luego lo transformo en un array =D
            usuarios_en_Select(Array.from(userIds), select);
        }
    };
}

//Relleno el select con la informacion del array
function usuarios_en_Select(arrayC, select) {
    arrayC.forEach(userId => {
        let option = document.createElement("option");
        option.textContent = userId;
        option.setAttribute("value", userId);
        select.appendChild(option);
    });
    document.body.appendChild(select);
}

//FUNCION PARA RECUPERAR LOS POST DEL USUARIO Y IMPRIMIRLOS POR PANTALLA
function recuperarPost_Usuarios() {
    let usuario = this.options[this.selectedIndex].value;
    //CREO LA LISTA PARA PONER LOS POSTS
    let lista_post = document.createElement("ol");
    lista_post.innerHTML = "";
    let post_por_usuario = new XMLHttpRequest();
    post_por_usuario.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${usuario}`);
    post_por_usuario.send();
    post_por_usuario.onload = function () {
        if (post_por_usuario.status != 200) {
            alert(`Error ${post_por_usuario.status}: ${post_por_usuario.statusText}`);
        } else {
            let h3 = document.createElement("h3");
            h3.textContent = `Los posts del usuario con id=${usuario} son:`;
            let posts = JSON.parse(post_por_usuario.responseText);
            posts.forEach(post => {
                let li = document.createElement("li");
                li.textContent = post.title;
                lista_post.appendChild(li);
            });


            //ELIMINO TANTO LA LISTA ANTERIOR PARA QUE NO SE SUPERPONGAN COMO EL H3
            let lista_anterior = document.querySelector("ol");
            if (lista_anterior) {
                lista_anterior.remove();
            }
            let h3_anterior = document.querySelector("h3");
            if (h3_anterior) {
                h3_anterior.remove();
            }
            document.body.appendChild(h3);
            document.body.appendChild(lista_post);
        }
    };
}
