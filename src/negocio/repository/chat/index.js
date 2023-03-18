import {PERSISTENCIA} from '../../../config/config.js'
import { chat } from './chat.js'


let Chats


switch (PERSISTENCIA) {
    case 'fs':
        const {Container} = await import('../../../daos/container/containerArchivo.js')     
        const dao_fs = new Container('chat.txt')
        Chats = new chat(dao_fs)
        break
    default:   //mongodb
        const {ContainerMongodb} = await import('../../../daos/container/containerMongodb.js')     
        const dao_mongodb = new ContainerMongodb('chat');
        Chats = new chat(dao_mongodb)
        break  
}


export { Chats } 
