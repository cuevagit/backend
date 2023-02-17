import express from 'express';
import loggerMiddleware from '../pino.js'

const routerApiTest = express.Router();


import { controladorGetProductosTest } from '../controllers/controladorProductos.js';


routerApiTest.get('/', loggerMiddleware, controladorGetProductosTest);


export default routerApiTest;
