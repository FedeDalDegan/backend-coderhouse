import crypto from "crypto"

export class Product{
    constructor(title, desc, price, stock, code){
        this.title = title
        this.desc = desc
        this.price = price
        this.stock = stock
        this.code = code
        this.thumbnail = []
        this.id = crypto.randomBytes(10).toString("hex")
    }
}