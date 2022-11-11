const express = require('express');
const { controladorWeb } = require("../controllers/controladorWeb.js");
const { controladorGetProductos } = require("../controllers/controladorProductos.js");


const routerWeb = express.Router();

routerWeb.get('/', controladorWeb);
routerWeb.get('/productos', controladorGetProductos);

exports.routerWeb = routerWeb;

