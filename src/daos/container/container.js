

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
            return data[0].toString()
        }
       catch(error){
        return error
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
            return error
        } 
    
    }

  }



 export {Contenedor};
