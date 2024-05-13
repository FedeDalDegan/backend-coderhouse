import cartModel from "../models/cart.js"
import { Router } from "express"

const cartRouter = Router()

// Creamos un nuevo carrito
cartRouter.post("/", async (req, res) =>{
    try{
        // Creamos un carrito vacio en la base de datos
        const mensaje = await cartModel.create({products: []})
        res.status(201).send(mensaje)
    }catch(e){
        res.status(500).send(`Error al crear carrito ${e}`)
    }
})

// Obtenemos carrito mediante ID
cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid // Obtenemos el id del carrito de la solicitud
        const cart = await cartModel.findOne({_id: cartId}).populate("products.id_prod") // Con findOne especificamos el atributo por el que estamos buscando. (En este caso _id. Atributo de MONGODB)
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar carrito: ${error}`)
    }
})

// Añadimos productos al carrito
cartRouter.post("/:cid/:pid", async (req, res) => {
    try {
        // Obtenemos el ID del carrito y su producto
        const cartId = req.params.cid
        const productId = req.params.pid
        let {quantity} = req.body // Manejamos la cantidad de productos en el cuerpo de la solicitud (Las dadas por el usuario)

        // Si no hay cantidad, devolvemos 1
        if(quantity === undefined){
            quantity = 1
        }

        // Actualizamos el carrito en la base de datos
        const updatedCart = await cartModel.findOneAndUpdate(
            {_id: cartId, "products.id_prod" : productId},
            {$inc: {"products.$.quantity": quantity}},
            {new: true}
        )
        
        // El caso de que el producto no se encuentre en el carrito
        if(!updatedCart){
            const cart = await cartModel.findByIdAndUpdate(
                cartId,
                {$push: {products: {id_prod: productId, quantity: quantity}}}, // Agregamos un elemento al documento de MongoDB (Añadimos productos al array)
                {new: true}
            )
            res.status(200).send(cart)
        }else{
            res.status(200).send(updatedCart)
        }
    }catch(e){
        res.status(500).send("Error al obtener productos: " + e)
    }
})

// Actualizamos productos de un carrito
cartRouter.put("/cid:", async (req, res) => {
    try{
        const cartId = req.params.cid
        const newProducts = req.body
        const updatedCart = await cartModel.findOneAndUpdate(
            {_id: cartId},
            {$set: {products: newProducts}}, // Metodo que se utiliza para modificar valores especificos del documento de MongoDB, sin reemplazar todo el documento. En este caso, se utiliza para actualizar los productos de un carrito
            {new: true}
        )
        if(!updatedCart){
            return res.status(404).send("Carrito no encontrado")
        }else{
            res.status(200).send(updatedCart)
        }
    }catch(e){
        res.status(500).send("Error al actualizar los productos del carrito: " + e)
    }
})

// Eliminamos un producto del carrito
cartRouter.delete("/:cid/products:/pid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid

        const updatedCart = await cartModel.findOneAndUpdate(
            {id: cartId},
            {$pull: {products: {id_prod: productId}}}, // Eliminamos elemento del array. (Eliminamos un producto)
            {new: true} // Este parametro de opcion se utiliza para que nos devuelve el documento actualizado de la base de datos.
        )
        
        if(updatedCart){
            res.status(200).send(updatedCart)
        }else{
            res.status(404).send("Carrito no encontrado")
        }
    }catch(e){
        res.status(500).send("Error al eliminar producto del carrito: " + e)
    }
})

// Vaciar carrito
cartRouter.delete("/:cid", async (req, res) => {
    try{
        const cartId = req.params.cid

        const updatedCart = await cartModel.findOneAndUpdate(
            cartId,
            {products: []},
            {new: true}
        )

        if(!updatedCart){
            return res.status(404).send("Carrito no encontrado")
        }else{
            res.status(200).send("Removido con exito")
        }
    }catch(e){
        res.status(500).send("Ha ocurrido un error: " + e)
    }
})

export default cartRouter