// Se importan dependencias
const express = require("express");
const fs = require("fs");
const exp = require("constants");

// puerto al que se conectara
const PUERTO = 8080;

// se crea una instancia de express
const app = express()

// get que permite leer el archivo y traer todos los elementos o una cierta cantidad segun se pase un ?limit=x
app.get("/products", (req, res) => {
    const productos = fs.readFileSync("src/productos.json", "utf8");
    const arrayProductos = JSON.parse(productos);

    let limit = req.query.limit;
    if (limit) {
        let lista = arrayProductos.slice(0, parseInt(limit));
        res.send(lista);
    } else {
        res.send(arrayProductos)
    }

});

// get que permite traer un elemento pasando un id
app.get("/products/:id", (req, res) => {
    const productos = fs.readFileSync("src/productos.json", "utf8")
    const arrayProductos = JSON.parse(productos);
    let id = parseInt(req.params.id);
    let producto = arrayProductos.find(producto => producto.id === id)
    
    if (producto) {
        res.send(producto)
    } else {
        res.send("Producto no encontrado")
    }

})

// se inicia el servidor y se escucha el puerto indicado
app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})