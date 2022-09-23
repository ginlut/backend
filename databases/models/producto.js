const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required: true,
    },
    foto:{
        type:String,
        required: true,
    },
    precio:{
        type:Number,
        required: true,
    }
});


const productModel = mongoose.model('Product',productSchema);

module.exports = productModel

