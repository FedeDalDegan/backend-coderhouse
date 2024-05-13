import express from "express"
import productsRouter from "./routes/productsRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import upload from "./config/multer.js"
import { __dirname } from "./path.js" 

const app = express()
const PORT = 5000

// Middlewares
app.use(express.json()) // Permite ejecutar JSON
app.use("/static", express.static(__dirname + "/public"))

// Rutas
app.use("/products", productsRouter)
app.use("/cart", cartRouter)
app.post("/upload", upload.single("product") , (req, res) => {
    try{
        res.status(200).send("Imagen cargada correctamente")
    }catch(e){
        res.status(500).send("Error al cargar la imagen")
    }
})

// Abrimos el servidor. (Listen for connections)
app.listen(PORT, () => {
    console.log(`Servidor abierto en puerto ${PORT} // http://localhost:${PORT}/ <- CTRL + CLICK`)
})