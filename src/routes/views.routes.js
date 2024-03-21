const express = require("express");
const router = express.Router();
const fs = require('fs');
const ProductManager = require("../controllers/product-manager-db");
const ProductModel = require("../models/products.model");
//const productManager = new ProductManager("src/models/products.json")
const productManager = new ProductManager()
//handlebars

/* router.get("/", async (req, res) => {
    try {
        const productsData = await productManager.getProduct();
        res.render("index",{ products: productsData });
    } catch (error) {
        console.error("No se pudo obtener la lista de productos", error)
    }
    
}) */

/* router.get("/", async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.error("No se pudo obtener la lista de productos", error)
    }
    
}) */

router.get("/realtimeproducts", async(req, res) => {
    try {
        res.render("realtimeproducts")
    } catch (error) {
        
    }
})

router.get("/", async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const sort = req.query.sort 
    try {
        const productList = await ProductModel.paginate({},{limit, page, sort})

        const productListFinal = productList.docs.map( product => {
            const{_id, ...rest} = product.toObject()
            return rest
        })

        res.render("realtimeproducts",{
            products: productListFinal,
            hasPrevPage: productList.hasPrevPage,
            hasNextPage: productList.hasNextPage,
            prevPage: productList.prevPage,
            nextPage: productList.nextPage,
            currentPage: productList.currentPage,
            totalPages: productList.totalPages
        });
    } catch (error) {
        console.error("No se pudo obtener la lista de productos en tiempo real", error);
    }
});


/* router.get("/api/products", async(req, res) => {
    try {
        res.render("realtimeproducts")
    } catch (error) {
        
    }
}) */

module.exports = router;