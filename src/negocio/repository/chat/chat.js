import Chat from "../../models/chat.js"

export class chat {
    #dao

    constructor(dao) {
        this.#dao = dao
    }


    async guardar(chat) {
        try {
            const resul = await this.#dao.save(chat.datos())
            return resul
        } catch(error) {
            return error
        }
    }

  async listadoChat(){
    try {
        const dtos = await this.#dao.getAll()

        if(dtos != []){
           const datos = dtos.map(dto => new Chat(dto))
           return datos
        } else 
           return null
    } catch (error) {
        return error
    }
  }
}
