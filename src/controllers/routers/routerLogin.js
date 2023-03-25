import express from 'express';
import { controladorLoginp, controladorLogout, controladorRegistro } from '../../controllers/controllers/controladorLogin.js';
import passport from "passport";


const routerLogin = express.Router();

routerLogin.get('/logout',  controladorLogout);
routerLogin.post('/login',  passport.authenticate("login"), controladorLoginp); 
routerLogin.post('/registro',  passport.authenticate("register"), controladorRegistro); 



export default routerLogin;

