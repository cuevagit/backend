import ContenedorFaker  from '../../daos/container/containerFaker.js'
import loggerError from '../../negocio/utils/pinoError.js';
import { productService } from '../../negocio/services/product.service.js';
import {randomUUID}  from 'crypto';


const prodTestFaker = new ContenedorFaker();


async function controladorPostProductos(req, res) {

    const objeto = req.body;
    objeto._id = randomUUID();

   
    const resul = await productService.grabarProducto(objeto)

    if(resul.message){
        res.status(500)
        loggerError(req, resul.message)
    } else{
        res.status(201);
        res.json(objeto)
    }
 
}

async function controladorGetProductos(req, res) {

        const productos = await productService.listarProducto();

        if (!productos[0]) {
            res.status(404);
            res.json({ "mensaje": `no hay productos` });
        } else {
        if(productos.message){
            res.status(500)
            loggerError(req, productos.message)
        } else
            res.status(200).json(productos);
        }
}



async function controladorPutProductosSegunId(req, res) {

    const productos = await productService.listarProducto();
 
    if (!productos) {
        res.status(404);
        res.json({ "mensaje": `no hay productos` });
    } else {
       if(productos.message){
        res.status(500)
        loggerError(req, productos.message)
       }
       else {
        req.body._id = req.params.id;
        const resul = await productService.actualizarProducto(req.body);
        res.status(200).json(resul);
    }
  }

}


async function controladorDeleteProductosSegunId(req, res) {

    const productos = await productService.listarProducto();

    if (!productos) {
        res.status(404);
        res.json({ mensaje: `no se encontraron productos` });
    } else {
        if(productos.message){
            res.status(500)
            loggerError(req, productos.message)
        }
       else {
        req.body._id = req.params.id;
        const resul = await productService.eliminarProducto(req.body);
        res.status(200).json(resul);    
    }
   }
}



   async function controladorGetProductoSegunId(req, res) {

    req.body._id = req.params.id

    const productos = await productService.listarProductoPorId(req.body);

    if (!productos) {
        res.status(404);
        res.json({ "mensaje": `no existe el producto` });
    } else {
    if(productos.message){
        res.status(500)
        loggerError(req, productos.message)
    } else
        res.status(200).json(productos);
    }
 }


async function controladorGetProductosTest(req, res) {
    
        const productos = await productService.productosFaker();

        if(productos.message) {
            res.status(500)
            loggerError(req, productos.message)
            return error
        } else
          res.status(200).json(productos); 
}



export { controladorGetProductos, controladorPostProductos, controladorPutProductosSegunId, controladorDeleteProductosSegunId, controladorGetProductosTest, controladorGetProductoSegunId}