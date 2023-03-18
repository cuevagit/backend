import express from 'express';
import { controladorWebLogin } from '../../controllers/controllers/controladorLogin.js';
import { controladorLogout } from '../../controllers/controllers/controladorLogin.js';
import { controladorLoging } from '../../controllers/controllers/controladorLogin.js';
import { controladorLoginp } from '../../controllers/controllers/controladorLogin.js';
import { controladorVolveralogin } from '../../controllers/controllers/controladorLogin.js';
import { controladorIraRegistro } from '../../controllers/controllers/controladorLogin.js';
import { controladorIraLogin } from '../../controllers/controllers/controladorLogin.js';
import { controladorFailLogin } from '../../controllers/controllers/controladorLogin.js';
import { controladorFailRegister } from '../../controllers/controllers/controladorLogin.js';
import { isAuthenticated } from '../../negocio/middlewares/isAutehnticated.js';
import passport from "passport";


const routerLogin = express.Router();

routerLogin.get('/',  controladorWebLogin);
routerLogin.get('/logout',  controladorLogout);
routerLogin.get('/volveralogin',  controladorVolveralogin);
routerLogin.get('/formulario/login',  isAuthenticated, controladorLoging); 
routerLogin.post('/formulario/login',  passport.authenticate("login", { failureRedirect: "/faillogin"}), controladorLoginp); 
routerLogin.get('/registro',  controladorIraRegistro); 
routerLogin.get('/login',  controladorIraLogin); 
routerLogin.post('/formulario/registro',  passport.authenticate("register", { successRedirect: "/",  failureRedirect: "/failregister" })); 
routerLogin.get('/faillogin',  controladorFailLogin);
routerLogin.get('/failregister',  controladorFailRegister);


export default routerLogin;

