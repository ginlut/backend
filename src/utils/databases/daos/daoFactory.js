const ProductMongoDAO = require("./productMongo.dao.js");

class DaoFactory {
  createDao() {
     return new ProductMongoDAO();
  }
}

module.exports= DaoFactory;
