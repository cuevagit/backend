import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';
import Contenedor from '../container/containerArchivo.js';
import pino from 'pino'

const logger = pino()
const pinoError = pino("./logs/error.log");


pino({
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  })

//const chatTest = new Contenedor(clienteSql, 'chat');
//const chatTest = new Contenedor(clienteSqlLite3, 'chat');
const chatTest = new Contenedor('chat.txt');

async function controladorPostChat(req, res) {
    res.status(201);
    const objeto = req.body;
    const id = await chatTest.save(objeto);
     if(id.substring(0, 5) === "Error") {
        logger.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id)
        pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id)
     } else 
        objeto.id = id
    res.json(objeto)
}

export  {controladorPostChat}; 
