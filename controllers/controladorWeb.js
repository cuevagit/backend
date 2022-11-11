const { Contenedor } = require("../container/container.js")
const { randomUUID } = require('crypto');

const prodTest = new Contenedor('productos.txt')

 function controladorWeb(req, res) {
    res.render('formulario');
}

async function controladorWebListadoProductos(req, res) {
    const productos = await prodTest.getAll();
    res.render('listado', {productos, hayProductos: productos? productos.length : null}) 
}

async function controladorPostWebProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    objeto.id = randomUUID();
    await prodTest.save(objeto);
    res.render('formulario');
}


exports.controladorWeb = controladorWeb;
exports.controladorWebListadoProductos = controladorWebListadoProductos;
exports.controladorPostWebProductos = controladorPostWebProductos;



