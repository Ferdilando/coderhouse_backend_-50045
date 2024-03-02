// Módulo de enrutamiento para gestionar las operaciones relacionadas con carritos.
const express = require("express");
const router = express.Router();
const fs = require('fs');
const CartManager = require("../controllers/cart-manager-db.js");
const cartManager = new CartManager();


// Maneja la solicitud GET para obtener todos los carritos o un número limitado de carritos.
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const cart = await cartManager.getCart();
        if (limit) {
            res.json(cart.slice(0, limit));
        } else {
            res.json(cart);
        }
    } catch (error) {
        console.error("No se pudo obtener el carrito", error);
        res.status(500).json({
            error: "error del servidor"
        });
    }
});

// Maneja la solicitud GET para obtener un carrito específico por su ID.
router.get("/:cid", async (req, res) => {
    try {
        const id = req.params.cid
        const carts = await cartManager.getCart();
        const cart = carts.find(cart => cart.id === id);
        res.json(cart);
    } catch (error) {
        console.error("No se pudo obtener el carrito", error);
        res.status(500).json({
            error: "No existe un carrito con ese ID"
        });
    }
});

// Maneja la solicitud POST para crear un nuevo carrito.
router.post("/", async (req, res) => {
    const newCart = req.body;
    try {
        await cartManager.addCart(newCart);
        res.status(201).json({
            message: "Carrito agregado con éxito"
        });
    } catch (error) {
        console.error("No se pudo guardar el carrito", error);
        res.status(500).json({
            error: "No se pudo guardar el carrito"
        });
    }
});

// Maneja la solicitud POST para agregar un producto a un carrito específico.
router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updatedCart = cartManager.addProductToCart(cartId, productId, quantity);
        res.json(updatedCart.products);
    } catch (error) {
        // Manejo del error...
    }
});

module.exports = router;
