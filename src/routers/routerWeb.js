import express from 'express';
import { controladorWeb } from '../controllers/controladorWeb.js';
import { controladorWebListadoProductos } from '../controllers/controladorWeb.js';
import { controladorPostWebProductos } from '../controllers/controladorWeb.js';
import { controladorProcessInfo } from "../controllers/controladorProcessInfo.js"
import { controladorWebInfoProcess } from "../controllers/controladorProcessInfo.js"
import compression from 'compression'


const routerWeb = express.Router();

routerWeb.get('/formulario',  controladorWeb);  //No
routerWeb.get('/productos',  controladorWebListadoProductos);   //hecho 
routerWeb.post('/productos',  controladorPostWebProductos);    //hecho
routerWeb.get('/info',  controladorProcessInfo)    //Hecho
routerWeb.get('/infoconcompresion',  compression(), controladorProcessInfo)   //No
routerWeb.get('/infoList',  controladorWebInfoProcess)   //No


export default routerWeb;

