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
import cors from 'cors'


const servidor = express()
const httpServer = new HTTPServer(servidor)
const io = new IOServer(httpServer)

servidor.use(cors());

//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))



///LOGIN
logIn(servidor);


//Middlewares para los routers
servidor.use('/api/productos', routerApi)
servidor.use('/api/productos-test', routerApiTest)
servidor.use('/', routerWeb)
servidor.use('/', routerLogin)

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

websocket(io)


export { conectar }















