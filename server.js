const fs = require("fs");
const express = require('express')

const servidor = express()


class Contenedor{

    #productos;
    #filename;

    constructor(filename) {
        this.#productos = [];
        this.#filename = filename;
   }


    async save(objeto){
 
       let id

        try {
            this.#productos = await this.getAll()
        } 
        catch (error){
            throw("El archivo no existe o está vacío")
        } 

        if(this.#productos.length > 0)
           id = this.#productos[this.#productos.length - 1].id + 1
        else
            id = 1


        try {
            objeto.id = id
            this.#productos.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos, null, 2))
            return 'Id del objeto guardado: ' + this.#productos[this.#productos.length - 1].id
        }
        catch(error){
            throw("Hubo un error: " + error)
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
            throw("Hubo un error: " + error)
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
            throw("Hubo un error: " + error)
        } 

    }


    async deleteById(id){
        try {
            this.#productos = await this.getAll()
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos.filter(p => p.id !== id), null, 2))
        }
        catch(error){
            throw("Hubo un error: " + error)
        } 
    }

    async deleteAll(){

        this.#productos = []

            try {
                await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos), null, 2)
            }
            catch(error){
                throw("Hubo un error: " + error)
            } 

    }

  }

  const prodTest = new Contenedor('productos.txt')

  function getAleatorio() {
    return Math.floor(Math.random()*3) + 1
  }

   servidor.get('/productos', async (peticion, respuesta) => {
       respuesta.send(await prodTest.getAll())
  })


   servidor.get('/productosRandom', async (peticion, respuesta) => {
    respuesta.send(await prodTest.getById(getAleatorio()))
  })


  function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = servidor.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
  }

  module.exports = { conectar }


  //FUNCIÓN PARA CARGAR DATOS
    async function ejecutar() {  
        console.log('Guarda datos (método save)')
        console.log(await prodTest.save({title: 'Balas Calibre 22lr', price: 300, thumbnail: './img/22lr.png'}));
        console.log(await prodTest.save({title: 'Balas Calibre 308', price: 400, thumbnail: './img/308.png'})); 
        console.log(await prodTest.save({title: 'Cartuchos Calibre 1270', price: 500, thumbnail: './img/1270.png'})); 

        console.log('Retorno array con todos sus elementos')
        console.log(await prodTest.getAll())

        console.log('Devuelve el elemento con id=1')
        console.log(await prodTest.getById(1));

        console.log('Elimino producto del array con id=2')
        await prodTest.deleteById(2)
        console.log(await prodTest.getAll())

        ///////////////////////////////////////////////////////////////////////////////////////
        //Esto comentarlo para no eliminar todo, solo descomentarlo en caso de así requerirlo//
        ///////////////////////////////////////////////////////////////////////////////////////
         console.log('Elimino todos los elementos del array')
         await prodTest.deleteAll()
         console.log(await prodTest.getAll())
    }

  //ejecutar();

  











