const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vegafernandoa:coderhouse@cluster0.vdigodo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conectado a la BD"))
    .catch((error) => console.log(error))

