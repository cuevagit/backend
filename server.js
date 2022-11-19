const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const { routerWeb } = require("./routers/routerWeb.js")
const { engine } = require('express-handlebars')  //handlebars
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

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


function conectar(puerto = 0) {
  return new Promise((resolve, reject) => {
    const servidorConectado = httpServer.listen(puerto, () => {
      resolve(servidorConectado)
    })
  })
}

io.on('connection', (socket) => {
  // "connection" se ejecuta la primera vez que se abre una nueva conexión


  socket.on('mensajes', data => {
    data.socketid = socket.id
    io.sockets.emit('mensajesActualizados', `<tr><td>${data.title}</td> <td>${data.price}</td> <td><img width="70px" src=${data.thumbnail} alt="Imagen producto"/></td><tr>`);
  })

  socket.on('mensajesChat', data => {
    data.socketid = socket.id 
    io.sockets.emit('mensajesChatActualizados', `${data.fecha} - <strong>${data.nombre}</strong>`  + ": " + data.mensaje);
  })

})


module.exports = { conectar }















