import  Contenedor  from '../container/container.js';
import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';


//const prodTest = new Contenedor(clienteSql, 'productos');
const prodTest = new Contenedor(clienteSqlLite3, 'productos');

 function controladorWeb(req, res) {
  //res.render('formulario')

  if(req.session?.user) { 
    res.render('formulario')
  } else {
    return res.redirect('/');
  }

}

function controladorWebLogin(req, res) {
    console.log("ete es el usuario " + req.session.user)
    
    if(req.session?.user) { 
        return res.redirect('/formulario');
      } else {
         res.render('login')
      }
 }

async function controladorWebListadoProductos(req, res) {
    const productos = await prodTest.getAll();
    res.render('listado', {productos, hayProductos: productos? productos.length : null}) 
}

async function controladorPostWebProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    await prodTest.save(objeto);
    res.render('formulario');
}


function controladorLogout(req, res) {
  
    //res.json({ususario: "pepe"})
    const usuario = req.session.user

    req.session.destroy(() => {
        //res.render("hasta", { hasta: person });
    //  setTimeout(() => {
       // res.redirect("http://localhost:8080");
       console.log("entro al destroy!!!")
     // res.json({"usuario": usuario})
      //return res.redirect('/');

   //   }, 2000);
    });

    res.render('logout')

  
  }


export { controladorWeb, controladorWebListadoProductos, controladorPostWebProductos, controladorWebLogin, controladorLogout }



