import { clienteSql } from '../db/clienteSql.js';
import Contenedor from '../container/container.js';

const chatTest = new Contenedor(clienteSql, 'chat');


async function controladorPostChat(req, res) {
    res.status(201);
    const objeto = req.body;
    const id = await chatTest.save(objeto);
    objeto.id = id
    res.json(objeto)
}

export  {controladorPostChat}; 
