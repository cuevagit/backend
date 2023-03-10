import pino from 'pino'
import colors from 'colors'


const logger = pino({
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  })


  export default async function loggerMiddleware(req, res, next) {
    await logger.info(colors.cyan("Se hizo peticion a la URL: " + req.url + " y el metodo: " + req.method));
    next();
}










