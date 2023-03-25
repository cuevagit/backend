import { mongoDatabase } from '../db/mongoClient.js';


class ContainerMongodb{

    coleccion;

    constructor(nombreColeccion) {
        this.coleccion = mongoDatabase.collection(nombreColeccion);
    }

    

    async save(objeto){
 
        try {
            await this.coleccion.insertOne(objeto)
            return 'Id del objeto guardado: ' + this.coleccion._id
        } 
        catch (error){
            return error
        } 

      }



     async getAll(){

        try {

            const objetoBuscado = await this.coleccion.find({}).toArray()

            if(objetoBuscado == []){
                return null
            }else{
                return objetoBuscado;
            }
            
        }

        catch(error){
            return error
        } 

    }


    async deleteById(objeto){
        
        try {

         const objetoBorrado = await this.getById(objeto._id)

         if(objetoBorrado){ 
            try {
                await this.coleccion.deleteOne({_id: objeto._id})
                return objetoBorrado
            } catch (error) {
                return error
            }
          } else {
            return {"mensaje": `no se encontró producto con ese id (${objeto._id})`};
          }
        }

        catch(error){
            return error
        } 

    }

    


    async update(objeto){

       const objetoActualizar = await this.getById(objeto._id)

      if(objetoActualizar){ 
        try {
            await this.coleccion.updateMany({_id: objeto._id}, {$set: {"title": objeto.title, "price": objeto.price, "thumbnail": objeto.thumbnail}})
            return objetoActualizar;
        }
        catch(error){
            return error
        } 
    } else {
        return {"mensaje": `no se encontró producto con ese id (${objeto._id})`};
      }

    }


    async getById(id){
       
        try {

            const objetoBuscado = await this.coleccion.find({_id: id}).toArray()

            if(objetoBuscado[0]===undefined){
                return null
            }else{
                return objetoBuscado[0];
            }
            
        }

        catch(error){
            error => { throw error}
        } 

     }

 }





 export {ContainerMongodb};
