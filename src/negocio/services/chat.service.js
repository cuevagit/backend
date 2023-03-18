import Chat from '../models/chat.js'
import { Chats } from '../repository/chat/index.js';


class ChatService {
    
    async grabarChat(objeto) {
        try {
            const chat = new Chat(objeto);
            const registroChat = await Chats.guardar(chat)
            return registroChat  
        } catch (error) {
            return error
        }
    }

    async listarChat() {
        try {
            const listadoChat = await Chats.listadoChat()
            const chat = []
            listadoChat.forEach(d => {
                chat.push(d.datos())
            });
            return chat
        } catch (error) {
            return error
        }
    }

}

export const chatService = new ChatService()