const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    timestamp:{
        type:Date,
        default:Date.now()
    },
    productos:{
        type:Array,
        required: true,
    }
});


const cartModel = mongoose.model('Carts',cartSchema);

module.exports = cartModel