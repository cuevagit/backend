const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const { routerWeb } = require("./routers/routerWeb.js")
const { engine } = require('express-handlebars')  //handlebars


  const servidor = express()

  //Middlewares para resolver los datos que viene por el Post
  //Si viene por un Json o si viene de un formulario (Form)
  servidor.use(express.json())
  servidor.use(express.urlencoded({ extended: true }))

  //Middlewares para los routers
  servidor.use('/api/productos', routerApi)
  servidor.use('/', routerWeb)
  servidor.use('/views', express.static('views'))

  //handlebars
  servidor.engine('handlebars', engine())   
  servidor.set('view engine', 'handlebars')


  function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectado = servidor.listen(puerto, () => {
            resolve(servidorConectado)
        })
        servidorConectado.on("error", error => reject(error))
    })
  }

  module.exports = { conectar }



  











