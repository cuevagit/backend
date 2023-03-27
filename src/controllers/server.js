import express from 'express'
import routerApi from '../controllers/routers/routerApi.js'
import routerApiTest from '../controllers/routers/routerApiTest.js'
import routerInfo from '../controllers/routers/routerInfo.js'
import routerLogin from '../controllers/routers/routerLogin.js'
import { engine } from 'express-handlebars'  //handlebars
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import logIn from '../negocio/authentication/logIn.js'
import mongoose from 'mongoose'
import {MONGOOSE} from '../config/config.js'
import {PUERTO_POR_DEFECTO} from '../config/config.js'
import { routerApiRandom } from '../controllers/routers/routerApiRandom.js'
import loggerMiddleware from '../negocio/utils/pino.js'
import loggerRutaNoDisponible from '../negocio/utils/pinoRutaNoDisponible.js'
import parseArgs from 'yargs/yargs'
import cors from 'cors'



const servidor = express()
const httpServer = new HTTPServer(servidor)
const io = new IOServer(httpServer)

//Cors
servidor.use(cors());


//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))
servidor.use(loggerMiddleware)


///LOGIN CON SESSION Y PASSPORT
logIn(servidor);


//Middlewares para los routers
servidor.use('/api/productos', routerApi)
servidor.use('/api/productos-test', routerApiTest)
servidor.use('/', routerInfo)
servidor.use('/', routerLogin)
servidor.use('/', routerApiRandom)

servidor.use('/views', express.static('views'))
servidor.use(express.static('public'))


//handlebars
servidor.engine('handlebars', engine())
servidor.set('view engine', 'handlebars')


const yargs = parseArgs(process.argv.slice(2))

const argv = yargs.alias({p: 'port'}).default({port: PUERTO_POR_DEFECTO}).argv

const puerto = argv.port



  async function conectar_mongoose(){
    ////Conexión de mogoose a la BD de MongoDB
    mongoose.set('strictQuery', false)
    try {
      const mongo =  await mongoose.connect(MONGOOSE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Conectado a la Base de Datos, para el proceso: " + process.pid);
    } catch (error) {
      console.log(`Error en conexión de Base de datos: ${error}`);
    }
  //////
}

 function conectar() {
  conectar_mongoose()
  return new Promise((resolve, reject) => {
    const servidorConectado = httpServer.listen(puerto, () => {
      resolve(servidorConectado)
    })
  })
}

function desconectar() {
  return new Promise((resolve, reject) => {
    httpServer.close(err => {
          resolve(true)
      })
  })
}



loggerRutaNoDisponible(servidor, io)



export { conectar, desconectar }















