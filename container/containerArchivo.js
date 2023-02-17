import fs from 'fs';

class Container{

    #productos;
    #filename;

    constructor(filename) {
        this.#productos = [];
        this.#filename = filename;
    }



    //PRODUCTOS

    async save(objeto){
 
        try {
           if(await this.getAll())
            this.#productos = await this.getAll()
        } 
        catch (error){
            this.#productos = [];
            return 'Error: ' + error
        } 

            this.#productos.push(objeto)
            try{
              await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos, null, 2))
              return 'Id del objeto guardado: ' + this.#productos[this.#productos.length - 1].id
            }
            catch(error){
              return 'Error: ' + error
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
            return 'Error: ' + error
        } 

    }

  }



 export default Container;
