import express from 'express';
import { controladorWeb } from '../controladorWeb.js';
import { controladorWebListadoProductos } from '../controladorWeb.js';
import { controladorPostWebProductos } from '../controladorWeb.js';
import { controladorProcessInfo } from "../controladorProcessInfo.js"
import { controladorWebInfoProcess } from "../controladorProcessInfo.js"
import compression from 'compression'


const routerWeb = express.Router();

routerWeb.get('/formulario',  controladorWeb);   
routerWeb.get('/productos',  controladorWebListadoProductos);    
routerWeb.post('/productos',  controladorPostWebProductos);     
routerWeb.get('/info',  controladorProcessInfo)     
routerWeb.get('/infoconcompresion',  compression(), controladorProcessInfo)   
routerWeb.get('/infoList',  controladorWebInfoProcess)    


export default routerWeb;

