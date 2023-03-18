import Productos from '../models/product.js'
import { Products } from '../repository/product/index.js';
import ContenedorFaker from '../../daos/container/containerFaker.js'


class ProductService {

    async grabarProducto(objeto) {
        try {
            const product = new Productos(objeto);
            const registroProduct = await Products.grabarProducto(product)
            return registroProduct  
        } catch (error) {
            return error
        }
    }

    async listarProducto() {
        try {
                const listadoProducts = await Products.listarProducto()
                const products = []
                listadoProducts.forEach(d => {
                    products.push(d.datos())
                });
                return products
        } catch (error) {
            return error
        }
    }
    

    async productosFaker(objeto) {
        const productosFaker = new ContenedorFaker(objeto)
        const listadoProductoFaker = await productosFaker.getProductosTest();
        return listadoProductoFaker
    }

}

export const productService = new ProductService()