import express from 'express';
import { controladorProcessInfo } from "../controllers/controladorProcessInfo.js"
import compression from 'compression'


const routerInfo = express.Router();


routerInfo.get('/info',  controladorProcessInfo)     
routerInfo.get('/infoconcompresion',  compression(), controladorProcessInfo)   


export default routerInfo;

