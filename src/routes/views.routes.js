const express = require("express");
const router = express.Router();
const fs = require('fs');
const ProductManager = require("../controllers/product-manager");
const productManager = new ProductManager("src/models/products.json")

//handlebars

router.get("/", async (req, res) => {
    try {
        const productsData = await productManager.getProduct();
        res.render("index",{ products: productsData });
    } catch (error) {
        console.error("No se pudo obtener la lista de productos", error)
    }
    
})

router.get("/realtimeproducts", async(req, res) => {
    try {
        res.render("realtimeproducts")
    } catch (error) {
        
    }
})

module.exports = router;