const ContenedorFirebase = require("../../contenedores/productos/contenedorFirebase");

class ProductoDaosFirebase extends ContenedorFirebase {
  constructor() {
    super("productos");
  }
}


module.exports =  ProductoDaosFirebase;
