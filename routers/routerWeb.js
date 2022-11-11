const express = require('express');
const { controladorWeb } = require("../controllers/controladorWeb.js");
const { controladorWebListadoProductos } = require("../controllers/controladorWeb.js");
const { controladorPostWebProductos } = require("../controllers/controladorWeb.js");


const routerWeb = express.Router();

routerWeb.get('/', controladorWeb);
routerWeb.get('/productos', controladorWebListadoProductos);
routerWeb.post('/productos', controladorPostWebProductos);
routerWeb.post('/productos', controladorPostWebProductos);


exports.routerWeb = routerWeb;

