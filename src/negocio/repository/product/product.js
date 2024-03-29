import Productos from '../../models/product.js'
import ContenedorFaker from '../../../daos/container/containerFaker.js'


export class product {

    #dao
    constructor(dao) {
        this.#dao = dao
    }

    
    async grabarProducto(producto) {
        try {
            const resul = await this.#dao.save(producto.datos())
            return resul
        } catch(error) {
            return error
        }
    }

    async listarProducto() {
        try {
            const dtos = await this.#dao.getAll()

          if(dtos !== []){
            const datos = dtos.map(dto => new Productos(dto))
            return datos
          } else 
            return null

        } catch (error) {
            return error
        }
    }



    async actualizarProducto(producto) {
        try {
            const resul = await this.#dao.update(producto.datos())
            return resul
        } catch(error) {
            return error
        }
    }


    async eliminarProducto(producto) {
        try {
            const resul = await this.#dao.deleteById(producto.datos())
            return resul
        } catch(error) {
            return error
        }
    }


    async productosFaker(objeto) {
        const productosFaker = new ContenedorFaker(objeto)
        const listadoProductoFaker = await productosFaker.getProductosTest();
        return listadoProductoFaker
    }


    async listarProductoPorId(objeto) {
        try {
            const dtos = await this.#dao.getById(objeto._id)

         if(dtos){
            const datos = new Productos(dtos)
            return datos
          } else 
            return null

        } catch (error) {
            return error
        }
    }

}

