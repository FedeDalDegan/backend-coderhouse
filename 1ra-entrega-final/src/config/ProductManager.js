// Renombramos las promesas para mejor lectura
import {promises as fs} from "fs"
import crypto from "crypto"

export class ProductManager{
    constructor(path){ // Se lo tendremos que enviar como parametro a las instancias generadas
        this.path = path // "./productos.json/"
    }

    // Añadir un producto requiriendo estos campos.
    addProduct = async(newProduct) => {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8")) // Leemos el array de productos.json
        const i = prods.findIndex(prod => prod.code === newProduct.code)
        if(newProduct.title && newProduct.desc 
            && newProduct.price && newProduct.thumbnail && 
            newProduct.code && newProduct.stock){
            if(i === -1){ // Preguntamos si es = a -1
                newProduct.id = crypto.randomBytes(10).toString("hex")
                prods.push(newProduct)
                await fs.writeFile(this.path, JSON.stringify(prods))
                return "Producto creado"
            }else{
                return "Producto ya existente."
            }
        }else{
            return "Los campos son obligatorios."
        }
    }

    // Mostrar el ARRAY de productos.
    getProducts = async() => {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"))
        return prods
    }

    // Buscamos un producto que coincida con el ID
    getProductById = async(id) => {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"))
        const prod = prods.find(product => product.id === id)
        if(prod){
            return prod
        }else{
            return "No se encuentra el ID"
        }
    }

    // Sobreescribimos la informacion (stock y precio) de un producto existente
    updateProduct = async (id, newProduct) => {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"))
        const i = prods.findIndex(product => product.id === id)
        // En este caso, el producto existe. Asi que actualizaremos sus datos
        if(i != -1){ // Preguntamos que sea DIFERENTE de -1
            prods[i].title = newProduct.title !== null ? newProduct.title : prods[i].title;
            prods[i].desc = newProduct.desc !== null ? newProduct.desc : prods[i].desc;
            prods[i].thumbnail = newProduct.thumbnail !== null ? newProduct.thumbnail : prods[i].thumbnail;
            prods[i].price = newProduct.price !== null ? newProduct.price : prods[i].price;
            prods[i].stock = newProduct.stock !== null ? newProduct.stock : prods[i].stock;
            prods[i].code = newProduct.code !== null ? newProduct.code : prods[i].code;

            // Una vez actualizado, lo escribimos en nuestro json
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Producto actualizado"
        }else{
            return "Producto no existente"
        }
    }
    
    // Eliminamos X producto
    deleteProduct = async (id) => {
        const prods = JSON.parse(await fs.readFile(this.path, "utf-8"))
        const i = prods.findIndex(product => product.id === id)
        
        if(i != -1){
            const prodsFiltered = prods.filter(prod=>prod.id!=id)
        
            await fs.writeFile(this.path, JSON.stringify(prodsFiltered))
            return "Producto eliminado"
        }else{
            return "Producto no existente"
        }
    }
}