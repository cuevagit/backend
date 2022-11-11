const { randomUUID } = require('crypto');
const { Contenedor } = require("../container/container.js")
const fs = require("fs");

const prodTest = new Contenedor('productos.txt')

async function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    objeto.id = randomUUID();
    await prodTest.save(objeto);
    res.json(objeto)
}

async function controladorGetProductos(req, res) {
    const productos = await prodTest.getAll();
    res.json(productos);
}

async function controladorGetProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.getAll();
    const buscado = productos.find(c => c.id === id);
    if (!buscado) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        res.json(buscado);
    }
}

async function controladorPutProductosSegunId({ body, params: { id } }, res) {
    const productos = await prodTest.getAll();
    const indiceBuscado = productos.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        body.id = id;
        productos[indiceBuscado] = body;
        await prodTest.update(productos);
        res.json(body);
    }
}


async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.getAll();
    const indiceBuscado = productos.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        const borrados = await prodTest.deleteById(id);
        res.json(borrados[0]);
    }
}


function controladorproductosRandom(req, res){
    res.send(prodTest.getById(randomUUID()))
}



exports.controladorGetProductos = controladorGetProductos;
exports.controladorPostProductos = controladorPostProductos;
exports.controladorGetProductosSegunId = controladorGetProductosSegunId;
exports.controladorPutProductosSegunId = controladorPutProductosSegunId;
exports.controladorDeleteProductosSegunId = controladorDeleteProductosSegunId;
exports.controladorproductosRandom = controladorproductosRandom;