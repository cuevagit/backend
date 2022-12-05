import fs from 'fs';

class Container{

    #productos;
    #cart;
    #filename;

    constructor(filename) {
        this.#productos = [];
        this.#cart = [];
        this.#filename = filename;
    }



    //PRODUCTOS

    async save(objeto){
 
        try {
           if(await this.getAll())
            this.#productos = await this.getAll()
        } 
        catch (error){
            this.#productos = [];
            error => { throw error}
        } 

        try {
            this.#productos.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos, null, 2))
            return 'Id del objeto guardado: ' + this.#productos[this.#productos.length - 1].id
        }
        catch(error){
            error => { throw error}
        } 

      }


    async getById(id){
       
        try {
            this.#productos = await this.getAll()

            const objetoBuscado = this.#productos.find((p)=>p.id===id)

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
            const contenido = JSON.parse(await fs.promises.readFile(this.#filename, 'UTF-8'))

                if(contenido) { 
                 this.#productos = contenido
                 return this.#productos
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
            this.#productos = await this.getAll()
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos.filter(p => p.id !== id), null, 2))
            return this.#productos.filter(p => p.id == id)
        }
        catch(error){
            error => { throw error}
        } 
    }


    async update(objeto){
        try {
            await fs.promises.writeFile(this.#filename, JSON.stringify(objeto, null, 2))
            return objeto;
        }
        catch(error){
            error => { throw error}
        } 
    }



    //CARRITO

    async save_cart(objeto){
 
        try {
           if(await this.getAll())
            this.#cart = await this.getAll()
        } 
        catch (error){
            this.#cart = [];
            error => { throw error}
        } 

        try {
            this.#cart.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#cart, null, 2))
            return 'Id del objeto guardado: ' + this.#cart[this.#cart.length - 1].id
        }
        catch(error){
            error => { throw error}
        } 

      }

      
      async save_products(objeto){
        try {
            await fs.promises.writeFile(this.#filename, JSON.stringify(objeto, null, 2))
            return objeto;
        }
        catch(error){
            error => { throw error}
        } 
    }


    async getByIdCart(id){
       
        try {
            this.#cart = await this.getAll()

            const objetoBuscado = this.#cart.find((p)=>p.id===id)

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


     async deleteByIdCart(id){
        try {
            this.#cart = await this.getAll()
            this.#cart[id].productos = []
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#cart, null, 2))
            return this.#cart[id]
        }
        catch(error){
            error => { throw error}
        } 
    }

    async deleteByIdProd(indice_cart, indice_prod){
        try {
            this.#cart = await this.getAll()
            const eliminado = this.#cart[indice_cart].productos.splice(indice_prod, 1)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#cart, null, 2))
            return eliminado
        }
        catch(error){
            error => { throw error}
        } 
    }



    async getAllCart(){

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.#filename, 'UTF-8'))

                if(contenido) { 
                 this.#cart = contenido
                 return this.#cart
                } else { 
                 return null
                }
            }

        catch(error){
            error => { throw error}
        } 

    }



  }



 export default Container;
