import { Router } from 'express';
import { controladorRandom } from '../../controllers/controllers/controladorRandom.js';

const routerApiRandom = Router();


routerApiRandom.get('/api/randoms',   controladorRandom)
 
export {routerApiRandom}