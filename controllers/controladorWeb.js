import  Contenedor  from '../container/container.js';
import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import loggerError from '../pinoError.js';



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

    if(resul.message) { 
      loggerError(req, resul.message)
     } 
    res.render('formulario');
}


  

export { controladorWeb, controladorWebListadoProductos, controladorPostWebProductos }



