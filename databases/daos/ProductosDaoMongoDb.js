const dotenv =require("dotenv") ;
dotenv.config();

let productosApi;
let Productos;

switch (process.env.DATABASE) {
  case "mongo":
    Productos = require('../../api/productos');
    const connectMongoDbProduct = require("../mongoDb");
    const productModel = require('../models/producto')
    productosApi = new Productos(productModel)


    break;
}

module.exports =  { productosApi };
