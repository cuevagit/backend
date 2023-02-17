import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import Contenedor from '../container/container.js'
import ContenedorFaker  from '../container/containerFaker.js'
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


//const prodTest = new Contenedor(clienteSql, 'productos');
const prodTest = new Contenedor(clienteSqlLite3, 'productos');
const prodTestFaker = new ContenedorFaker();


async function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    const id = await prodTest.save(objeto);
    if(id === "Error") {
        logger.error(colors.red("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id))
        pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id)
     } else 
        objeto.id = id
    res.json(objeto)
}

async function controladorGetProductos(req, res) {
    const productos = await prodTest.getAll();
    if(productos === "Error") {
        logger.error(colors.red("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id))
        pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id)
     } else 
     res.json(productos);
}

async function controladorGetProductosTest(req, res) {
    const productos = await prodTestFaker.getProductosTest();
    res.json(productos);
}




export { controladorGetProductos, controladorPostProductos, controladorGetProductosTest}