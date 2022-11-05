const express = require('express');
const { controladorWeb } = require("../controllers/controladorWeb.js");

const routerWeb = express.Router();

routerWeb.get('/', controladorWeb);

exports.routerWeb = routerWeb;

