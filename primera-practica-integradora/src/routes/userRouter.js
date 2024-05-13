import { Router } from "express";
import { userModel } from "../models/user.js"

const userRouter = Router()

// Toda funcion que consulte una base de datos, DEBE de ser asincrona
userRouter.get("/", async (req, res) => {
    try{
        // Buscamos todos los usuarios de nuestra aplicacion y los devolvemos con .send(users)
        const users = await userModel.find()
        res.status(200).send(users)
    }catch(e){
        res.status(500).send("Error al consultar usuarios: " + e)
    }
})

// Creamos un usuario
userRouter.post("/", async (req, res) => {
    try{
        // Obtenemos los datos que el usuario nos envia
        const {nombre, apellido, email, edad, password} = req.body
        const resultado = await userModel.create({nombre, apellido, email, edad, password}) // Creamos el usuario mediante los datos que obtenemos del body
        res.status(201).send(resultado) // Status 201 ya que se creo un nuevo objeto
    }catch(e){
        res.status(500).send("Error al crear usuarios: " + e)
    }
})

export default userRouter