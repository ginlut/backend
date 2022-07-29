const ContenedorMongoDb = require("../../contenedores/productos/contenedorMongoDb");

class ProductoDaoMongo extends ContenedorMongoDb {
  constructor() {
    super("productos", {
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      thumbnail: { type: String, required: true },
    });
  }
}


module.exports =   ProductoDaoMongo;
