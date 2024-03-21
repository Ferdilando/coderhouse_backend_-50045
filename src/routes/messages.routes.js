const express = require("express");
const router = express.Router();
const fs = require('fs');
const CartManager = require("../controllers/cart-manager-db.js");
const cartManager = new CartManager();

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