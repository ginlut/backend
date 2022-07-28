const dotenv =require("dotenv") ;
dotenv.config();

let ProductoDao;
let CarritoDao;

switch (process.env.DATABASE) {
  case "firebase":
    const { ProductoDaoFirebase } = require(
      "./productos/ProductosDaoFirebase"
    );
    const { CarritoDaoFirebase } = require(
      "./carritos/CarritosDaoFirebase"
    );

    ProductoDao = ProductoDaoFirebase;
    CarritoDao = CarritoDaoFirebase;

    break;
  case "mongo":
    const {ProductoDaoMongo } = require(
      "./productos/ProductosDaoMongoDb"
    );
    const {CarritoDaoMongo } = require(
      "./carritos/CarritosDaoMongoDb"
    );

    ProductoDao = ProductoDaoMongo;
    CarritoDao = CarritoDaoMongo;

    break;
}

module.exports =  { ProductoDao, CarritoDao };
