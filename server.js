import express from 'express'
import routerApi from './routers/routerApi.js'
import routerApiTest from './routers/routerApiTest.js'
import routerWeb from './routers/routerWeb.js'
import routerLogin from './routers/routerLogin.js'
import { engine } from 'express-handlebars'  //handlebars
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import websocket from './webSocket.js'
import logIn from './logIn.js'
import mongoose from 'mongoose'
import {MONGOOSE} from './config.js'
import { routerApiRandom } from './routers/routerApiRandom.js'


const servidor = express()
const httpServer = new HTTPServer(servidor)
const io = new IOServer(httpServer)


//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))



///LOGIN CON SESSION Y PASSPORT
logIn(servidor);



//Middlewares para los routers
servidor.use('/api/productos', routerApi)
servidor.use('/api/productos-test', routerApiTest)
servidor.use('/', routerWeb)
servidor.use('/', routerLogin)
servidor.use('/', routerApiRandom)

servidor.use('/views', express.static('views'))
servidor.use(express.static('public'))


//handlebars
servidor.engine('handlebars', engine())
servidor.set('view engine', 'handlebars')


const yargs = process.argv.slice(2)
const puerto = yargs[0] ?? 8080

function conectar() {

  ////Conexión de mogoose a la BD de MongoDB
  try {
    const mongo = mongoose.connect(MONGOOSE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la Base de Datos");
  } catch (error) {
    console.log(`Error en conexión de Base de datos: ${error}`);
  }
//////

  return new Promise((resolve, reject) => {
    const servidorConectado = httpServer.listen(puerto, () => {
      resolve(servidorConectado)
    })

  })
}

websocket(io)


export { conectar }















