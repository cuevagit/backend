let numerosRandomList = []
let cantidadNumeros = 0


export const  numerosRandom = (cant) => {

  numerosRandomList = []

   cantidadNumeros = cant

   console.log(cant)
    if (cant===0 || cant===undefined){
        cant = 100000000
    }
    
    for ( let i = 0; i < cant; i++) {
        const nroAleatorio = Math.trunc(Math.random()*1000) + 1       
        numerosRandomList[nroAleatorio] = numerosRandomList[nroAleatorio] + 1  || 1
      }

      const resultado = {}

      for (let j = 1; j <= 1000; j++){
        resultado[j] =   numerosRandomList[j] ?? 0
      }
 
    return resultado

}

process.on('message', msg => {
    console.log(msg)
    const resultado = numerosRandom(msg)
    
    process.send(resultado)
 
  
})

process.send('listo')





 
