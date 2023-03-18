//import Contenedor from "../../container/container.js"
//import { clienteSql } from '../../db/clienteSql.js';
import { ProductDto } from "../dtos/productsDTO.js"


//const contenedor = new Contenedor(clienteSql, "productos")


class Productos{

    #id
    #title
    #price
    #thumbnail

    constructor({ id, title, price, thumbnail }) {
        this.#id = id
        this.#title = title
        this.#price = price
        this.#thumbnail = thumbnail
    }

    get id() { return this.#id }

    get title() { return this.#title }

    get price() { return this.#price }

    get thumbnail() { return this.#thumbnail }



    async guardar(objeto){
        const resul = await contenedor.save(objeto)
        return resul
       } 


       datos() {
        return new ProductDto({
            id: this.#id,  
            title: this.#title,  
            price: this.#price,  
            thumbnail: this.#thumbnail      
        })
      }

    }

  

 export default Productos;