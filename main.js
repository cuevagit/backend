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
        productos.push(new Contenedor(id, title, price,thumbnail))
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


  console.log('Guarda datos (método save)')
  const prodPrueba = new Contenedor
  prodPrueba.save(1, '111', 300, './img/22lr.png')
  prodPrueba.save(2, '111', 250, './img/308.png')
  console.log(productos)

  console.log('Devuelve el elemento con id')
  console.log(prodPrueba.getById(2))

  console.log('Retorno array con todos sus elementos')
  console.log(prodPrueba.getAll())

  console.log('Elimino producto del array con id=1')
  prodPrueba.deleteById(1)
  console.log(productos)

  console.log('Elimino todos los elementos del array')
  prodPrueba.deleteAll()
  console.log(productos)