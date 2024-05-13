import { Router } from "express"
import { ProductManager } from '../config/ProductManager.js'

const productManager = new ProductManager('./src/data/products.json')

const productsRouter = Router() // Modulo de enrutado de express
// Definimos productsRouter como el enrutado de "products", por lo tanto, no es necesario ponerlo en cada "/products"

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const prods = await productManager.getProducts()
        let limite = parseInt(limit)
        if (!limite)
            limite = prods.length
        console.log(limite)
        const prodsLimit = prods.slice(0, limite)
        res.status(200).render("home", { // Este es el nombre del handlebar home
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
        const prod = await productManager.getProductById(idProducto)
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
        const mensaje = await productManager.addProduct(product)
        if (mensaje == "Producto creado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(400).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const updateProduct = req.body
        const mensaje = await productManager.updateProduct(idProducto, updateProduct)
        if (mensaje == "Producto actualizado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const mensaje = await productManager.deleteProduct(idProducto)
        if (mensaje == "Producto eliminado correctamente")
            res.status(200).send(mensaje)
        else
            res.status(404).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar producto: ${error}`)
    }
})

export default productsRouter