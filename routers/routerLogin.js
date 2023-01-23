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


const routerLogin = express.Router();

routerLogin.get('/', controladorWebLogin);
routerLogin.get('/logout', controladorLogout);
routerLogin.get('/volveralogin', controladorVolveralogin);
routerLogin.get('/formulario/login', isAuthenticated, controladorLoging); 
routerLogin.post('/formulario/login', passport.authenticate("login", { failureRedirect: "/faillogin"}), controladorLoginp); 
routerLogin.get('/registro', controladorIraRegistro); 
routerLogin.get('/login', controladorIraLogin); 
routerLogin.post('/formulario/registro', passport.authenticate("register", { successRedirect: "/",  failureRedirect: "/failregister" })); 
routerLogin.get('/faillogin', controladorFailLogin);
routerLogin.get('/failregister', controladorFailRegister);


function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
  }



export default routerLogin;

