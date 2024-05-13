import productModel from "../models/product.js"
import { Router } from "express"

const productsRouter = Router() // Modulo de enrutado de express
// Definimos productsRouter como el enrutado de "products", por lo tanto, no es necesario ponerlo en cada "/products"

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const prods = await productModel.find().lean() // Buscamos la coleccion dentro de la base de datos. Con .lean() mapeamos cada elemento de la base de datos. .lean() Pasa a JSON los elementos.
        let limite = parseInt(limit)
        if (!limite)
            limite = prods.length
        const prodsLimit = prods.slice(0, limite)
        res.status(200).render("templates/home", { // Este es el nombre del handlebar home
            mostrarProductos: true,
            productos: prodsLimit, 
            css: "home.css"
        })
    } catch (error) {
        res.status(500).render("error", { // Este es el nombre del handlebar error
            error: error,
        })
    }
})

//: significa que es modificable (puede ser un 4 como un 10 como un 75)
productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid //Todo dato que se consulta desde un parametro es un string
        const prod = await productModel.findById(idProducto) // Buscamos en la coleccion de MongoDB mediante un ID
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no existe")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body
        const mensaje = await productModel.create(product) // Creamos un nuevo producto mediante .create()
        res.status(201).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const updateProduct = req.body
        const prod = await productModel.findByIdAndUpdate(idProducto, updateProduct) // Mediante los datos ingresados, actualizamos el producto
        res.status(200).send(prod)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const mensaje = await productModel.findByIdAndDelete(idProducto) // Eliminamos el producto con ID correspondiente
        res.status(200).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar producto: ${error}`)
    }
})

export default productsRouter