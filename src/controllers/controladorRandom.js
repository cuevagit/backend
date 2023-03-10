//import { fork } from 'child_process'
import {numerosRandom} from '../calculo.js'


 async function controladorRandom(req, res){

  const numerosRandomLista = numerosRandom(req.query.cant ?? 100000000)

    /*const calculo = fork('calculo.js')
 
    calculo.on('message', msg => {

      if (msg === 'listo') { 
 
        calculo.send(req.query.cant ?? 100000000)  //100000000
      } else {
        console.log(msg)
          const numerosRandomLista = msg
          res.json(numerosRandomLista);
      }
  }
  )*/
  //console.log(numerosRandomLista)
  res.json(numerosRandomLista);

  }

 

  export  {controladorRandom} 