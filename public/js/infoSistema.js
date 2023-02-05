const form = document.getElementById('infoSistema');


fetch('http://localhost:8080/info', {method:'GET'})
  .then(response => response.json())
  .then(data =>    {    
    document.getElementById('infoSistema').innerHTML = `<div><h1><b>INFORMACIÓN DEL SISTEMA</b><h1></div>`;
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<h4>Argumentos de Entrada:</h4>`);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<td> ${data["Argumentos de Entrada"][0]}</td> <br>`);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<td>  ${data["Argumentos de Entrada"][1]}</td> `);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<h4>Sistema Operativo:</h4>`);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<td>  ${data["Sistema Operativo"]}</td> `);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<h4>Version NodeJS:</h4>`);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<td>  ${data["version node:"]}</td> `);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<h4>Memoria Reservada:</h4>`);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<td>  ${data["Memoria reservada"]}</td> `);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<h4>Path de Ejecución:</h4>`);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<td>  ${data["Path de Ejecución"]}</td> `);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<h4>Process Id:</h4>`);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<td>  ${data["Process Id"]}</td> `);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<h4>Directorio Actual de Trabajo:</h4>`);
    document.getElementById('infoSistema').insertAdjacentHTML('beforeend',  `<td>  ${data["Directorio Actual de Trabajo"]}</td> `);
    }
    )