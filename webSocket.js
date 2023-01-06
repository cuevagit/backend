import Contenedor from './container/containerArchivo.js'
import ContenedorSql from './container/container.js'
import { clienteSql } from './db/clienteSql.js';
import { clienteSqlLite3 } from './db/clienteSql.js';
import { normalize, denormalize, schema } from "normalizr"
import util from 'util'

export default function websocket(io){
    //const contenedor = new ContenedorSql(clienteSql, 'productos');
//const contenedorChat = new Contenedor(clienteSql, 'chat');
const contenedor = new ContenedorSql(clienteSqlLite3, 'productos');
//const contenedorChat = new Contenedor(clienteSqlLite3, 'chat');
const contenedorChat = new Contenedor('chat.txt');


function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
const schemaMensaje = new schema.Entity('mensajesChat', {author: schemaAuthor});
const schemaMensajes = new schema.Entity('posts', {author: schemaAuthor, posts: [schemaMensaje]});

io.on('connection', async(socket) => {
  // "connection" se ejecuta la primera vez que se abre una nueva conexión
 const productos = await contenedor.getAll();

 if(productos){ 
  let mensajeProductos = ""

  mensajeProductos = mensajeProductos + `<div id="productosFake"><b>PRODUCTOS DESDE LA BASE DE DATOS</b></div>`;
  mensajeProductos = mensajeProductos + `<td><b>Nombre:</b></td> <td><b>Precio: </b> </td> <td><b>Imágen</b></td>`;

 productos.forEach(p => {
  mensajeProductos = mensajeProductos + `<tr><td>${p.title}</td> <td width="100px">$ ${p.price}</td> <td><img width="70px" src=${p.thumbnail} alt="Imagen producto"/></td></tr>`
 });

 socket.emit('mensajesActualizados', mensajeProductos);
}

 const chat = await contenedorChat.getAll();

 if(chat){ 

  const id = Math.floor(Math.random() * 99999)

  const data = {
    id: id,
    posts: chat
  }


 const  normalizedMensajesChat = normalize(data, schemaMensajes);
 socket.emit('mensajesChatActualizados', normalizedMensajesChat);
}


  socket.on('mensajes', data => {
    data.socketid = socket.id
    io.sockets.emit('mensajesActualizados', `<tr><td>${data.title}</td> <td>${data.price}</td> <td><img width="70px" src=${data.thumbnail} alt="Imagen producto"/></td><tr>`);
  })


  socket.on('mensajesChat', async(data) => {
    data.socketid = socket.id 
    
    //Normalización   
  const chat = await contenedorChat.getAll();

    if(chat){ 
   
     const id = Math.floor(Math.random() * 99999)
   
     const data = {
       id: id,
       posts: chat
     }
   
   
    const  normalizedMensajesChat = normalize(data, schemaMensajes);   
    io.sockets.emit('mensajesChatActualizados', normalizedMensajesChat);
   }
     
  })

})

}