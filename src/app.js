// Se importan dependencias
const express = require("express");
const app = express();
const router = express.Router();
const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");

// puerto al que se conectara
const PUERTO = 8080;

// se crea una instancia de express

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// se inicia el servidor y se escucha el puerto indicado
app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})