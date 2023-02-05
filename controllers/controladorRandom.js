import { fork } from 'child_process'
 
 async function controladorRandom(req, res){

    const calculo = fork('calculo.js')
 
    calculo.on('message', msg => {

      if (msg === 'listo') { 
 
        calculo.send(req.query.cant ?? 100000000)
      } else {
        console.log(msg)
          const numerosRandomLista = msg
          res.json(numerosRandomLista);
      }
  }
  )

  }

 

  export  {controladorRandom} 