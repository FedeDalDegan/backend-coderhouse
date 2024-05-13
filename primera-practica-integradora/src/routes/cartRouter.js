import cartModel from "../models/cart.js"
import { Router } from "express"

const cartRouter = Router()

// Creamos un nuevo carrito
cartRouter.post("/", async (req, res) =>{
    try{
        const mensaje = await cartModel.create({products: []})
        res.status(201).send(mensaje)
    }catch(e){
        res.status(500).send(`Error al crear carrito ${e}`)
    }
})

// Obtenemos carrito mediante ID
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

// Obtenemos el carrito actual
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartModel.findById(cartId)
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

// Agregamos un producto al carrito
cartRouter.post('/:cid/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const { quantity } = req.body // Consulto la cantidad
        const cart = await cartModel.findById(cartId) // Buscamos un carrito mediante ID y lo almacenamos en "cart"

        const indice = cart.products.findIndex(product => product.id_prod == productId)
        if(indice != -1){
            cart.products[indice].quantity += quantity
        }else{
            cart.products.push({id_prod: productId, quantity: quantity})
        }
        const mensaje = await cartModel.findByIdAndUpdate(cartId, cart)

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
        res.status(200).send(mensaje)
    }catch(e){
        res.status(500).send("Error al agregar producto al carrito: " + e)
    }
}

export default cartRouter