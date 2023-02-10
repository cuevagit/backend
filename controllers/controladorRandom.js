import { fork } from 'child_process'

 async function controladorRandom(req, res){
  console.log("El proceso que atendió fue el " + process.pid)

    const calculo = fork('calculo.js')
 
    calculo.on('message', msg => {

      if (msg === 'listo') { 
 
        calculo.send(req.query.cant ?? 100000000)  //100000000
      } else {
        console.log(msg)
          const numerosRandomLista = msg
          res.json(numerosRandomLista);
       // res.send("Proceso: " + process.pid)
      }
  }
  )

  }

 

  export  {controladorRandom} 