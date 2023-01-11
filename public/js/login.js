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
//  window.location.href ="http://localhost:8080/formulario";
}


/*fetch('http://localhost:8080/formulario/login', {method:'GET'})
.then(response => response.json())
.then(data =>    {
  console.log("este el el get del login")
  console.log(data)
  if(data.usuario){ 
   // document.getElementById('bienvenido').insertAdjacentHTML('beforeend', `<strong>Bienvenido </strong> ${data.usuario}`);
    window.location.href ="http://localhost:8080/formulario";
  } else {
    window.location.href ="http://localhost:8080/login";

  }
   
 }
)*/