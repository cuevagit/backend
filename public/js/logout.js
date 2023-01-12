/* fetch('http://localhost:8080/formulario/logout', {method:'GET'})
.then(response => response.json())
.then(data =>    {
  console.log(data)
  document.getElementById('despedida').insertAdjacentHTML('beforeend', `<strong>Hasta luego </strong> ${data.usuario}`);
 }
)
//window.location.href ="http://localhost:8080/logout";*/
setTimeout(() => {
 window.location.href ="http://localhost:8080";
}, 2000);

