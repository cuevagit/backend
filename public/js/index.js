const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)


function onSubmit(ev) {
  ev.preventDefault()
}


const form = document.getElementById('formulario');


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value
  const price = document.getElementById('price').value
  const thumbnail = document.getElementById('thumbnail').value

  const mensajes = {
    title: title,
    price: price,
    thumbnail: thumbnail
  }

  socket.emit('mensajes', mensajes);
  form.reset();

  fetch('http://localhost:8080/api/productos/', {
    method: "POST",
    body: JSON.stringify(mensajes),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })

})


socket.on('mensajesActualizados', mensaje => {
   document.getElementById('parrafo').insertAdjacentHTML('beforeend', `<div id="message">${mensaje}</div>`);
});

const botonchat = document.getElementById("enviarchat")




socket.on('mensajesChatActualizados', mensajesChat => {
  document.getElementById('mensajesChat').insertAdjacentHTML('beforeend', `<div id="messagesChat">${mensajesChat}</div>`);
});
 
botonchat.onclick = (e) => {
  e.preventDefault();
  
  const fecha = new Date().toLocaleString()
  const email = document.getElementById('email').value
  const mensaje = document.getElementById('mensaje').value

  const mensajesChat = {
    fecha: fecha,
    email: email,
    mensaje: mensaje  
  }

  socket.emit('mensajesChat', mensajesChat);
  form.reset();

  fetch('http://localhost:8080/api/productos/chat', {
    method: "POST",
    body: JSON.stringify(mensajesChat),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })

}