import { Router } from "express";
import passport from "passport";


const sessionRouter = Router()

// ("Login") hace referencia al nombre de la estrategia que estamos utilizando. En passport.js se encuentra el nombre
sessionRouter.get("/login", passport.authenticate("login"),async (req, res) => {
    try{
        if(!req.user){ // Caso de que el usuario no se pueda loguear
            return res.status(401).send("Usuario o contraseña no validos.")
        }else{ // En caso de poder loguearse, creamos una session a nuestro usuario
            req.session.user  = {
                email: req.user.email,
                first_name: req.user.first_name
            }
        }
        res.status(200).send("Usuario logueado correctamente")
    }catch(e){
        res.status(500).send("Error al loguearse: " + e)
    }
})

// Creamos un usuario
// Authenticate.("register"). "Register" hace referencia al nombre de la estrategia utilizada en passport.js
sessionRouter.post("/register", passport.authenticate("register"), async (req, res) => {
    try{ // Lo que hacemos una vez se registre un nuevo usuarrio
        if(!req.user){ // Caso de que el usuario no se pueda loguear
            return res.status(400).send("Usuario ya existente.")
        }else{
            res.status(200).send("Usuario registrado correctamente.")
        }
    }catch(e){
        res.status(500).send("Error al registrar usuario: " + e)
    }
})


// Autenticamos el email del usuario mediante su registro en github
// Scope es el valor que devolvemos, en este caso sera el mail del usuario.
sessionRouter.get("/github", passport.authenticate("github", {scope: ["user.email"]}), async (req, res) => { r })

sessionRouter.get("/githubSession", passport.authenticate("github"), async (req, res) => {
    req.session.user = { // Generamos esta sesion luego de un logueo exitoso
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect("/") // Lo redireccionamos a este sitio una vez logueado
})

// Deslogeo de sesiones. Las destruimos
sessionRouter.get("/logout", async (req, res) => {
    req.session.destroy(()=>{
        res.status(200).redirect("/index") // Redirect = Redireccionamos al usuario a esta ruta, luego de que se desloguee
    })
})

export default sessionRouter