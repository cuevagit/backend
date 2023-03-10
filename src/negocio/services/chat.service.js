import Chat from '../models/chat.js'
import Container from '../../container/containerArchivo.js'


class ChatService {
    
    async grabarChat(objeto) {
        const chat = new Chat(objeto);
        const registroChat = await chat.guardar(objeto)
        return registroChat
    }

    async listarChat() {
        const contenedor = new Container('chat.txt');
        const listadoChat = await contenedor.getAll()
        return listadoChat
    }

}

export const chatService = new ChatService()