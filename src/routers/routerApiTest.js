import express from 'express';


const routerApiTest = express.Router();


import { controladorGetProductosTest } from '../controllers/controladorProductos.js';   //Hacer servicio (faker)


routerApiTest.get('/',  controladorGetProductosTest);


export default routerApiTest;
