import  Contenedor  from '../container/container.js';
import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import pino from 'pino'
import colors from 'colors'

const logger = pino()
const pinoError = pino("./logs/error.log");

pino({
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  })


const prodTest = new Contenedor(clienteSqlLite3, 'productos');

 function controladorWeb(req, res) {

  if(req.isAuthenticated) {
    res.render('formulario')
  }
   else 
    return res.redirect('/');

}


async function controladorWebListadoProductos(req, res) {
    const productos = await prodTest.getAll();
    res.render('listado', {productos, hayProductos: productos? productos.length : null}) 
}

async function controladorPostWebProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    const resul = await prodTest.save(objeto);
    if(resul.substring(0, 5) == "Error") {
        logger.error(colors.red("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + resul))
        pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + resul)
     } 
    res.render('formulario');
}


  

export { controladorWeb, controladorWebListadoProductos, controladorPostWebProductos }



