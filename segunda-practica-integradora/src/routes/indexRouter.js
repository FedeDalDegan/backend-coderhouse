import productsRouter from "./productsRouter.js"
import cartRouter from "./cartRouter.js"
import chatRouter from './chatRouter.js'
import userRouter from './userRouter.js'
import sessionRouter from "./sessionRouter.js"
import upload from "../config/multer.js"
import express from "express"
import { __dirname } from "../path.js"

const indexRouter = express.Router()

// Rutas
indexRouter.use("/index", (req, res) => { // Pagina de inicio
    res.status(200).send("<h1>Bienvenido</h1>")
})
indexRouter.use("/products", productsRouter, express.static(__dirname + "/public"))
// app.use("/static", express.static(__dirname + "/public")) // Definimos el enrutado de la carpeta publica. Es decir, en la ruta "static", voy a trabajar con los elementos publicos de mi aplicacion
indexRouter.use("/cart", cartRouter, express.static(__dirname + "/public"))
indexRouter.use("/chat", chatRouter, express.static(__dirname + "/public"))
indexRouter.use("/users", userRouter)
indexRouter.use("/session", sessionRouter)
// .single Hace referencia a enviar un archivo a la vez. (upload. Tiene muchos metodos. Se pueden enviar Arrays o mas de un archivo a la vez)
indexRouter.post("/upload", upload.single("product") , (req, res) => { // Generamos una ruta para poder cargar imagenes con metodo POST
    try{
        res.status(200).send("Imagen cargada correctamente")
    }catch(e){
        res.status(500).send("Error al cargar la imagen")
    }
})

export default indexRouter