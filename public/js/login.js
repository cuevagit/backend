const botonlogin = document.getElementById("ingresar")

botonlogin.onclick = async(e) => {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value

console.log("este es el nuevo usuario" + usuario)
 await fetch('http://localhost:8080/formulario/login', {
  method: "POST",
  body: JSON.stringify({usuario: usuario}),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
  window.location.href ="http://localhost:8080/formulario";
}