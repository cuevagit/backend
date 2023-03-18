import express from 'express';


const routerApiTest = express.Router();


import { controladorGetProductosTest } from '../../controllers/controllers/controladorProductos.js';   


routerApiTest.get('/',  controladorGetProductosTest);


export default routerApiTest;
