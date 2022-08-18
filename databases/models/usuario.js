const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:Date,
        default:Date.now()
    },
    password:{
        type:String,
        required: true,
    }
});


const userModel = mongoose.model('Usuarios',userSchema);

module.exports = userModel

