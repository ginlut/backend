const { Router, express } = require('express');
const router = Router()
const { auth} = require("../src/middlewares")
const ProductsController =require("../controllers/productos.controller")
const compression = require('compression')
router.use(compression())
 
class RouterProducts{
  constructor() {
    this.controller = new ProductsController();
  }
  start() {
    router.get("/", auth, this.controller.getAll);
    router.post("/:id", this.controller.createProduct);
    router.put("/:id", this.controller.updateProducts);
    router.get("/:id", this.controller.getById);
    router.delete("/:id", this.controller.deleteById);
    
    return router;
  }
}

module.exports = RouterProducts;
  