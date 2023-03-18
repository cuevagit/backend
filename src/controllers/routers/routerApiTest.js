import express from 'express';


const routerApiTest = express.Router();


import { controladorGetProductosTest } from '../../controllers/controladorProductos.js';   


routerApiTest.get('/',  controladorGetProductosTest);


export default routerApiTest;
