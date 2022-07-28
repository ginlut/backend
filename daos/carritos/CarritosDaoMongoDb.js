const ContenedorMongoDbCarrito = require( "../../contenedores/carritos/contenedorMongoDb")


class CarritoDaoMongoCart extends ContenedorMongoDbCarrito {
  constructor() {
    super("carritos", {
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
    });
  }
}


module.exports = CarritoDaoMongoCart;
