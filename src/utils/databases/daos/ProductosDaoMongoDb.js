const Productos= require('../../../../controllers/productos.controller');
const productModel = require('../models/producto.model')
const productosApi = new Productos(productModel)


module.exports =  { productosApi };
