import express from 'express';
const routerApi = express.Router();


import { controladorGetProductos,
         controladorPostProductos,
         controladorPutProductosSegunId,
         controladorDeleteProductosSegunId,
         controladorGetProductoSegunId } from '../../controllers/controllers/controladorProductos.js';

import { controladorPostChat } from '../../controllers/controllers/controladorChat.js'



routerApi.post('/',  controladorPostProductos);    
routerApi.get('/',   controladorGetProductos);  
routerApi.get('/:id', controladorGetProductoSegunId);  
routerApi.put('/:id', controladorPutProductosSegunId);
routerApi.delete('/:id', controladorDeleteProductosSegunId);   
routerApi.post('/chat',  controladorPostChat);     



export default routerApi;
