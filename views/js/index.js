  mostrar_productos()

   document.getElementById("modificar").style.display = 'none'


  async function mostrar_productos(){


  const graphqlQueryGet = {
      "query": `query { listarProducto {_id, title, price, thumbnail} }`
  };


  await fetch('http://localhost:8080/graphql', 
    {method:'POST',          
     body: JSON.stringify(graphqlQueryGet),
     headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}})
  .then(response => response.json())
  .then(data =>    {
    document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<div id="tablaproductos"><strong>PRODUCTOS</strong></div>`);
    document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<td><b>Nombre:</b></td> <td><b>Precio: </b> </td> <td><b>Imágen</b></td>`);
     
    
     data.data.listarProducto.forEach(data => {
      let id2 = data._id + '2'
      
        document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<td> ${data.title}</td> <td width="100px"> $ ${data.price}</td> <td><img width="70px" src=" ${data.thumbnail}"></td> <td><Button id=${data._id} className="botoneliminar">Eliminar</Button></td> <td><Button id=${id2} className="botoneditar">Editar</Button></td>`);

      let botoneliminar = document.getElementById(data._id)

      const graphqlQueryDelete = {
        "query": `mutation { eliminarProducto(_id: {_id: \"${data._id}\"}) {_id, title, price, thumbnail} } `
    };

      botoneliminar.addEventListener('click', async(e) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/graphql`, {
          method: "POST",
          body: JSON.stringify(graphqlQueryDelete),
          headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
        })
        location.reload();

      })


      let botoneditar = document.getElementById(id2)
      botoneditar.addEventListener('click', async(e) => {
        document.getElementById("modificar").style.display = ''

        e.preventDefault();

        const graphqlQueryGetById = {
          "query": `query { listarProductoPorId(_id: \"${data._id}\") {_id, title, price, thumbnail} }  `
      };

      
        await fetch(`http://localhost:8080/graphql`, 
        {method:'POST',          
        body: JSON.stringify(graphqlQueryGetById),
        headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}})
        .then(response => response.json())
        .then(data =>    {
          elementoelegido = data.data.listarProductoPorId._id,
          document.getElementById('title').value = data.data.listarProductoPorId.title,
          document.getElementById('price').value = data.data.listarProductoPorId.price,
          document.getElementById('miArchivo').value = data.data.listarProductoPorId.thumbnail
      })
      location.reload();

     });
    });
   }
  )
}

    let botonmodificar = document.getElementById("modificar")
    botonmodificar.addEventListener('click', async(e) => {
      e.preventDefault();

      let thumbnail = document.getElementById('miArchivo').value
      thumbnail = thumbnail.replace("C:\\fakepath\\", "../uploads/")

      const objeto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: thumbnail
      }

      const graphqlQueryPut = {
        "query": `mutation { actualizarProducto(_id: \"${elementoelegido}\", datos: {title: \"${objeto.title}\", price: ${objeto.price}, thumbnail: \"${thumbnail}\"}) {_id, title, price, thumbnail} }  `
    };


      await fetch(`http://localhost:8080/graphql`, {
        method: "POST",
        body: JSON.stringify(graphqlQueryPut),
        headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
      })

      location.reload();

    })

 
 
const form = document.getElementById('formulario');
const boton = document.getElementById("enviar")

boton.onclick = async(e) => {
  e.preventDefault();

  const title = document.getElementById('title').value
  const price = document.getElementById('price').value
  let thumbnail = document.getElementById('miArchivo').value
  thumbnail = thumbnail.replace("C:\\fakepath\\", "../uploads/")

  const producto = {
    title: title,
    price: price,
    thumbnail: thumbnail
  }


  const graphqlQueryPost = {
    "query": `mutation { grabarProducto(datos: {title: \"${producto.title}\", price: ${producto.price}, thumbnail: \"${thumbnail}\"}) {_id, title, price, thumbnail} } `
};

  await fetch('http://localhost:8080/graphql', {
    method: "POST",
    body: JSON.stringify(graphqlQueryPost),
    headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
  })
  location.reload();
};


const input = document.getElementById('miArchivo')


input.addEventListener('change', () => {
  uploadFile(input.files[0])
})


const uploadFile = file => {
  const fd = new FormData()
  fd.append('miArchivo', file)


  fetch('http://localhost:8080/api/productos/imagenes', {
    method: 'POST',
    body: fd
  })
}


form.reset



