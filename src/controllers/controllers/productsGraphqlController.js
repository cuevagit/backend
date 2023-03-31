import {productService} from '../../negocio/services/product.service.js'
import {randomUUID}  from 'crypto';


export async function listarProducto() {

    const resul = await productService.listarProducto()

  if(resul){
    if(resul.message){
        return resul.message
    } else{
        return resul
    }
  } else
        return "No hay productos"
}

export async function listarProductoPorId(objeto) {
    
    const resul = await productService.listarProductoPorId(objeto)

   if(resul){
    if(resul.message){
        return resul.message
    } else{
        return resul
    }
   } else
      return `No existe el producto con el ID ${objeto._id}`

}

export async function grabarProducto({ datos }) {
    
    datos._id = randomUUID();

    const existe = await productService.listarProductoPorId(objeto)

    if(!existe) {
        return `No existe el producto con el ID ${objeto._id}`
    }

    
    const resul = await productService.grabarProducto(datos)

    if(resul.message){
        return resul.message
    } else{
        return resul
    }
}

export async function actualizarProducto({ _id, datos }) {

    datos._id = _id
  
    const resul = await productService.actualizarProducto(datos)

    if(resul.message){
        return resul.message
    } else{
        return resul
    }

}

export async function eliminarProducto({ _id }) {

    const existe = await productService.listarProductoPorId(_id)


  if(existe){
    
    const resul = await productService.eliminarProducto(_id)

    if(resul.message){
        return resul.message
    } else{
        return resul
    }
  } else 
  return `No existe el producto con el ID ${_id}`

}
