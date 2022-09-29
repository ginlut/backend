const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
    },
    productos:{
        type:Array,
        required: true,
    }
});


const cartModel = mongoose.model('Cart',cartSchema);

module.exports = cartModel