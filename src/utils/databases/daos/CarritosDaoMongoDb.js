const Carritos= require('../../../../api/carritos');
const connectMongoDbCarrito = require("../mongoDb");
const cartModel = require('../models/carrito')
const carritosApi = new Carritos(cartModel)


module.exports =  { carritosApi };

