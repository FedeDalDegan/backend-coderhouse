import {Schema, model} from "mongoose"

const cartSchema = new Schema({
    products: {
        type: [
            { // "Products" sera un array que contendra lo siguiente:
                id_prod: {
                    type: Schema.Types.ObjectId, // Obtenemos el ID generado por nuestra base de datos
                    require: true,
                    ref: "products" // "Products" es el nombre de nuestra coleccion almacenada en nuestra BDD. De aqui se sacara el ID de referencia
                },
                quantity: {
                    type: Number,
                    require: true
                },
            }
        ],
        default: []
    }
})

const cartModel = model("carts", cartSchema)

export default cartModel