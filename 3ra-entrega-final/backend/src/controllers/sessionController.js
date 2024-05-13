import passport from "passport";

export const login = async (req, res) => {
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
}

export const register = async (req, res) => {
    try{ // Lo que hacemos una vez se registre un nuevo usuarrio
        if(!req.user){ // Caso de que el usuario no se pueda loguear
            return res.status(400).send("Usuario ya existente.")
        }else{
            res.status(200).send("Usuario registrado correctamente.")
        }
    }catch(e){
        res.status(500).send("Error al registrar usuario: " + e)
    }
}

export const githubSession = async (req, res) => {
    req.session.user = { // Generamos esta sesion luego de un logueo exitoso
        email: req.user.email,
        first_name: req.user.name
    }
    res.redirect("/") // Lo redireccionamos a este sitio una vez logueado
}

export const testJWT = async (req, res) => {
    console.log(req.user) // Dara toda la informacion del usuario
    if(req.user.rol == "User"){ // Entramos en las propiedades del objeto "user" y verificamos su rol
        res.status(403).send("Usuario no autorizado") // 403: Puedo ingresar al sitio, pero no tengo los permisos para entrar en ciertos sitios.
    }else{
        res.status(200).send(req.user) // Caso de ser rol "user", te permito entrar a mi sitio
    }
    res.status(200).send(req.user)
}

export const logout = async (req, res) => {
    req.session.destroy(()=>{
        res.status(200).redirect("/index") // Redirect = Redireccionamos al usuario a esta ruta, luego de que se desloguee
    })
}

export const current = async (req, res) => {
    console.log(req)
    res.status(200).send("Usuario logueado")
}