const Carritos= require('../../../../controllers/carritos.controller');
const cartModel = require('../models/carrito.model')
const carritosApi = new Carritos(cartModel)


module.exports =  { carritosApi };

