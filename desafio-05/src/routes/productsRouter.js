import productModel from "../models/product.js"
import { Router } from "express"

const productsRouter = Router() // Modulo de enrutado de express
// Definimos productsRouter como el enrutado de "products", por lo tanto, no es necesario ponerlo en cada "/products"

productsRouter.get('/', async (req, res) => {
    try {
        // Si el usuario no nos envia alguna de estas peticiones, se le devolvera un valor por defecto. Ejemplo limit = 10, page = 1
        const { limit = 10, page = 1, filter, ord } = req.query

        const metFilter = filter == "true" || filter == "false" ? "status" : filter !== undefined ? "category" : undefined // Si hay true o false, devolvera el status. Caso de undefined, será por categoria.
        const query = metFilter ? { [metFilter]: filter } : {} // [metFilter] Adopta una propiedad dinamica la cual variara dependiendo el filtro que el usuario quiera aplicar. Si metfilter no esta definido, sera un objeto vacio. {}
        const ordQuery = ord ? { price: ord } : {} // En caso de aplicar un ordenamiento, ord tomara el valor "asc" o "desc" y se le aplicara a la propiedad "price". En caso de no haber un parametro, se devolvera un objeto vacio. {}

        const prods = await productModel.paginate(query, {limit: limit, page: page, sort: ordQuery}) // Esto enviaremos y paginaremos
        /*
        res.status(200).render("templates/home", { // Este es el nombre del handlebar home
            mostrarProductos: true,
            productos: prods, // Esto sera lo que renderizaremos
            css: "home.css"
        })
        */
       res.status(200).send(prods)
    } catch (error) {
        res.status(500).render("templates/error", { // Este es el nombre del handlebar error
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