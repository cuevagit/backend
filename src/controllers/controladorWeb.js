import  Contenedor  from '../container/container.js';
import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import loggerError from '../utils/pinoError.js';
import { productService } from '../negocio/services/product.service.js';



const prodTest = new Contenedor(clienteSqlLite3, 'productos');

 function controladorWeb(req, res) {

  if(req.isAuthenticated) {
    res.render('formulario')
  }
   else 
    return res.redirect('/');

}


async function controladorWebListadoProductos(req, res) {
    
  const productos = await productService.listarProducto();

      if(productos.message) {
        loggerError(req, error.message)
        throw(error)
      }
     else
       res.render('listado', {productos, hayProductos: productos? productos.length : null}) 
    }



async function controladorPostWebProductos(req, res) {

    res.status(201);
    const objeto = req.body;
    const resul = productService.grabarProducto(objeto)

    if(resul.message) {
      loggerError(req, error.message)
      throw(error)
    } else
       res.render('formulario');

}




  

export { controladorWeb, controladorWebListadoProductos, controladorPostWebProductos }



