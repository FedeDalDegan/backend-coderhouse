import { Product } from "./Products.js";
import { ProductManager } from "./desafio-02.js";

// Generamos nuestros productos
const producto1 = new Product("Dark Souls III", "Souls", 20, 45, "DS")
const producto2 = new Product("The Witness", "Puzzles", 5, 22, "TW")
const producto3 = new Product("Palworld", "Survival", 15, 15, "PW")
const producto4 = new Product("Warframe", "Sci-Fi", 1, 80, "WF")

// Generamos la instancia
const productManager = new ProductManager("./productos.json")

// Añadimos los productos a productos.json
// productManager.addProduct(producto4)

// Consultamos por todos los productos
// productManager.getProducts() // Mostrara todos los productos del .JSON

// Consultamos por un ID especifico
// productManager.getProductById("8c36cf50ca135708534d") // Traera "Dark souls III". Caso de colocar un ID inexistente será ("No se encuentra un producto con este ID")

// Actualizamos un producto (Ejemplo, Dark Souls III)
/*
const producto1Actualizado = new Product("Dark Souls III", "Souls-Like", 40, 15, "DS123")
productManager.updateProduct("8c36cf50ca135708534d", producto1Actualizado)
*/

// Eliminamos un producto (Ejemplo, Warframe)
// productManager.deleteProduct("58130394ce0dcfc3da6c")