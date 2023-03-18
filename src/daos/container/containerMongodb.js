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

            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }
            
        }

        catch(error){
            return error
        } 

    }


 }





 export {ContainerMongodb};
