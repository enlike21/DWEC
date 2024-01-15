let saludo=document.getElementsByClassName("personal-greeting")[0];

function guardarnombre(){
let nombre = document.getElementById("entername").value;
localStorage.setItem("nombre", nombre);
nombreparasaludo=localStorage.getItem("nombre");
saludo.innerHTML="Welcome to our website "+nombreparasaludo;
let pontunombre=document.getElementsByClassName("remember")[0];
pontunombre.style.display="none";
}

function resetear(){
    saludo.innerHTML="Welcome to our website";
    localStorage.removeItem("nombre");
    let pontunombre=document.getElementsByClassName("remember")[0];
    pontunombre.style.display="block";
}