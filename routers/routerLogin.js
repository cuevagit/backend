import express from 'express';
import { controladorWebLogin } from '../controllers/controladorLogin.js';
import { controladorLogout } from '../controllers/controladorLogin.js';
import { controladorLoging } from '../controllers/controladorLogin.js';
import { controladorLoginp } from '../controllers/controladorLogin.js';
import { controladorVolveralogin } from '../controllers/controladorLogin.js';
import { controladorIraRegistro } from '../controllers/controladorLogin.js';
import { controladorIraLogin } from '../controllers/controladorLogin.js';
import { controladorFailLogin } from '../controllers/controladorLogin.js';
import { controladorFailRegister } from '../controllers/controladorLogin.js';
import passport from "passport";
import loggerMiddleware from '../pino.js'


const routerLogin = express.Router();

routerLogin.get('/', loggerMiddleware, controladorWebLogin);
routerLogin.get('/logout', loggerMiddleware, controladorLogout);
routerLogin.get('/volveralogin', loggerMiddleware, controladorVolveralogin);
routerLogin.get('/formulario/login', loggerMiddleware, isAuthenticated, controladorLoging); 
routerLogin.post('/formulario/login', loggerMiddleware, passport.authenticate("login", { failureRedirect: "/faillogin"}), controladorLoginp); 
routerLogin.get('/registro', loggerMiddleware, controladorIraRegistro); 
routerLogin.get('/login', loggerMiddleware, controladorIraLogin); 
routerLogin.post('/formulario/registro', loggerMiddleware, passport.authenticate("register", { successRedirect: "/",  failureRedirect: "/failregister" })); 
routerLogin.get('/faillogin', loggerMiddleware, controladorFailLogin);
routerLogin.get('/failregister', loggerMiddleware, controladorFailRegister);


function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
  }



export default routerLogin;

