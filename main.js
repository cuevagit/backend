const productos = [];

class Contenedor{

    #id;
    #title;
    #price;
    #thumbnail;
 

    constructor(id, title, price, thumbnail) {
        this.id = id;
        this.title = title;
        this.price = parseFloat(price);
        this.thumbnail = thumbnail;
    }
    

    save(id, title, price, thumbnail){
        this.#id = id;
        this.#title = title;
        this.#price = price;
        this.#thumbnail = thumbnail;

        productos.push(new Contenedor(this.#id, this.#title, this.#price, this.#thumbnail))
    }

    getById(id){
      const objetoBuscado = productos.find((p)=>p.id===id)
      if(objetoBuscado===undefined){
          return null
      }else{
          return objetoBuscado
      }
     }

     getAll(){
        return productos
    }

    deleteById(id){
        for (let i=0;i<productos.length;i++){
            if (productos[i].id===id){
                productos.splice(i, 1)
            }
        }
    }

    deleteAll(){
        productos.splice(0, productos.length+1)
    }

  }


  const prodTest = new Contenedor
  
  console.log('Guarda datos (método save)')
  prodTest.save(1, '111', 300, './img/22lr.png')
  prodTest.save(2, '111', 250, './img/308.png')
  console.log(productos)

  console.log('Devuelve el elemento con id')
  console.log(prodTest.getById(2))

  console.log('Retorno array con todos sus elementos')
  console.log(prodTest.getAll())

  console.log('Elimino producto del array con id=1')
  prodTest.deleteById(1)
  console.log(productos)

  console.log('Elimino todos los elementos del array')
  prodTest.deleteAll()
  console.log(productos)