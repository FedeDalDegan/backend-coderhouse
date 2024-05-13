import {Schema, model} from "mongoose"

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amout: {
        type: Number,
        required: true,
    },
    purchaser: {
        // Como el email es unico, es mas facil trabajar con este dato.
        type: String,
        required: true,
    },
    products: [
        {
            // Referenciamos los ID a la coleccion de productos
            type: Schema.Types.ObjectId,
            ref: "products"
        }
    ]
})

const ticketModel = model("ticket", ticketSchema)

export default ticketModel