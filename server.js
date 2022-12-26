import express from 'express'
import routerApi from './routers/routerApi.js'
import routerApiTest from './routers/routerApiTest.js'
import routerWeb from './routers/routerWeb.js'
import { engine } from 'express-handlebars'  //handlebars
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import Contenedor from './container/containerArchivo.js'
import ContenedorSql from './container/container.js'
import { clienteSql } from './db/clienteSql.js';
import { clienteSqlLite3 } from './db/clienteSql.js';
import { normalize, denormalize, schema } from "normalizr"
import util from 'util'


const servidor = express()
const httpServer = new HTTPServer(servidor)
const io = new IOServer(httpServer)

//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))

//Middlewares para los routers
servidor.use('/api/productos', routerApi)
servidor.use('/api/productos-test', routerApiTest)
servidor.use('/', routerWeb)
servidor.use('/views', express.static('views'))
servidor.use(express.static('public'))


//handlebars
servidor.engine('handlebars', engine())
servidor.set('view engine', 'handlebars')

const puerto = process.env.PORT ?? 8080

function conectar(puerto = 0) {
  return new Promise((resolve, reject) => {
    const servidorConectado = httpServer.listen(puerto, () => {
      resolve(servidorConectado)
    })
  })
}

//const contenedor = new ContenedorSql(clienteSql, 'productos');
//const contenedorChat = new Contenedor(clienteSql, 'chat');
const contenedor = new ContenedorSql(clienteSqlLite3, 'productos');
//const contenedorChat = new Contenedor(clienteSqlLite3, 'chat');
const contenedorChat = new Contenedor('chat.txt');


function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}

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

  const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
  const schemaMensaje = new schema.Entity('mensajesChat', {author: schemaAuthor});
  const schemaMensajes = new schema.Entity('posts', {author: schemaAuthor, posts: [schemaMensaje]});

 const  normalizedMensajesChat = normalize(data, schemaMensajes);

//print(normalizedMensajesChat)

socket.emit('mensajesChatActualizados', normalizedMensajesChat);
}


  socket.on('mensajes', data => {
    data.socketid = socket.id

   io.sockets.emit('mensajesActualizados', `<tr><td>${data.title}</td> <td>${data.price}</td> <td><img width="70px" src=${data.thumbnail} alt="Imagen producto"/></td><tr>`);
  })

  socket.on('mensajesChat', data => {
    data.socketid = socket.id 
    
    //Normalización   
    const mensajesChat = {
      id: data.id,
      author: {
       id: data.author.id,
       email: data.author.email,
       nombre: data.author.nombre,  
       apellido: data.author.apellido,  
       edad: data.author.edad,  
       alias: data.author.alias,
       avatar: data.author.avatar
     },
     fecha: data.fecha,
     mensaje: data.mensaje
    }
  
      const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
      const schemaMensaje = new schema.Entity('mensajesChat', {author: schemaAuthor});

      const normalizedMensajesChat = normalize(mensajesChat, schemaMensaje);
     
//print(normalizedMensajesChat)
   io.sockets.emit('mensajesChatActualizados', normalizedMensajesChat);
  })

})


export { conectar }















