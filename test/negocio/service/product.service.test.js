import axios from 'axios'
import assert from 'node:assert'
import { conectar, desconectar } from '../../../src/controllers/server.js'
import {productService} from '../../../src/negocio/services/product.service.js'



axios.defaults.baseURL = 'http://localhost:8080/api/productos'

describe('pruebo mi servicio de productos', () => {
    // antes de TODAS las pruebas
    before(async () => {
        await conectar()
    })

    // dsp de TODAS las pruebas
    after(async () => {
        await desconectar()
    })


        //Post de Productos
        it('grabación de un producto', async () => {

            const productoPrueba = "Rifle Aire Comprimido Ejemplo"
            const pricePrueba = 2000
            const thumbnailPrueba = "https://cdn.glitch.global/0e3ab45b-a006-4d79-9868-f7eb1f99b246/mossberg.png?v=1667993087620"

            const { data: resultado, status } = await axios.post('/', {
                title: productoPrueba,
                price: pricePrueba,
                thumbnail: thumbnailPrueba
            })

            assert.strictEqual(status, 201)
            if (!resultado._id) throw new Error('el producto creado no tiene id')
            if(!productoPrueba) throw new Error('No tiene valor el campo titulo')
            if(!pricePrueba) throw new Error('No tiene valor el campo precio')
            if(!thumbnailPrueba) throw new Error('No tiene valor el campo imagen')
            assert.strictEqual(resultado.title, productoPrueba)
            assert.strictEqual(resultado.price, pricePrueba)
            assert.strictEqual(resultado.thumbnail, thumbnailPrueba)
            if (typeof resultado._id !== 'string') throw new Error('el producto creado tiene un id con tipo no string')
            if (typeof resultado.title !== 'string') throw new Error('el producto creado tiene un titulo con tipo no string')
            if (typeof resultado.price !== 'number') throw new Error('el producto creado tiene un precio con tipo no entero')
            if (typeof resultado.thumbnail !== 'string') throw new Error('el producto creado tiene una url de imagen con tipo no string')

            // console.log(resultado)

        })


        //PUT de Productos
        it('actualización de un producto', async () => {

            const id = '8bbff93a-afc7-451e-9f7a-4af39694f01f'

            const productoPrueba = "Rifle Aire Comprimido PCP"
            const pricePrueba = 3000
            const thumbnailPrueba = "https://cdn.glitch.global765d71ff-6dd3-492d-869e-2e3746eb541b/0e3ab45b-a006-4d79-9868-f7eb1f99b246/mossberg.png?v=1667993087620"


           const { data: resultado, status } = await axios.put(`/${id}`, {
                "title": productoPrueba,
                "price": pricePrueba,
                "thumbnail": thumbnailPrueba            
            })


           const existe =  await productService.listarProductoPorId({"_id": id})

           assert.strictEqual(status, 200)
           if (!id) throw new Error('el id del producto a actualizar no tiene valor')
           if (!existe) throw new Error('el producto a actualizar no existe')
           if(!resultado._id) throw new Error('No tiene valor el campo ID')
           if(!productoPrueba) throw new Error('No tiene valor el campo titulo')
           if(!pricePrueba) throw new Error('No tiene valor el campo precio')
           if(!thumbnailPrueba) throw new Error('No tiene valor el campo imagen')
           assert.strictEqual(resultado.title, productoPrueba)
           assert.strictEqual(resultado.price, pricePrueba)
           assert.strictEqual(resultado.thumbnail, thumbnailPrueba)
           if (typeof resultado._id !== 'string') throw new Error('el producto tiene un id con tipo no string')
           if (typeof resultado.title !== 'string') throw new Error('el producto tiene un titulo con tipo no string')
           if (typeof resultado.price !== 'number') throw new Error('el producto tiene un precio con tipo no entero')
           if (typeof resultado.thumbnail !== 'string') throw new Error('el producto tiene una url de imagen con tipo no string')

        })


        
    //DELETE de Productos
    it('eliminación de un producto', async () => {

        const id = '8bbff93a-afc7-451e-9f7a-4af39694f01f'

        const existe =  await productService.listarProductoPorId({"_id": id})

        const { data: resultado, status } = await axios.delete(`/${id}`)


        assert.strictEqual(status, 200)
        if (!id) throw new Error('el id del producto a eliminar no tiene valor')
        if (!existe) throw new Error('el producto a eliminar no existe')
        if(!resultado._id) throw new Error('No tiene valor el campo ID')
        if(!resultado.title) throw new Error('No tiene valor el campo titulo')
        if(!resultado.price) throw new Error('No tiene valor el campo precio')
        if(!resultado.thumbnail) throw new Error('No tiene valor el campo imagen')
        if (typeof resultado._id !== 'string') throw new Error('el producto tiene un id con tipo no string')        
        if (typeof resultado.title !== 'string') throw new Error('el producto tiene un titulo con tipo no string')
        if (typeof resultado.price !== 'number') throw new Error('el producto tiene un precio con tipo no entero')
        if (typeof resultado.thumbnail !== 'string') throw new Error('el producto tiene una url de imagen con tipo no string')

    })



        //GET de Productos 
        it('ver todos los productos', async () => {

            const { data: resultado, status } = await axios.get(`/`)
           // console.log(resultado)
    
            assert.strictEqual(status, 200)
            if (!resultado) throw new Error('no existen productos')
            resultado.forEach(resultado => {
                if(!resultado._id) throw new Error(`El producto: ${resultado.title} no tiene valor en el campo ID`)
                if(!resultado.title) throw new Error(`El producto con el ID: ${resultado._id} no tiene valor en el campo titulo`)
                if(!resultado.price) throw new Error(`El producto con el ID: ${resultado._id}  no tiene valor en el campo precio`)
                if(!resultado.thumbnail) throw new Error(`El producto con el ID: ${resultado._id}  no tiene valor en el campo imagen`)
                if (typeof resultado._id !== 'string') throw new Error(`El producto ${resultado.title} tiene un id con tipo no string`)
                if (typeof resultado.title !== 'string') throw new Error(`El producto con el ID: ${resultado._id} tiene un titulo con tipo no string`)
                if (typeof resultado.price !== 'number') throw new Error(`El producto con el ID: ${resultado._id} tiene un precio con tipo no entero`)
                if (typeof resultado.thumbnail !== 'string') throw new Error(`El producto con el ID: ${resultado._id} tiene una url de imagen con tipo no string`)         
            });  
        })



    //GET de Producto por ID
    it('ver producto por ID', async () => {

        const id = '9999f33b-610f-4137-992a-ff288427db4f'

        const { data: resultado, status } = await axios.get(`/${id}`)

        assert.strictEqual(status, 200)
        if (!id) throw new Error('el id del producto a buscar no tiene valor')
        if (!resultado) throw new Error(`no existe producto con el id: ${id}`)
        if(!resultado._id) throw new Error('No tiene valor el campo ID')
        if(!resultado.title) throw new Error('No tiene valor el campo titulo')
        if(!resultado.price) throw new Error('No tiene valor el campo precio')
        if(!resultado.thumbnail) throw new Error('No tiene valor el campo imagen')
        if (typeof resultado._id !== 'string') throw new Error(`El producto tiene un id con tipo no string`)
        if (typeof resultado.title !== 'string') throw new Error('el producto tiene un titulo con tipo no string')
        if (typeof resultado.price !== 'number') throw new Error('el producto tiene un precio con tipo no entero')
        if (typeof resultado.thumbnail !== 'string') throw new Error('el producto tiene una url de imagen con tipo no string') 
    })

})


