const fs = require("fs");

class ContenedorChat{
    #chat;
    #filename;

    constructor(filename) {
        this.#chat = [];
        this.#filename = filename;
   }

   async save(objeto){
 
    try {
       if(await this.getAll())
        this.#chat = await this.getAll()
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


  async getAll(){

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


exports.ContenedorChat = ContenedorChat;
