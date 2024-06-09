import { Router } from "express";
import { uploadImage } from "../controllers/multerController.js";
import upload from "../config/multer.js"

const multerRouter = Router()

// .single Hace referencia a enviar un archivo a la vez. (upload. Tiene muchos metodos. Se pueden enviar Arrays o mas de un archivo a la vez)
multerRouter.post("/", upload.single("product"), uploadImage)

export default multerRouter