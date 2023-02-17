import { conectar } from './server.js';
import createTables from './db/createTables.js'
import {MODO_POR_DEFECTO} from './config.js'
import cluster from 'cluster' 
import os from 'os'
import parseArgs from 'yargs/yargs'


cluster.schedulingPolicy = cluster.SCHED_RR;

const numCPUs = os.cpus().length

const yargs = parseArgs(process.argv.slice(2))

const argv = yargs.alias({m: 'modo'}).default({modo: MODO_POR_DEFECTO}).argv

const MODO = argv.modo



async function main() {

    
if(MODO === 'cluster') { 
/* --------------------------------------------------------------------------- */
/* MASTER */
if (cluster.isPrimary) {
    await createTables()
    console.log("Cantidad de Procesadores: " + numCPUs)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
}
/* --------------------------------------------------------------------------- */
/* WORKERS */
else {
    try {
        const serv = await conectar();
        console.log(`conectado al puerto ${serv.address().port}, proceso secundario: pid ${process.pid}`);
    } catch (error) {
        console.log('algo falló: ' + error);
    }
 }
} else {
    try {
        await createTables()
        const serv = await conectar();
        console.log(`conectado al puerto ${serv.address().port}, proceso: pid ${process.pid}`);
    } catch (error) {
        console.log('algo falló: ' + error);
    }
}
}



main()

