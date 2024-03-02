const cartModel = require("../models/cart.model.js")

class CartManager {
    async getCart() {
        try {
            const carts = await cartModel.find()
            return carts
        } catch (error) {
            console.log("no se encontraron los carritos")
        }

    }

    async getCartById(id) {
        try {
            const cart = await cartModel.findById(id)
            if(!cart){
                console.log("No existe ese carrito")
                return null
            }
            return cart
        } catch (error) {
            console.log(error,"error al buscar el carrito")
        }
    }

    async addCart(newCart) {
        try {
            const newCart = new cartModel({products: []})
            await newCart.save()
            return newCart          
        } catch (error) {
            console.log("no se pudo crear el carrito")
        }
    }

    async addProductToCart(cartId, ProductId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId)
            const productexist = cart.products.find(item => item.product.toString() === ProductId)
            
            if(productexist) {
                productexist.quantity += quantity
            } else {
                cart.products.push({product: ProductId, quantity})
            }

            cart.markModified("products")
            await cart.save()
            return cart
        } catch (error) {
            console.log(error,"no se pudo agregar el producto")

        }
    }

}

module.exports = CartManager