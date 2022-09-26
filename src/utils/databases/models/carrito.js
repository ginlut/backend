const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  timestamp:{
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