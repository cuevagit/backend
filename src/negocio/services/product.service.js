import Productos from '../models/product.js'
import Contenedor from '../../container/container.js'
import ContenedorFaker from '../../container/containerFaker.js'
import { clienteSql } from '../../db/clienteSql.js';


class ProductService {

    async grabarProducto(objeto) {
        const productos = new Productos(objeto);
        const registroProducto = await productos.guardar(objeto)
        return registroProducto
    }

    async listarProducto() {
        const contenedor = new Contenedor(clienteSql, 'productos');
        const listadoProducto = await contenedor.getAll()
        return listadoProducto
    }

    async productosFaker(objeto) {
        const productosFaker = new ContenedorFaker(objeto)
        const listadoProductoFaker = await productosFaker.getProductosTest();
        return listadoProductoFaker
    }

}

export const productService = new ProductService()