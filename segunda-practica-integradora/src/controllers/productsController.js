import productModel from "../models/product.js"

export const getProducts = async(limit, page, filter, ord) => {
    const metFilter = filter == "true" || filter == "false" ? "status" : filter !== undefined ? "category" : undefined // Si hay true o false, devolvera el status. Caso de undefined, será por categoria.
    const query = metFilter ? { [metFilter]: filter } : {} // [metFilter] Adopta una propiedad dinamica la cual variara dependiendo el filtro que el usuario quiera aplicar. Si metfilter no esta definido, sera un objeto vacio. {}
    const ordQuery = ord ? { price: ord } : {} // En caso de aplicar un ordenamiento, ord tomara el valor "asc" o "desc" y se le aplicara a la propiedad "price". En caso de no haber un parametro, se devolvera un objeto vacio. {}

    const prods = await productModel.paginate(query, {limit: limit, page: page, sort: ordQuery}) // Esto enviaremos y paginaremos
    return prods
}

export const getProduct = async(idProducto) => {
    const prod = await productModel.findById(idProducto) // Buscamos en la coleccion de MongoDB mediante un ID
    return prod
}

export const createProduct = async(product) => {
    const mensaje = await productModel.create(product) // Creamos un nuevo producto mediante .create()
    return mensaje
}

export const updateProduct = async(idProducto, upProduct) => {
    const mensaje = await productModel.findByIdAndUpdate(idProducto, upProduct) // Mediante los datos ingresados, actualizamos el producto
    return mensaje
}

export const deleteProduct = async(idProducto) => {
    const mensaje = await productModel.findByIdAndDelete(idProducto) // Eliminamos el producto con ID correspondiente
    return mensaje
}