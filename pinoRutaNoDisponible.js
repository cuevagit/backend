import pino from 'pino'
import colors from 'colors'

const logger = pino({
  prettyPrint: {
    colorize: true, // colorizes the log
    levelFirst: true,
    translateTime: 'yyyy-dd-mm, h:MM:ss TT',
  },
})

const pinoWarn = pino("./logs/warn.log");





export default function loggerRutaNoDisponible(servidor) {
    servidor.all('*', async (req, res) => {
        await logger.warn(colors.yellow("La URL: " + req.url + " y el metodo: " + req.method + " no estan implementados"))
        pinoWarn.warn("La URL: " + req.url + " y el metodo: " + req.method + " no estan implementados")
        res.status(404).json({error: "404", descripcion: "ruta " + req.url + " método " + req.method + " no implementado"})
      })
}
