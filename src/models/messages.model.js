const mongoose = require("mongoose");

const msjSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

const MsjModel = mongoose.model("carts", msjSchema)

module.exports = MsjModel