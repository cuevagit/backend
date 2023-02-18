import express from 'express';
import { controladorWeb } from '../controllers/controladorWeb.js';
import { controladorWebListadoProductos } from '../controllers/controladorWeb.js';
import { controladorPostWebProductos } from '../controllers/controladorWeb.js';
import { controladorProcessInfo } from "../controllers/controladorProcessInfo.js"
import { controladorWebInfoProcess } from "../controllers/controladorProcessInfo.js"
import compression from 'compression'
import loggerMiddleware from '../pino.js'
import loggerErrorMiddleware from '../pinoError.js'


const routerWeb = express.Router();

routerWeb.get('/formulario', loggerMiddleware, controladorWeb);
routerWeb.get('/productos', loggerMiddleware, controladorWebListadoProductos);
routerWeb.post('/productos', loggerMiddleware, controladorPostWebProductos);
routerWeb.get('/info', loggerMiddleware, controladorProcessInfo)
routerWeb.get('/infoconcompresion', loggerMiddleware, compression(), controladorProcessInfo)
routerWeb.get('/infoList', loggerMiddleware, controladorWebInfoProcess)


export default routerWeb;

