import { Router } from 'express';
import { controladorRandom } from '../controllers/controladorRandom.js';

const routerApiRandom = Router();


routerApiRandom.get('/api/randoms',  controladorRandom)
 
export {routerApiRandom}