import express from 'express';
const routerApi = express.Router();


import { controladorGetProductos,
         controladorPostProductos,
         controladorPutProductosSegunId,
         controladorDeleteProductosSegunId,
         controladorGetProductoSegunId,
         controladorSubirImagenProducto } from '../../controllers/controllers/controladorProductos.js';

import { controladorPostChat } from '../../controllers/controllers/controladorChat.js'

import { multer_function } from '../../negocio/utils/multer.js'


routerApi.post('/',  controladorPostProductos);    
routerApi.get('/',   controladorGetProductos);  
routerApi.get('/:id', controladorGetProductoSegunId);  
routerApi.put('/:id', controladorPutProductosSegunId);
routerApi.delete('/:id', controladorDeleteProductosSegunId);   
routerApi.post('/chat',  controladorPostChat);     
routerApi.post('/imagenes', multer_function(), controladorSubirImagenProducto);     




export default routerApi;
