class ProductManager {
    constructor() {
        this.productos = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Verificar si algún parámetro es nulo
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los parámetros son obligatorios y no pueden ser nulos.");
            return;
        }
        const producto = {
            id:
                this.productos.length
                    ? this.productos[this.productos.length - 1].id + 1
                    : 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        // Verificar si el producto ya existe en la lista
        const productoExistente = this.productos.find((producto) => producto.code === code);
        if (productoExistente) {
            console.error(`El producto con el código ${producto.code} ya existe en la lista.`);
            return;
        }
        // Si no hay problemas, agregar el producto a la lista
        this.productos.push(producto);
        console.log(`Producto con código ${producto.code} agregado con éxito.`);

    }

    getProduct() {
        return this.productos;
    }

    getProductById(id) {
        const productoEncontrado = this.productos.find((producto) => producto.id === id);
        if (productoEncontrado) {
            return productoEncontrado;
        } else {
            console.error(`Producto con ID ${id} no encontrado.`);
            return null;
        }
    }
}
//Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager();

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
const producto = manager.getProduct()
console.log(producto); 

//Se llamará al método “addProduct”
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(producto); 

//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);


//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
const productoEncontrado = manager.getProductById(abc123); // Cambiar el ID según el producto a buscar
if (productoEncontrado) {
    console.log("Producto encontrado:");
    console.log(productoEncontrado);
} else {
    console.log("Producto no encontrado.");
}