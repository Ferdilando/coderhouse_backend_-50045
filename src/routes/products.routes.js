const express = require("express");
const router = express.Router();
const fs = require('fs');
const ProductManager = require("../controllers/product-manager-db.js");
const productManager = new ProductManager()

//solicitud GET para obtener todos los productos o un número limitado de productos
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProduct();
        if (limit) {
            res.json(productos.slice(0, limit))
        } else {
            res.json(productos)
        }
    } catch (error) {
        console.error("No se pudo obtener el producto", error)
        res.status(500).json({
            error: "error del servidor"
        })
    }

})

//solicitud GET para obtener un producto específico por su ID
router.get("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
        const productos = await productManager.getProduct();
        const producto = productos.find(producto => producto.id == id)
        res.json(producto)
    } catch (error) {
        console.error("No se pudo obtener el producto", error)
        res.status(500).json({
            error: "No existe un producto con ese ID"
        })
    }
})

//solicitud POST para agregar un nuevo producto.
router.post("/", async (req, res) => {
    const newProduct = req.body;
    try {
        await productManager.addProduct(newProduct)
        res.status(201).json({
            message: "Producto agregado con éxito"
        })
    } catch (error) {
        console.error("No se pudo guardar el producto", error)
        res.status(500).json({
            error: "No se pudo guardar el producto"
        })
    }

}
)

//solicitud PUT para actualizar un producto existente por su ID
router.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const newAtributes = req.body;
    try {
        await productManager.updateProduct(id, newAtributes)
        res.status(201).json({
            message: "Producto actualizado con éxito"
        })
    } catch (error) {
        console.error("No se pudo actualizar el producto", error)
        res.status(500).json({
            error: "No se pudo actualizar el producto"
        })
    }
})

//solicitud DELETE para eliminar un producto por su ID
router.delete("/:pid", async (req, res) => {
    const id = req.params.pid
    try {
        await productManager.deleteProduct(id)
        res.status(201).json({
            message: "Producto eliminado con éxito"
        })
    } catch (error) {
        console.error("No se pudo eliminar el producto", error)
        res.status(500).json({
            error: "No se pudo eliminar el producto"
        })
    }
})

module.exports = router;