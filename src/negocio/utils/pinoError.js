import pino from 'pino'
import colors from 'colors'


const logger = pino({
    prettyPrint: {
      colorize: true, // colorizes the log
      levelFirst: true,
      translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    },
  })
  
  const pinoError = pino("./logs/error.log");


  export default function loggerError(req, message){
    logger.error(colors.red("La URL: " + req.baseUrl + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + message))
    pinoError.error("La URL: " + req.url + " y el metodo: " + req.method + " resultaron con el siguiente error: " + message)
  }