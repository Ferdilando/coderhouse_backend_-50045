const express = require("express");
const router = express.Router();
const fs = require('fs');
const ProductManager = require("../controllers/product-manager");
const productManager = new ProductManager("src/models/products.json")


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

router.get("/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid)
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

router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
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

router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
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