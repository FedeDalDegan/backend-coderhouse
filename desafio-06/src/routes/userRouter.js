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

export default userRouter