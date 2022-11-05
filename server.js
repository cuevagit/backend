const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const { routerWeb } = require("./routers/routerWeb.js")


const servidor = express()

  servidor.use(express.json())
  servidor.use(express.urlencoded({ extended: true }))

  servidor.use('/api/productos', routerApi)
  servidor.use('/', routerWeb)
  servidor.use('/views', express.static('views'))



  function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectado = servidor.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectado.on("error", error => reject(error))
    })
  }

  module.exports = { conectar }



  











