const ProductModel = require("../models/products.model.js")

class ProductManager {
    async addProduct({ title, category, description, price, code, stock, status, thumbnails }) {
        try {
            if (!title || !category || !description || !price || !code || !stock ) {
                console.log("Todos los campos son obligatorios")
                return;
            }
            const existeProducto = await ProductModel.findOne({ code: code })

            if (existeProducto) {
                console.log("El producto ya existe")
                return;
            }

            const nuevoProducto = new ProductModel({
                title,
                category,
                description,
                price,
                code,
                stock,
                status: true,
                thumbnails: thumbnails || []
            })

            await nuevoProducto.save()

        } catch (error) {
            console.log(error,"Error al crear el producto")
        }
    }

    async getProduct(){
        try {
            const productos = await ProductModel.find()
            return productos;
        } catch (error) {
            console.log("No se pudo recuperar los productos")
        }
    }

    async getProductById(id){
        try {
            const producto = await ProductModel.findById(id)
            if(!producto){
                console.log("Producto no encontrado")
                return null;
            }
            return producto;
        } catch (error) {
            console.log("Error al buscar el producto por id")
        }
    }

    async updateProduct(id, productoActualizado){
        try {
            const updateProduct = await ProductModel.findByIdAndUpdate(id, productoActualizado)
            if(!updateProduct){
                console.log("No se encontró el producto")
                return null
            }
            return updateProduct
        } catch (error) {
            
        }
    }

    async deleteProduct(id){
        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(id)
            if(!deleteProduct){
                console.log("No se encontró el producto")
                return null
            }
            console.log("Producto eliminado")
        } catch (error) {
            
        }
    }
}

module.exports = ProductManager