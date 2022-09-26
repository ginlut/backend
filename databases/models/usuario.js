const mongoose = require( "mongoose")

module.exports = mongoose.model('User', {
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true},
    phone: { type: Number },
    avatar: { type: String} 
})

