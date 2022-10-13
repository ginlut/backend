const ProductMongoDAO = require("./productMongo.dao.js");
const CartMongoDAO = require("./cartMongo.dao.js");


class DaoFactoryProduct {
  createDao() {
     return new ProductMongoDAO();
  }
}
class DaoFactoryCart {
  createDao() {
     return new CartMongoDAO();
  }
}

module.exports= {DaoFactoryProduct, DaoFactoryCart}
