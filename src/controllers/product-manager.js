const fs = require('fs');

class ProductManager {
    // Constructor de la clase, recibe la ruta del archivo
    constructor(path) {
        this.path = path;
    }

    // Método para obtener la lista de productos desde el archivo
    async getProduct() {
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

    // Método para agregar un nuevo producto a la lista
    async addProduct(obj) {
        try {
            const productos = await this.getProduct(); // Obtiene la lista actual de productos
            let id;

            if (!productos.length) {
                id = 1;
            } else {
                id = productos[productos.length - 1].id + 1; // Calcula el siguiente ID
            }

            const newProduct = { id, ...obj }; // Crea el nuevo producto

            productos.push(newProduct); // Agrega el nuevo producto a la lista

            if (fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, JSON.stringify(productos)); // Guarda la lista actualizada en el archivo json
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify(productos));
            }

            return 'Producto agregado correctamente'; // Devuelve un mensaje de éxito
        } catch (error) {
            return error;
        }
    }

    // Método para obtener un producto por su ID
    async getProductById(idProducto) {
        try {
            const productos = await this.getProduct(); // Obtiene la lista de productos
            const producto = productos.find(u => u.id === idProducto); // Busca el producto por ID
            if (producto) {
                return producto; // Devuelve el producto si se encuentra
            } else {
                return 'No existe el producto'; // Devuelve un mensaje si el producto no se encuentra
            }
        } catch (error) {
            return error;
        }

    }

    // Método para actualizar un producto por su ID 
    async updateProduct(idProducto, camposActualizados) {
        try {
            const producto = await this.getProductById(idProducto); // Obtiene el producto 

            if (fs.existsSync(this.path)) {
                // Actualiza los campos especificados en el producto
                for (const campo in camposActualizados) {
                    if (camposActualizados.hasOwnProperty(campo)) {
                        producto[campo] = camposActualizados[campo];
                    }
                }

                const productos = await this.getProduct(); // Obtiene la lista de productos
                const productoIndex = productos.findIndex((p) => p.id === idProducto); // Encuentra el índice del producto en la lista
                productos[productoIndex] = producto; // Reemplaza el producto actualizado en la lista
                await fs.promises.writeFile(this.path, JSON.stringify(productos)); // Guarda la lista actualizada en el archivo

                return 'Producto actualizado correctamente'; // Devuelve un mensaje de éxito
            } else {
                return 'No existe el producto con el ID proporcionado'; // Devuelve un mensaje si el producto no existe
            }
        } catch (error) {
            return error;
        }
    }

    // Método para eliminar un producto por su ID
    async deleteProduct(idProducto) {
        try {
            const productos = await this.getProduct(); // Obtiene la lista actual de productos

            // Encuentra el índice del producto con el ID proporcionado
            const productoIndex = productos.findIndex((p) => p.id === idProducto);

            if (productoIndex !== -1) {
                // Si se encuentra el producto con el ID proporcionado, elimínalo
                productos.splice(productoIndex, 1);

                // Guarda la lista actualizada en el archivo
                await fs.promises.writeFile(this.path, JSON.stringify(productos));

                return 'Producto eliminado correctamente'; // Devuelve un mensaje de éxito
            } else {
                return 'No existe el producto con el ID proporcionado'; // Devuelve un mensaje si el producto no se encuentra
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = ProductManager;
