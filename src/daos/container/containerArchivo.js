import fs from 'fs';


class Container {

    #productos;
    #filename;

    constructor(filename) {
        this.#productos = [];
        this.#filename = filename;
    }



    //PRODUCTOS

    async save(objeto) {

         try {
             this.#productos = await this.getAll()
          } catch (error) {
            return error
          }

          if(!this.#productos[0]){
            this.#productos = [];
            await fs.promises.appendFile(this.#filename, JSON.stringify(this.#productos, null, 2)) 
          }


        try {
            this.#productos.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos, null, 2))
            return 'Id del objeto guardado: ' + this.#productos[this.#productos.length - 1].id
        }
        catch (error) {
            return error
        }
    }




    async getAll() {

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.#filename, 'UTF-8'))
            if (contenido) {
                this.#productos = contenido
                return this.#productos
            } else {
                return null
            }
        }

        catch (error) {
            return error
        }

    }



    async deleteById(objeto) {

        const encontrado = await this.getById(objeto._id)

        if (encontrado == null) {
            return { "mensaje": `no se encontró producto con ese id (${objeto._id})` };
        } else {
            try {
                this.#productos = await this.getAll()
                await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos.filter(p => p._id !== objeto._id), null, 2))
                return this.#productos.filter(p => p._id == objeto._id)[0]
            }
            catch (error) {
                return error
            }
        }
    }




    async update(objeto) {

        const productos = await this.getAll();

        const encontrado = this.#productos.findIndex((p) => p._id === objeto._id)


        if (encontrado === -1) {
            return { "mensaje": `no se encontró producto con ese id (${objeto._id})` };
        } else {
            try {
                productos[encontrado] = objeto;
                await fs.promises.writeFile(this.#filename, JSON.stringify(productos, null, 2))
                return objeto;
            }
            catch (error) {
                return error
            }
        }
    }


    async getById(id) {

        try {
            this.#productos = await this.getAll()

            const elementoBuscado = this.#productos.find((p) => p._id === id)

            if (!elementoBuscado) {
                return null
            } else {
                return elementoBuscado;
            }

        }

        catch (error) {
            return error
        }

    }


}






export { Container };
