const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const { routerWeb } = require("./routers/routerWeb.js")


const servidor = express()

  servidor.use(express.json())
  servidor.use(express.urlencoded({ extended: true }))

  servidor.use('/api/productos', routerApi)
  servidor.use('/', routerWeb)
  servidor.use('/views', express.static('views'))


  function getAleatorio() {
    return Math.floor(Math.random()*3) + 1
  }

  function controladorproductosRandom(req, res){
    res.send(prodTest.getById(getAleatorio()))
  }
   servidor.get('/api/productosRandom', async (peticion, respuesta) => {
    respuesta.send(await prodTest.getById(getAleatorio()))
  })


  function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = servidor.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
  }

  module.exports = { conectar }



  











