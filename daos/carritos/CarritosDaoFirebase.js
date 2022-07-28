const ContenedorFirebaseCarritos = require("../../contenedores/carritos/contenedorFirebase");

class ProductosDaosFirebaseCart extends ContenedorFirebaseCarritos {
  constructor() {
    super('carritos');
  }
}

module.exports =  ProductosDaosFirebaseCart;
