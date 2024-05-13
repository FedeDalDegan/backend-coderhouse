class ProductManager{
    constructor(){
        this.products = []
        this.productCode = 1
    }

    // Añadir un producto requiriendo estos campos.
    addProduct(product){
        if(!product.title || !product.desc || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error("Los campos son obligatorios.")
            return
        }

        // Verificacion de codigo existente.
        if(this.products.some(existingProduct => existingProduct.code === product.code)){
            console.error("Ya existe un producto con el mismo codigo.")
            return
        }

        product.id = this.productCode++ // Code Autoincrementable.
        this.products.push(product) // Añadir producto al ARRAY
        console.log(`Producto agregado correctamente: ${product.title}`)
    }

    // Mostrar el ARRAY de productos.
    getProducts(){
        return this.products
    }

    // Buscamos un producto que coincida con el ID
    getProductById(id){
        const Product = this.products.find(existingProduct => existingProduct.id === id) 

        if(!Product){
            return "Producto no encontrado"
        }else{
            return Product
        }
    }
}

// Uso.
const ProductManagerInstance = new ProductManager()

// Creamos los productos con los campos requeridos
const Product1 = {
    title: "Producto 1",
    desc: "Prod1 Description",
    price: 1000,
    thumbnail: "./products/product-1.jpg",
    code: 1,
    stock: 50
}

const Product2 = {
    title: "Producto 2",
    desc: "Prod2 Description",
    price: 500,
    thumbnail: "./products/product-2.jpg",
    code: 2,
    stock: 10
}

const Product3 = {
    title: "Producto 3",
    desc: "Prod3 Description",
    price: 2500,
    thumbnail: "./products/product-3.jpg",
    code: 3,
    stock: 5
}

// Instanciamos cada uno de los productos y los añadimos con addProduct()
ProductManagerInstance.addProduct(Product1)
ProductManagerInstance.addProduct(Product2)
ProductManagerInstance.addProduct(Product3)

// Lista de todos los productos añadidos
console.log("Todos los productos: ", ProductManagerInstance.getProducts())

// Buscamos el ID de algun producto
// 1, 2, 3 Encontrara un producto.
// Otros ID daran un mensaje mostrando que "X" ID No fue encontrado.
const FindProductId = 3
const FoundProduct = ProductManagerInstance.getProductById(FindProductId)
console.log(`Producto con ID: ${FindProductId}`, FoundProduct)