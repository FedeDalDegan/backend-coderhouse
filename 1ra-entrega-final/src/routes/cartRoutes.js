import crypto from "crypto"
import { Router } from "express"
import { CartManager } from "../config/CartManager.js"

const cartRouter = Router()

// Creamos un nuevo carrito
cartRouter.post("/", async (req, res) =>{
    try{
        const id = crypto.randomBytes(10).toString("hex")
        const cartManager = new CartManager("./cart.json", id)
        await cartManager.createCart(id) // Guardamos el ID del carrito
        return res.status(200).send(`Carrito creado. ID: ${id}`)
    }catch(e){
        res.status(500).send(`Error al crear carrito ${e}`)
    }
})

// Obtenemos carrito mediante ID
cartRouter.get("/:cid", async (req, res) => {
    try{
        const cartId = req.params.cid
        const cartManager = new CartManager("./cart.json")
        const cart = await cartManager.getCart()
        const cartById = cart.filter(item => item.id === cartId)
        res.status(200).send(cartById)
    }catch(e){
        res.status(500).send("Error al obtener el carrito. " + e)
    }
})


// Obtenemos el carrito actual
cartRouter.get('/', async (req, res) => {
    try {
        const cartManager = new CartManager("./cart.json")
        const cart = await cartManager.getCart()
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

// Agregamos un producto al carrito
cartRouter.post('/:pid', async (req, res) => {
    try {
        const cartManager = new CartManager("./cart.json")
        const productId = req.params.pid
        const { quantity } = req.body // Consulto la cantidad
        const mensaje = await cartManager.addProductToCart(productId, quantity) // Una vez que obtenemos el ID y la CANTIDAD, envio dichos datos
        res.status(400).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

// Agregamos producto al carrito
cartRouter.post("/:cid/product/:pid", async (req, res) =>{
    try{
        const cartId = req.params.cid
        const productId = req.params.pid
        const { quantity } = req.body
        const cartManager = new CartManager("./cart.json")
        const mensaje = await cartManager.addProductToCart(productId, quantity, cartId)
        res.status(200).send(mensaje)
    }catch(e){
        res.status(500).send("Error al agregar producto al carrito: " + e)
    }
})

// Crear carrito para un usuario especifico. ( uid = userId )
cartRouter.post("/:uid", async (req, res) => {
    try{
        const uid = req.params.uid
        const cartManager = new CartManager()
        await cartManager.createCart(uid)
        return res.status(200).send("Carrito creado correctamente para el usuario: " + userId)
    }catch(e){
        res.status(500).send("Error al crear el carrito: " + e)
    }
})

// Agregamos productos a un carrito de un usuario especifico
cartRouter.post(":/uid/product/:productId"), async (req, res) => {
    try{
        const uid = req.params.uid
        const productId = req.params.productId
        const { quantity } = req.body
        const cartManager = new CartManager()
        const mensaje = await cartManager.addProductToCart(productId, quantity, uid)
        res.status(200).send(mensaje)
    }catch(e){
        res.status(500).send("Error al agregar producto al carrito: " + e)
    }
}

export default cartRouter