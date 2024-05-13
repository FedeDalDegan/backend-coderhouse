/*
        "title": "Dark Souls III",
        "desc": "Souls-Like",
        "price": 40,
        "stock": 15,
        "code": "DS123",
        "thumbnail": [],
        "id": "8c36cf50ca135708534d",
        "img": "https://www.gamespot.com/a/uploads/scale_medium/1197/11970954/2976798-sss91mcjvyj85l._sl1500_.jpg"
*/

import {Schema, model} from "mongoose"

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    thumbnail: { // En caso de no ingresar algun valor (Ejemplo, un string con el link de la imagen), sera por defecto un array vacio []
        default: []
    }
})

const productModel = model("products", productSchema)

export default productModel