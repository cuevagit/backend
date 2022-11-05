const fs = require("fs");

class Contenedor{

    #productos;
    #filename;

    constructor(filename) {
        this.#productos = [];
        this.#filename = filename;
   }


    async save(objeto){
 
       let id

        try {
            this.#productos = await this.getAll()
        } 
        catch (error){
            throw("El archivo no existe o está vacío")
        } 

        try {
            //objeto.id = id
            this.#productos.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos, null, 2))
            return 'Id del objeto guardado: ' + this.#productos[this.#productos.length - 1].id
        }
        catch(error){
            throw("Hubo un error: " + error)
        } 

      }


    async getById(id){
       
        try {
            this.#productos = await this.getAll()

            const objetoBuscado = this.#productos.find((p)=>p.id===id)

            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }
            
        }

        catch(error){
            throw("Hubo un error: " + error)
        } 

     }


     async getAll(){

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.#filename, 'UTF-8'))

                if(contenido) { 
                 this.#productos = contenido
                 return this.#productos
                } else { 
                 return null
                }
            }

        catch(error){
            throw("Hubo un error: " + error)
        } 

    }


    async deleteById(id){
        try {
            this.#productos = await this.getAll()
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos.filter(p => p.id !== id), null, 2))
        }
        catch(error){
            throw("Hubo un error: " + error)
        } 
    }

    async deleteAll(){

        this.#productos = []

            try {
                await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos), null, 2)
            }
            catch(error){
                throw("Hubo un error: " + error)
            } 

    }

  }



  exports.Contenedor = Contenedor;