// Se importan dependencias
const express = require("express");
const app = express();
const router = express.Router();
const productsRouter = require("./routes/products.routes");
//const cartsRouter = require("./routes/carts.routes");
const viewsRoutes = require("./routes/views.routes")
const realTimeProducts = require("./routes/views.routes")
const exphbs = require("express-handlebars")
const socket = require("socket.io");
require ("./database.js")

// puerto al que se conectara
const PUERTO = 8080;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

// se crea una instancia de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'));

//routes
app.use("/api/products", productsRouter);
//app.use("/api/carts", cartsRouter);
app.use("/", viewsRoutes);
app.use("/realTimeProducts", realTimeProducts );

// se inicia el servidor y se escucha el puerto indicado

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})

//////
const ProductManager = require("./controllers/product-manager-db");
const productManager = new ProductManager()

const io = socket(httpServer);

io.on("connection", async (socket) => {
    console.log("conectado")

    socket.emit("productos", await productManager.getProduct())

    socket.on("eliminarProducto", async(id) => {
        await productManager.deleteProduct(id);
        io.emit("productos", await productManager.getProduct());
    })
    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto)
    })

})

