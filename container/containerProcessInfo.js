import { cpus } from 'os'


class contenedorProcessInfo{

    async  processInfo(){
        return   {  "Argumentos de Entrada": process.argv,  
                    "Sistema Operativo": process.platform,
                    "version node:": process.version,
                    "Sistema Operativo": process.platform,  
                    "Memoria reservada": process.memoryUsage().rss,
                    "Path de Ejecución": process.execPath,
                    "Process Id": process.pid,
                    "Directorio Actual de Trabajo": process.cwd(),
                    "CPUs": cpus()
                };
    }
   
}

export default contenedorProcessInfo