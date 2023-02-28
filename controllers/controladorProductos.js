import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import Contenedor from '../container/container.js'
import ContenedorFaker  from '../container/containerFaker.js'
import loggerError from '../pinoError.js';


//const prodTest = new Contenedor(clienteSql, 'productos');
const prodTest = new Contenedor(clienteSqlLite3, 'productos');
const prodTestFaker = new ContenedorFaker();


async function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    const id = await prodTest.save(objeto);
    if(id.message) { 
      loggerError(req, id.message)
     } else 
        objeto.id = id
    res.json(objeto)
}

async function controladorGetProductos(req, res) {
    const productos = await prodTest.getAll();
    if(productos.message) { 
      loggerError(req, productos.message)
     } else 
     res.json(productos);
}

async function controladorGetProductosTest(req, res) {
    const productos = await prodTestFaker.getProductosTest();
    res.json(productos);
}




export { controladorGetProductos, controladorPostProductos, controladorGetProductosTest}