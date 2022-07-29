const dotenv =require("dotenv") ;
dotenv.config();

let productosApi;
let carritosApi;
let Productos;
let Carritos;

switch (process.env.DATABASE) {
  case "firebase":
    Productos = require('../contenedores/productos/contenedorFirebase');
    productosApi = new Productos('productos')
    Carritos = require('../contenedores/carritos/contenedorFirebase');
    carritosApi = new Carritos('carritos')

    break;

  case "mongo":
    Productos = require('../contenedores/productos/contenedorMongoDb');
    const connectMongoDb = require("../databases/mongoDb");
    const productModel = require('../models/producto')
    productosApi = new Productos(productModel)
    Carritos = require('../contenedores/carritos/contenedorMongoDb')
    const cartModel = require('../models/carrito')
    carritosApi = new Carritos(cartModel)

    break;
}

module.exports =  { productosApi, carritosApi };
