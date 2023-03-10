import Contenedor from "../../container/container.js"
import { clienteSql } from '../../db/clienteSql.js';


const contenedor = new Contenedor(clienteSql, "productos")


class Productos{

    constructor({ id, title, price, thumbnail }) {
        this._id = id
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
    }


    async guardar(objeto){
        const resul = await contenedor.save(objeto)
        return resul
       } 
    }

  



 export default Productos;
