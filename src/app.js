const express = require("express");
const app = express();
const router = express.Router();
const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");
const viewsRoutes = require("./routes/views.routes")
const realTimeProducts = require("./routes/views.routes")
const exphbs = require("express-handlebars")
const socket = require("socket.io");
require ("./database.js")

const PUERTO = 8080;

// Configuración del motor de plantillas Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

// Middleware para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// Middleware para servir archivos estáticos
app.use(express.static('./src/public'));

// Rutas de la API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/realTimeProducts", realTimeProducts );

// Rutas para renderizar vistas
app.use("/", viewsRoutes);

// Creación del servidor HTTP y escucha en el puerto indicado
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`)
})

// Importación del controlador ProductManager
const ProductManager = require("./controllers/product-manager-db");
const productManager = new ProductManager()

// Configuración de Socket.IO
const io = socket(httpServer);

// Manejo de eventos de conexión y desconexión
io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");

    // Emitir la lista de productos al cliente al conectar
    socket.emit("productos", await productManager.getProduct());

    // Manejo del evento "eliminarProducto"
    socket.on("eliminarProducto", async(id) => {
        await productManager.deleteProduct(id);
        // Emitir la lista de productos actualizada a todos los clientes
        io.emit("productos", await productManager.getProduct());
    });

    // Manejo del evento "agregarProducto"
    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto);
        // Emitir la lista de productos actualizada a todos los clientes
        io.emit("productos", await productManager.getProduct());
    });

    // Manejo del evento de desconexión del cliente
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

/* // Se importan dependencias
const express = require("express");
const app = express();
const router = express.Router();
const productsRouter = require("./routes/products.routes");
const cartsRouter = require("./routes/carts.routes");
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
app.use("/api/carts", cartsRouter);
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

let messages = []

io.on("connection", async (socket) => {
    console.log("conectadooo")

    socket.emit("productos", await productManager.getProduct())

    socket.on("eliminarProducto", async(id) => {
        await productManager.deleteProduct(id);
        io.emit("productos", await productManager.getProduct());
    })
    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto)
    })
})

io.on("connection", (socket) =>{
    socket.on("hola", (data)=>{
        console.log(data)
    })
    socket.on("message", data => {
        messages.push(data)
        io.emit("messagesLogs", messages)
    })
})

 */