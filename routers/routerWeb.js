import express from 'express';
import { controladorWeb } from '../controllers/controladorWeb.js';
import { controladorWebListadoProductos } from '../controllers/controladorWeb.js';
import { controladorPostWebProductos } from '../controllers/controladorWeb.js';
import { controladorWebLogin } from '../controllers/controladorWeb.js';
import { controladorLogout } from '../controllers/controladorWeb.js';
import { controladorLogoutSes } from '../controllers/controladorWeb.js';


const routerWeb = express.Router();

routerWeb.get('/', controladorWebLogin);
routerWeb.get('/formulario', controladorWeb);
routerWeb.get('/productos', controladorWebListadoProductos);
routerWeb.post('/productos', controladorPostWebProductos);
routerWeb.get('/logout', controladorLogout);
//routerWeb.get('/formulario/logout', controladorLogoutSes);



export default routerWeb;

