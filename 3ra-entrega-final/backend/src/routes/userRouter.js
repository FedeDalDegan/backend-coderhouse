import { Router } from "express";
import { getUsers } from "../controllers/userController.js";

const userRouter = Router()

// Toda funcion que consulte una base de datos, DEBE de ser asincrona
userRouter.get("/", getUsers)

export default userRouter