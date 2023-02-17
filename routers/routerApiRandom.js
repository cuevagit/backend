import { Router } from 'express';
import { controladorRandom } from '../controllers/controladorRandom.js';
import loggerMiddleware from '../pino.js'

const routerApiRandom = Router();


routerApiRandom.get('/api/randoms',  loggerMiddleware, controladorRandom)
 
export {routerApiRandom}