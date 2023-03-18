import {PERSISTENCIA} from '../../../config/config.js'
import { product } from './product.js'

let Products

switch (PERSISTENCIA) {
    case 'fs':
        const {Container} = await import('../../../daos/container/containerArchivo.js')     
        const dao_fs = new Container('productos.txt')
        Products = new product(dao_fs)
        break
    case 'mongodb':
        const {ContainerMongodb} = await import('../../../daos/container/containerMongodb.js')     
        const dao_mongodb = new ContainerMongodb('productos');
        Products = new product(dao_mongodb)
        break  
    case 'relacional':
        const {BDRELACIONAL} = await import('../../../config/config.js')
        const {Contenedor} = await import('../../../daos/container/container.js') 
        let dao_relacional
        if(BDRELACIONAL == 'mysql'){
            const { clienteSql } = await import('../../../daos/db/clienteSql.js')
            dao_relacional = new Contenedor(clienteSql, 'productos');
        } else {
            const { clienteSqlLite3 } = await import('../../../daos/db/clienteSql.js')
            dao_relacional = new Contenedor(clienteSqlLite3, 'productos');
        }
        Products = new product(dao_relacional)
        break  
}


export { Products } 