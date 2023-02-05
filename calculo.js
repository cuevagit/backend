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
        numerosRandomList[i] = Math.trunc(Math.random()*1000)        
      }

      const resultado = {}
      numerosRandomList.forEach(el => (resultado[el] = resultado[el] + 1 || 1))
 
    return resultado

}

process.on('message', msg => {
    console.log(msg)
    const resultado = numerosRandom(msg)
    
    process.send(resultado)
 
  
})

process.send('listo')