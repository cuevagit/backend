import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import Contenedor from '../container/containerArchivo.js';

//const chatTest = new Contenedor(clienteSql, 'chat');
//const chatTest = new Contenedor(clienteSqlLite3, 'chat');
const chatTest = new Contenedor('chat.txt');

async function controladorPostChat(req, res) {
    res.status(201);
    const objeto = req.body;
    const id = await chatTest.save(objeto);
    objeto.id = id
    res.json(objeto)
}

export  {controladorPostChat}; 
