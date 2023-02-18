import pino from 'pino'
import colors from 'colors'


const logger = pino({
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  })


  export default async function loggerErrorMiddleware(err, req, res, next) {
    console.log(err)
    console.log("entrooo")

    if(err) {
       console.log("entrooo")
       logger.error(colors.red("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id))
       pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + id)
       next();
     }
}
