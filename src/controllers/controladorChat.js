import loggerError from '../utils/pinoError.js';
import { chatService } from '../negocio/services/chat.service.js';



async function controladorPostChat(req, res) {
    res.status(201);
    const objeto = req.body;
    const resul = await chatService.grabarChat(objeto)
    
    if(resul.message) {
        loggerError(req, resul.message)
        res.json(objeto)
    } else
        res.json(objeto)
    }


export  {controladorPostChat}; 
