const { Router, express } = require('express');
const path = require("path");
const router = Router()
const CartController=require("../controllers/carritos.controller")
const { auth} = require("../src/middlewares")
const compression = require('compression')
router.use(compression())


class RouterCart{
  constructor() {
    this.controller = new CartController();
  }
  start() {

  router.get("/", auth, this.controller.getProductsInCart);
  router.post('/addProductos', this.controller.addProductToCart);
  router.post('/deleteproductos/:id_prod', auth, this.controller.removeProductFromCart);
  router.post('/buyCarrito', auth, this.controller.buyCarrito);

  return router;
  }

}


module.exports = RouterCart;
