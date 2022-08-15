const dotenv =require("dotenv") ;
dotenv.config();

let productosApi;
let Productos;

switch (process.env.DATABASE) {
  case "firebase":
    Productos = require('../contenedores/productos/contenedorFirebase');
    productosApi = new Productos('productos')
    break;

  case "mongo":
    Productos = require('../../api/productos');
    const connectMongoDb = require("../mongoDb");
    const productModel = require('../models/producto')
    productosApi = new Productos(productModel)


    break;
}

module.exports =  { productosApi };
