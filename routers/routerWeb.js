import express from 'express';
import { controladorWeb } from '../controllers/controladorWeb.js';
import { controladorWebListadoProductos } from '../controllers/controladorWeb.js';
import { controladorPostWebProductos } from '../controllers/controladorWeb.js';
import { controladorWebLogin } from '../controllers/controladorWeb.js';


const routerWeb = express.Router();

routerWeb.get('/', controladorWebLogin);
routerWeb.get('/formulario', controladorWeb);
routerWeb.get('/productos', controladorWebListadoProductos);
routerWeb.post('/productos', controladorPostWebProductos);


export default routerWeb;

