const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:Date,
        default:Date.now()
    },
    password:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    }
});


const userModel = mongoose.model('Product',userSchema);

module.exports = userModel

