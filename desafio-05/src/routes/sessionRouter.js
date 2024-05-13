import { Router } from "express";
import { userModel } from "../models/user.js"

const sessionRouter = Router()

sessionRouter.get("/login", async (req, res) => {
    const {email, password} = req.body // Consulto MAIL y CONTRASEÑA de la sesion del usuario

    try{
        // Primero verificamos si el usuario esta registrado en la base de datos
        const user = await userModel.findOne({email: email}) // Buscamos en la base de datos un usuario cuyo email sea igual al email ingresado.
        // console.log(user) /* { rol: 'User', _id: new ObjectId('65e103f919b27aa3a3874f03'), nombre: 'FonohA', apellido: 'Deus Ex', password: '1234', edad: 20, email: 'f@gmail.com', __v: 0} */
        if(user && password == user.password){
                req.session.email = email // Genero la sesion solamente con el mail. No la contraseña. Esta informacion sera mostrada en la base de datos
                if(user.rol == "Admin"){ // Consultamos si el usuario tiene "Admin" como rol. Caso contrario seguira todo normal.
                    req.session.admin = true // Se mostrar en la coleccion "sessions" de nuestra BD.
                    res.status(200).send("Bienvenido Administrador")
                }else{
                    res.status(200).send("Usuario logeado correctamente")
                }
            }else{
            // 401 = No autorizado. Fallo de antenticacion
            res.status(401).send("Usuario y/o contraseña invalidos")
        }
    }catch(e){
        res.status(500).send("Error al logear usuario: " + e)
    }
})

// Creamos un usuario
sessionRouter.post("/register", async (req, res) => {
    try{
        // Obtenemos los datos que el usuario nos envia
        const {first_name, last_name, password, age, email} = req.body // Sacamos estos atritubutos del modelo de "user"
        // En el caso de que el usuario haya sido previamente creado
        const findUser = await userModel.findOne({email: email}) // Buscamos si ya existe el mail en nuestra base de datos
        if(findUser){ // En el caso de que el mail ya exista, entonces...
            res.status(400).send("Ya existe un usuario con este email.")
        }else{ // En el caso de que el usuario sea nuevo, lo registramos con sus datos
            const resultado = await userModel.create({first_name, last_name, password, age, email}) // Creamos el usuario mediante los datos que obtenemos del body
            res.status(201).send("Usuario creado correctamente: \n" + resultado) // Status 201 ya que se creo un nuevo objeto
        }
    }catch(e){
        res.status(500).send("Error al crear usuarios: " + e)
    }
})

// Deslogeo de sesiones. Las destruimos
sessionRouter.get("/logout", async (req, res) => {
    req.session.destroy(()=>{
        res.status(200).redirect("/index") // Redirect = Redireccionamos al usuario a esta ruta, luego de que se desloguee
    })
})

export default sessionRouter