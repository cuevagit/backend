

class Contenedor{

    cliente;
    tabla;

    constructor(cliente, tabla) {
        this.cliente = cliente;
        this.tabla = tabla;
    }



//PRODUCTOS Y CHAT

    async save(objeto){
 
        try {
            const data = await this.cliente(this.tabla).insert(objeto);
            return data[0]
        }
       catch(error){
            error => { throw error}
        } 

      }


    async getById(id){
       
        try {

            const objetoBuscado = await this.cliente(this.tabla).select().where("id", "=", id)
            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }
            
        }

        catch(error){
            error => { throw error}
        } 

     }


     async getAll(){
    
        try {
            const contenido = await this.cliente(this.tabla).select();
    
                if(contenido) { 
                 return contenido
                } else { 
                 return null
                }
            }
    
        catch(error){
            error => { throw error}
        } 
    
    }
    

    async deleteById(id){
        try {
          if(this.getById(id)){ 
            const objetoBuscado = await this.cliente(this.tabla).del().where("id", "=", id)
            return objetoBuscado
          } else {
            return 'No existe el producto con el id: ' + id
          }
        }
        catch(error){
            error => { throw error}
        } 
    }

    async deleteAll(){

        try {
            const objetoBuscado = await this.cliente(this.tabla).del()
            return objetoBuscado
        }
        catch(error){
            error => { throw error}
        } 

    }

    async update(objeto){
        try {
          if(this.getById(objeto.id)){ 
            await this.cliente(this.tabla).update(objeto).where("id", "=", objeto.id);
            return objeto;
        } else {
            return 'No existe el producto con el id: ' + objeto.id
        }
         
        }
        catch(error){
            error => { throw error}
        } 
    }
    

  }



 export  default Contenedor;
