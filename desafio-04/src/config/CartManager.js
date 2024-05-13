import {promises as fs} from "fs"

export class CartManager {
    constructor(path, cartId){
        this.products = path // Los productos apuntan a la ruta (cart.json)
        this.cartId = cartId
        this.userCarts = {}
    }

    createCart = async(userId) => {
        if(!this.userCarts(userId)){
            this.userCarts[userId] = { id: userId, products: []}
        }
    }

    getCart = async() => {
        const cart = JSON.parse(await fs.readFile(this.products, "utf-8")) // Siempre leer lo que hay en cart
        console.log(cart)
        return cart
    }

    addProductToCart = async(idProducto, quantity) => {
        const cart = JSON.parse(await fs.readFile(this.products, "utf-8"))
        if(cart.length){
            return "No existe ningun carrito"
        }
        const restCarts = cart.filter((c) => c.id !== cartId);
        const cartSelected = cart.find((c) => c.id === cartId);
        let product = cartSelected.products.find(
            (product) => product.id === idProducto
        )
        if(product){ 
            product.quantity += quantity // Cunado el ID sea encontrado, le modifico su cantidad
            restCarts.push(cartSelected)
        }else{
            const prod = {id: idProducto, quantity: quantity} // En caso de no existir, lo creo con su ID y su CANTIDAD
            cartSelected.products.push(prod)
            restCarts.push(cartSelected)
        }
        await fs.writeFile(this.products, JSON.stringify(cart))  // Sea cual sea el caso, se vuelve a reescribir el archivo
        return "Producto cargado correctamente"
    }

    createCart = async(cartId) => {
        const existingCarts = JSON.parse(await fs.readFile(this.products, "utf-8"))
        existingCarts.push({ id: cartId, products: [] })
        await fs.writeFile(this.products, JSON.stringify(existingCarts))
    }
}