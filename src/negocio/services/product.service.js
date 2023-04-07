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
                if(listadoProducts[0]){
                    const products = []
                    listadoProducts.forEach(d => {
                        products.push(d.datos())
                    });
                    return products
                } else
                    return {mensaje: "No hay productos"}
        } catch (error) {
            return error
        }
    }


    async actualizarProducto(objeto) {
        try {
            const product = new Productos(objeto);
            const updateProduct = await Products.actualizarProducto(product)
            return updateProduct  
        } catch (error) {
            return error
        }
    }
    

    async eliminarProducto(objeto) {
        try {
            const product = new Productos(objeto);
            const deleteProduct = await Products.eliminarProducto(product)
            return deleteProduct  
        } catch (error) {
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
            const producto = await Products.listarProductoPorId(objeto)
            if(producto)
             return producto.datos()
            else 
             return {mensaje: `No existe el producto con el id: ${objeto._id}`}
        } catch (error) {
            return error
        }
    }



}

export const productService = new ProductService()