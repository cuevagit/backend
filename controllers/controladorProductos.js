import { clienteSql } from '../db/clienteSql.js';
import Contenedor from '../container/container.js'


const prodTest = new Contenedor(clienteSql, 'productos');

async function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    const id = await prodTest.save(objeto);
    objeto.id = id
    res.json(objeto)
}

async function controladorGetProductos(req, res) {
    const productos = await prodTest.getAll();
    res.json(productos);
}

async function controladorGetProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.getById(id);

    if (!productos[0]) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        res.json(productos[0]);
    }
}

async function controladorPutProductosSegunId({ body, params: { id } }, res) {
    const objeto = await prodTest.getById(id)

    if (!objeto[0]) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        body.id = id  
        await prodTest.update(body);
        res.json(body);
    }
}


async function controladorDeleteProductosSegunId({ body, params: { id } }, res) {
    const existe = await prodTest.getById(id)

    if (!existe[0]) {
        res.status(403);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        await prodTest.deleteById(id);
        body.id = id
        res.json(body);
    }
}


function controladorproductosRandom(req, res){
    res.send(prodTest.getById(randomUUID()))
}



export { controladorGetProductos, controladorPostProductos, controladorGetProductosSegunId, 
controladorPutProductosSegunId, controladorDeleteProductosSegunId, controladorproductosRandom}