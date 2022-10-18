const fs = require("fs");

class Contenedor{

    #productos;
    constructor() {
        this.#productos = []
   }
    

    async save(title, price, thumbnail){

       let id

        try {
            const contenido = JSON.parse(await fs.promises.readFile('./productos.json', 'UTF-8'))

            if(contenido) { 
              this.#productos = contenido
            }
        }

        catch(error){
            console.log("El array está vacio aún")
        } 

        if(this.#productos.length > 0)
           id = this.#productos[this.#productos.length - 1].id + 1
        else
            id = 1


        try {
            this.#productos.push({id, title, price, thumbnail})
            await fs.promises.writeFile('./productos.json', JSON.stringify(this.#productos))
            return 'Id del objeto guardado: ' + this.#productos[this.#productos.length - 1].id
        }
        catch(error){
            console.log("Hubo un error: " + error)
        } 

      }


    async getById(id){
       
        try {
            const contenido = JSON.parse(await fs.promises.readFile('./productos.json', 'UTF-8'))

            if(contenido) { 
              this.#productos = contenido
            }

            const objetoBuscado = this.#productos.find((p)=>p.id===id)

            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }
            
        }

        catch(error){
            console.log("Hubo un error: " + error)
        } 

     }


     async getAll(){

        try {
            const contenido = JSON.parse(await fs.promises.readFile('./productos.json', 'UTF-8'))

            if(contenido) { 
              this.#productos = contenido
              return this.#productos
            } else
              return null
            }

        catch(error){
            console.log("Hubo un error: " + error)
        } 

    }


    async deleteById(id){

        try {
            const contenido = JSON.parse(await fs.promises.readFile('./productos.json', 'UTF-8'))

            if(contenido) { 
              this.#productos = contenido

              try {
                await fs.promises.writeFile('./productos.json', JSON.stringify(this.#productos.filter(p => p.id !== id)))
            }
            catch(error){
                console.log("Hubo un error: " + error)
            } 


           } else
              return null
            }

        catch(error){
            console.log("Hubo un error: " + error)
        } 


    }

    async deleteAll(){

        this.#productos = []

              try {
                await fs.promises.writeFile('./productos.json', JSON.stringify(this.#productos))
            }
            catch(error){
                console.log("Hubo un error: " + error)
            } 

    }

  }

  const prodTest = new Contenedor

    async function ejecutar(){  
    console.log('Guarda datos (método save)')
    console.log(await prodTest.save('111', 300, './img/22lr.png'));
    console.log(await prodTest.save('222', 300, './img/308.png')); 
    console.log(await prodTest.save('333', 300, './img/22lr.png')); 

    console.log('Retorno array con todos sus elementos')
    console.log(await prodTest.getAll())

    console.log('Devuelve el elemento con id=2')
    console.log(await prodTest.getById(2));

    console.log('Elimino producto del array con id=3')
    await prodTest.deleteById(3)
    console.log(await prodTest.getAll())

    console.log('Elimino todos los elementos del array')
    await prodTest.deleteAll()
    console.log(await prodTest.getAll())
  }

  ejecutar();

  











