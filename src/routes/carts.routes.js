const express = require("express");
const router = express.Router();
const fs = require('fs');
const CartManager = require("../controllers/cart-manager");
const cartManager = new CartManager("src/models/carrito.json")


router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const cart = await cartManager.getCart();
        if (limit) {
            res.json(cart.slice(0, limit))
        } else {
            res.json(cart)
        }
    } catch (error) {
        console.error("No se pudo obtener el carrito", error)
        res.status(500).json({
            error: "error del servidor"
        })
    }

})

router.get("/:cid", async (req, res) => {
    try {
        const id = parseInt(req.params.cid)
        const carts = await cartManager.getCart();
        //const arrayCarts = JSON.parse(carts);
        const cart = carts.find(cart => cart.id === id)
        res.json(cart)
    } catch (error) {
        console.error("No se pudo obtener el carrito", error)
        res.status(500).json({
            error: "No existe un carrito con ese ID"
        })
    }
})

// Crea un carrito nuevo
router.post("/", async (req, res) => {
    const newCart = req.body;
    try {
        await cartManager.addCart(newCart)
        res.status(201).json({
            message: "Carrito agregado con éxito"
        })
    } catch (error) {
        console.error("No se pudo guardar el carrito", error)
        res.status(500).json({
            error: "No se pudo guardar el carrito"
        })
    }

}
)

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = req.params.pid
    const quantity = req.body.quantity || 1

    try {
        const actualizarCarrito = cartManager.addProductToCart(cartId, productId, quantity)
        res.json(actualizarCarrito.products)
    } catch (error) {

    }
})

module.exports = router;