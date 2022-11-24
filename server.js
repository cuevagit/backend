const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const { routerWeb } = require("./routers/routerWeb.js")
const { engine } = require('express-handlebars')  //handlebars
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { Contenedor } = require("./container/container.js")
const { ContenedorChat } = require("./container/containerChat.js")

const servidor = express()
const httpServer = new HttpServer(servidor)
const io = new IOServer(httpServer)

//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))

//Middlewares para los routers
servidor.use('/api/productos', routerApi)
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

const contenedor = new Contenedor('productos.txt')
const contenedorChat = new ContenedorChat('chat.txt')

io.on('connection', async(socket) => {
  // "connection" se ejecuta la primera vez que se abre una nueva conexión
 const productos = await contenedor.getAll();
 if(productos){ 
  let mensajeProductos = ""
 productos.forEach(p => {
  mensajeProductos = mensajeProductos + `<tr><td>${p.title}</td> <td>${p.price}</td> <td><img width="70px" src=${p.thumbnail} alt="Imagen producto"/></td><tr>`
 });
 socket.emit('mensajesActualizados', mensajeProductos);
}

 const chat = await contenedorChat.getAll();
 if(chat){ 
  let mensajeChat = ""
 chat.forEach(c => {
  mensajeChat = mensajeChat + `<strong style="color: blue">${c.email}</strong> - [<h15 style="color: brown"> ${c.fecha}</h15>]: <h15 style="color: green; font-family: italic"> ${c.mensaje}</h15></br>`
});
  socket.emit('mensajesChatActualizados', mensajeChat);
}

  socket.on('mensajes', data => {
    data.socketid = socket.id
    io.sockets.emit('mensajesActualizados', `<tr><td>${data.title}</td> <td>${data.price}</td> <td><img width="70px" src=${data.thumbnail} alt="Imagen producto"/></td><tr>`);
  })

  socket.on('mensajesChat', data => {
    data.socketid = socket.id 
    io.sockets.emit('mensajesChatActualizados', `<strong style="color: blue">${data.email}</strong> - [<h15 style="color: brown"> ${data.fecha}</h15>]: <h15 style="color: green; font-family: italic"> ${data.mensaje}</h15>`);
  })

})


module.exports = { conectar }















