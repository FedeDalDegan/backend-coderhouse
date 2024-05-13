import { Product } from "./Products.js";
import { ProductManager } from "./ProductManager.js";

// Generamos nuestros productos
const producto1 = new Product("Dark Souls III", "Souls", 20, 45, "DS")
const producto2 = new Product("The Witness", "Puzzles", 5, 22, "TW")
const producto3 = new Product("Palworld", "Survival", 15, 15, "PW")
const producto4 = new Product("Warframe", "Sci-Fi", 1, 80, "WF")
const producto5 = new Product("Fear & Hunger", "Horror", 8, 9, "FH")
const producto6 = new Product("Danganronpa V3: Killing Harmony", "Visual Novel", 10, 23, "DR")
const producto7 = new Product("Slay the Spire", "Turn-Based", 7, 12, "STS")
const producto8 = new Product("Elden Ring", "Souls", 60, 42, "ED")
const producto9 = new Product("The Binding of Isaac: Rebirth", "RogueLike", 5, 12, "TBOI")
const producto10 = new Product("Saints Row IV", "Open World", 6, 20, "SR")

// Generamos la instancia
const productManager = new ProductManager("./productos.json")

// Añadimos los productos a productos.json
// productManager.addProduct(producto10)

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