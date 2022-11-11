const { Contenedor } = require("../container/container.js")

const prodTest = new Contenedor('productos.txt')

 function controladorWeb(req, res) {
    res.render('formulario');
}


exports.controladorWeb = controladorWeb;

