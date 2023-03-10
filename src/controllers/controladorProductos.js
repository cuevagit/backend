import { clienteSql } from '../db/clienteSql.js';
//import { clienteSqlLite3 } from '../db/clienteSql.js';
import Contenedor from '../container/container.js'
import ContenedorFaker  from '../container/containerFaker.js'
import loggerError from '../utils/pinoError.js';
import { productService } from '../negocio/services/product.service.js';

const prodTest = new Contenedor(clienteSql, 'productos');
//const prodTest = new Contenedor(clienteSqlLite3, 'productos');
const prodTestFaker = new ContenedorFaker();


async function controladorPostProductos(req, res) {

    res.status(201);
    const objeto = req.body;

    const resul = await productService.grabarProducto(objeto)

    if(resul.message){
        loggerError(req, id.message)
        throw(error)
    } else
       res.json(objeto)
 
}

async function controladorGetProductos(req, res) {

        const productos = await productService.listarProducto();
   
        if(productos.message){
            loggerError(req, error.message)
            throw(error)
        } else
            res.json(productos);

}



async function controladorGetProductosTest(req, res) {
    
        const productos = await productService.productosFaker();

        if(productos.message) {
            loggerError(req, error.message)
            return error
        } else
          res.json(productos); 
}




export { controladorGetProductos, controladorPostProductos, controladorGetProductosTest}