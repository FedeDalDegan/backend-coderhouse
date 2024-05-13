// Testeo: https://docs.google.com/document/d/1CsKlMIdxvv906e-vypilBzuKJJ0qH1AXaq_Ja9USOug/edit

import express from "express"
import { ProductManager } from "./config/ProductManager.js"

const app = express()
const PORT = 8080
const productManager = new ProductManager("./productos.json")

app.get("/", (req, res) => {
    res.send(`<h1>Bienvenido a la pseudo-bdd</h1>
            <h2>Buscar /productos</h2>
            <h2>Buscar /productos/{id}</h2>
            <h2>Buscar /productos?limit={limit}</h2>`)
})

app.get("/productos", async (req, res) => {
    const { limit } = req.query;
    const prods = await productManager.getProducts();

    if (limit !== undefined) {
        const parsedLimit = parseInt(limit);
        if (!isNaN(parsedLimit) && parsedLimit >= 0) {
            const prodsLimit = prods.slice(0, parsedLimit)
            res.send(prodsLimit)
            return // Ambos returns son necesarios para que no se me rompa el programa. xd
        } else {
            res.send("No ingrese valores negativos o no numéricos como límite.")
            return
        }
    }
    
    res.send(prods);
})

// Buscamos un producto por ID. El " : " indica que puede ser un valor modificable
app.get("/productos/:pid", async (req, res) => {
    const idProducto = req.params.pid // Los datos consultados vienen mediante un string. Asignamos el parametro a la "idProducto"
    const prod = await productManager.getProductById(idProducto)
    if(prod){
        res.send(prod)
    }else{
        res.send("Producto con ID invalida")
    }
})

// Abrimos el servidor. (Listen for connections)
app.listen(PORT, () => {
    console.log(`Servidor abierto en puerto ${PORT} // http://localhost:8080/ <- CTRL + CLICK`)
})