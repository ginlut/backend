const Productos= require('../../../../controllers/productos.controller');
const productModel = require('../models/producto.model')
//const productosApi = new Productos(productModel)
const Carritos= require('../../../../controllers/carritos.controller');
const cartModel = require('../models/carrito.model')
const carritosApi = new Carritos(cartModel)

module.exports =  { carritosApi };
