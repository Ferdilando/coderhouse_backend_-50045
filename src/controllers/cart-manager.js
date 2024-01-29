const fs = require('fs');

class CartManager {
    // Constructor de la clase, recibe la ruta del archivo
    constructor(path) {
        this.path = path;
    }

    async getCart() {
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(info);
            } else {
                return []; // Si el archivo no existe, devuelve una lista vacía
            }
        } catch (error) {
            return error;
        }
    }

    async addCart(obj) {
        try {
            const carts = await this.getCart(); // Obtiene la lista actual de carritos
            let id;

            if (!carts.length) {
                id = 1;
            } else {
                id = carts[carts.length - 1].id + 1; // Calcula el siguiente ID
            }

            const newCart = { id, products: [] }; // Crea el nuevo carrito

            carts.push({ cart: newCart }); // Agrega el nuevo carrito a la lista

            if (fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, JSON.stringify(carts)); // Guarda la lista actualizada en el archivo json
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
            }

            return 'Carrito agregado correctamente'; // Devuelve un mensaje de éxito
        } catch (error) {
            return error;
        }
    }

    async getCartById(idCart) {
        try {
            const carts = await this.getCart(); // Obtiene la lista de carritos
            const cart = carts.find(u => u.id === idCart); // Busca el carrito por ID
            if (cart) {
                return cart; // Devuelve el carrito si se encuentra
            } else {
                return 'No existe el carrito'; // Devuelve un mensaje si el carrito no se encuentra
            }
        } catch (error) {
            return error;
        }

    }

    async saveCart() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const carts = await this.getCart();
            const cartIndex = carts.findIndex(u => u.id === cartId);

            if (cartIndex !== -1) {
                const cart = carts[cartIndex];
                const productIndex = cart.products.findIndex(p => p.product === productId);

                if (productIndex !== -1) {
                    cart.products[productIndex].quantity += quantity;
                } else {
                    cart.products.push({ product: productId, quantity });
                }

                carts[cartIndex] = cart;

                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

                return cart;
            } else {
                return 'No existe el carrito';
            }
        } catch (error) {
            return error;
        }
    }
}


module.exports = CartManager;
