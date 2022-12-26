const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

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

  fetch('http://localhost:8080/productos/', {
    method: "POST",
    body: JSON.stringify(mensajes),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })

})


socket.on('mensajesActualizados', mensaje => {
   document.getElementById('parrafo').insertAdjacentHTML('beforeend', `${mensaje}`);
});

const botonchat = document.getElementById("enviarchat")


socket.on('mensajesChatActualizados', normalizedMensajesChat => {

  const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
  const schemaMensaje = new schema.Entity('mensajesChat', {author: schemaAuthor});
  const schemaMensajes = new schema.Entity('posts', {author: schemaAuthor, posts: [schemaMensaje]});

  let denormalizedData
  let mensajesChat = "<tr><td>"

  denormalizedData = denormalize(normalizedMensajesChat.result, schemaMensajes, normalizedMensajesChat.entities);

  if(!denormalizedData){
    denormalizedData = denormalize(normalizedMensajesChat.result, schemaMensaje, normalizedMensajesChat.entities);
    mensajesChat = `<strong style="color: blue">${denormalizedData.author.email}</strong> - [<h15 style="color: brown"> ${denormalizedData.fecha}</h15>]: <h15 style="color: green; font-family: italic"> ${denormalizedData.mensaje}</h15> <img width="70px" src=${denormalizedData.author.avatar} alt="Avatar"`
  } else {
    for(let j=0; j<denormalizedData.posts.length; j++ ){
     mensajesChat = mensajesChat + `<strong style="color: blue">${denormalizedData.posts[j].author.email}</strong> - [<h15 style="color: brown"> ${denormalizedData.posts[j].fecha}</h15>]: <h15 style="color: green; font-family: italic"> ${denormalizedData.posts[j].mensaje}</h15> <img width="70px" src=${denormalizedData.posts[j].author.avatar} alt="Avatar"</br></br>`
   }
  }

   mensajesChat = mensajesChat + "</td></tr>"

  const caracteresNormalizado = JSON.stringify(normalizedMensajesChat).length
  const caracteresDesnormalizado = JSON.stringify(denormalizedData).length
  const compresion = ((caracteresDesnormalizado/caracteresNormalizado)).toFixed(2)


  document.getElementById('mensajesChat').insertAdjacentHTML('beforeend', `<div id="messagesCompresion"><strong>CENTRO DE MENSAJES (Compresión de Mensajes: ${compresion} %)</strong></div></br>`);
  document.getElementById('mensajesChat').insertAdjacentHTML('beforeend', `<div id="messagesChat">${mensajesChat}</div></br>`);

});

 
botonchat.onclick = (e) => {
  e.preventDefault();
  
  const fecha = new Date().toLocaleString()
  const email = document.getElementById('email').value
  const mensaje = document.getElementById('mensaje').value
  const nombre = document.getElementById('nombre').value
  const apellido = document.getElementById('apellido').value
  const edad = document.getElementById('edad').value
  const alias = document.getElementById('alias').value
  const avatar = document.getElementById('avatar').value


  id1 = Math.floor(Math.random() * 99999)
  id2 = Math.floor(Math.random() * 99999)

  const mensajesChat = {
    id: id1,
   author: {
    id: id2,
    email: email,
    nombre: nombre,  
    apellido: apellido,  
    edad: edad,  
    alias: alias,
    avatar: avatar
  },
  fecha: fecha,
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


fetch('http://localhost:8080/api/productos-test', {method:'GET'})
  .then(response => response.json())
  .then(data =>    {
    document.getElementById('productosFake').insertAdjacentHTML('beforeend', `<div id="productosFake"><strong>PRODUCTOS GENERADOS EN FORMA ALEATORIA (FAKERJS)</strong></div>`);
    
    document.getElementById('productosFake').insertAdjacentHTML('beforeend', `<td><b>Nombre:</b></td> <td><b>Precio: </b> </td> <td><b>Imágen</b></td>`);
    for (let i = 0; i < 5; i++) {   
      document.getElementById('productosFake').insertAdjacentHTML('beforeend', `<td> ${data[i].title}</td> <td width="100px"> $ ${data[i].price}</td> <td><img width="70px" src=" ${data[i].thumbnail}"></td>`);
    }
   }
  )