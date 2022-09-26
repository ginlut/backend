const Productos= require('../../../../api/productos');
const connectMongoDbProduct = require("../mongoDb");
const productModel = require('../models/producto')
const productosApi = new Productos(productModel)


module.exports =  { productosApi };
