import express from 'express';
import { controladorWebLogin } from '../controllers/controladorLogin.js';
import { controladorLogout } from '../controllers/controladorLogin.js';
import { controladorLoging } from '../controllers/controladorLogin.js';
import { controladorLoginp } from '../controllers/controladorLogin.js';



const routerLogin = express.Router();

routerLogin.get('/', controladorWebLogin);
routerLogin.get('/logout', controladorLogout);
routerLogin.get('/formulario/login', controladorLoging); 
routerLogin.post('/formulario/login', controladorLoginp); 


export default routerLogin;

