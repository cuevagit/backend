import express from 'express'
import routerApi from './routers/routerApi.js'
import routerApiTest from './routers/routerApiTest.js'
import routerWeb from './routers/routerWeb.js'
import { engine } from 'express-handlebars'  //handlebars
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import websocket from './webSocket.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'


const servidor = express()
const httpServer = new HTTPServer(servidor)
const io = new IOServer(httpServer)

servidor.use(cors());

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

websocket(io)


 servidor.use(session({

  store: MongoStore.create({
      //En Atlas connect App :  Make sure to change the node version to 2.2.12:
      mongoUrl: `mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test`,
  }),
  /* ----------------------------------------------------- */

  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false//,
 // ttl: 1000,
 /* cookie: {
      maxAge: 100000
  } */

}))


servidor.post('/formulario/login', (req, res) => {
  console.log("entro a post")
  req.session.user = req.body.usuario

if(req.session.user) { 
  res.json({usuario: req.session.user})
}

 })


servidor.get('/formulario/login', (req, res) => {
 // res.redirect("/formulario/login")
if(req.session.user) { 
  res.json({usuario: req.session.user})
  // res.redirect("/login"
}
else
 res.redirect("/")

})



export { conectar }















