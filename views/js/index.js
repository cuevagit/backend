  mostrar_productos()

  
  function mostrar_productos(){


  fetch('http://localhost:8080/api/productos', {method:'GET'})
  .then(response => response.json())
  .then(data =>    {
    document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<div id="tablaproductos"><strong>PRODUCTOS</strong></div>`);
    document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<td><b>Nombre:</b></td> <td><b>Precio: </b> </td> <td><b>Imágen</b></td>`);
     
    
    
     data.forEach(data => {
      let id2 = data._id + '2'
      
        document.getElementById('tablaproductos').insertAdjacentHTML('beforeend', `<td> ${data.title}</td> <td width="100px"> $ ${data.price}</td> <td><img width="70px" src=" ${data.thumbnail}"></td> <td><Button id=${data._id} className="botoneliminar">Eliminar</Button></td> <td><Button id=${id2} className="botoneditar">Editar</Button></td>`);

      let botoneliminar = document.getElementById(data._id)
      botoneliminar.addEventListener('click', async(e) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/api/productos/${data._id}`, {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
        })
        location.reload();

      })


      let botoneditar = document.getElementById(id2)
      botoneditar.addEventListener('click', async(e) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/api/productos/${data._id}`, {method: "GET"})
        .then(response => response.json())
        .then(data =>    {
          elementoelegido = data._id,
          document.getElementById('title').value = data.title,
          document.getElementById('price').value = data.price,
          document.getElementById('thumbnail').value = data.thumbnail
      })

      document.getElementById("modificar").style.display = ''

     });
    });
   }
  )
}

    let botonmodificar = document.getElementById("modificar")
    botonmodificar.addEventListener('click', async(e) => {
      e.preventDefault();

      const objeto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
      }

      await fetch(`http://localhost:8080/api/productos/${elementoelegido}`, {
        method: "PUT",
        body: JSON.stringify(objeto),
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
  const thumbnail = document.getElementById('thumbnail').value

  const producto = {
    title: title,
    price: price,
    thumbnail: thumbnail
  }


  await fetch('http://localhost:8080/api/productos', {
    method: "POST",
    body: JSON.stringify(producto),
    headers: {"Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*"}
  })
  location.reload();
};

form.reset



