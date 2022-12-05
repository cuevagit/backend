//import { clienteSql as knex } from './clienteSql.js'
import { clienteSqlLite3 as knex } from './clienteSql.js'


function createTables(){
knex.schema.hasTable('productos')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('productos', tabla => {
                tabla.increments('id'),
                    tabla.string('title'),
                    tabla.integer('price'),
                    tabla.string('thumbnail')
            })
                .then(() => {
                    console.log('tabla "productos" creada!')
                })
        } else {
            console.log('la tabla "productos" ya existe. no se realizaron cambios')
        }
    })
  

    knex.schema.hasTable('chat')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('chat', tabla => {
                tabla.increments('id'),
                    tabla.string('fecha'),
                    tabla.string('email'),
                    tabla.string('mensaje')
            })
                .then(() => {
                    console.log('tabla "chat" creada!')
                })
        } else {
            console.log('la tabla "chat" ya existe. no se realizaron cambios')
        }
    })

}

export default createTables;