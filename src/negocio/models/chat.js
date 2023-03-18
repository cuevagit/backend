import { ChatDto } from "../dtos/chatsDTO.js"


class Chat{

    #id
    #author
    #fecha
    #text

    constructor({ id, author, fecha, text  }) {
        this.#id = id
        this.#author = author
        this.#fecha = fecha
        this.#text = text
    }

    get id() { return this.#id }

    get email() { return this.#author.email }

    get nombre() { return this.#author.nombre }

    get apellido() { return this.#author.apellido }

    get edad() { return this.#author.edad }

    get alias() { return this.#author.alias }

    get avatar() { return this.#author.avatar }

    get fecha() { return this.#fecha }

    get mensaje() { return this.#text }



      datos() {
        return new ChatDto({
            id: this.#id, 
            author: this.#author,
            fecha: this.#fecha, 
            text: this.#text         
        })
    }

 }



 export default Chat;
