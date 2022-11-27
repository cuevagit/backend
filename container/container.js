const fs = require("fs");

class Contenedor{

    #productos;
    #chat;
    #filename;

    constructor(filename) {
        this.#productos = [];
        this.#chat = [];
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
            error => { throw error}
        } 

        try {
            this.#productos.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos, null, 2))
            return 'Id del objeto guardado: ' + this.#productos[this.#productos.length - 1].id
        }
        catch(error){
            error => { throw error}
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
            error => { throw error}
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
            error => { throw error}
        } 

    }


    async deleteById(id){
        try {
            this.#productos = await this.getAll()
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos.filter(p => p.id !== id), null, 2))
            return this.#productos.filter(p => p.id == id)
        }
        catch(error){
            error => { throw error}
        } 
    }

    async deleteAll(){

        this.#productos = []

            try {
                await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos), null, 2)
            }
            catch(error){
                error => { throw error}
            } 

    }

    async update(objeto){
        try {
            await fs.promises.writeFile(this.#filename, JSON.stringify(objeto, null, 2))
            return objeto;
        }
        catch(error){
            error => { throw error}
        } 
    }



    //CHAT

    async saveChat(objeto){
 
        try {
           if(await this.getAll())
            this.#chat = await this.getAllChat()
        } 
        catch (error){
            this.#chat = [];
            error => { throw error}
        } 
    
        try {
            this.#chat.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#chat, null, 2))
            return 'Id del objeto guardado: ' + this.#chat[this.#chat.length - 1].id
        }
        catch(error){
            error => { throw error}
        } 
    
      }
    
    
      async getAllChat(){
    
        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.#filename, 'UTF-8'))
    
                if(contenido) { 
                 this.#chat = contenido
                 return this.#chat
                } else { 
                 return null
                }
            }
    
        catch(error){
            error => { throw error}
        } 
    
    }
    

  }



  exports.Contenedor = Contenedor;
