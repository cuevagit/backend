
class Contenedor{

    #productos;
    constructor() {
        this.#productos = []
   }
    

    save(id, title, price, thumbnail){
        let objeto =  { id: id, title: title, price: price, thumbnail: thumbnail };
        this.#productos.push(objeto)
    }

    getById(id){
      const objetoBuscado = this.#productos.find((p)=>p.id===id)
      if(objetoBuscado===undefined){
          return null
      }else{
          return objetoBuscado
      }
     }

     getAll(){
        return this.#productos
    }

    deleteById(id){
        for (let i=0;i<this.#productos.length;i++){
            if (this.#productos[i].id===id){
                this.#productos.splice(i, 1)
            }
        }
    }

    deleteAll(){
        this.#productos.splice(0, this.#productos.length+1)
    }

  }


  const prodTest = new Contenedor
  
  console.log('Guarda datos (método save)')
  prodTest.save(1, '111', 300, './img/22lr.png')
  prodTest.save(2, '111', 250, './img/308.png')

  console.log('Devuelve el elemento con id')
  console.log(prodTest.getById(2))

  console.log('Retorno array con todos sus elementos')
  console.log(prodTest.getAll())

  console.log('Elimino producto del array con id=1')
  prodTest.deleteById(1)

  console.log('Elimino todos los elementos del array')
  prodTest.deleteAll()
