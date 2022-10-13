const { Router, express } = require('express');
const router = Router()
const compression = require('compression')
router.use(compression()) 

const RouterUsers = require('./usuarios.routes')
const usuarioRouter = new RouterUsers()

const RouterCart = require('./carrito.routes')
const carritoRouter = new RouterCart()

const RouterProducts = require('./productos.routes')
const productosRouter = new RouterProducts()

const ApiRouterProducts = require('./apiProductos.routes')
const apiProductosRouter = new ApiRouterProducts()

const { auth} = require("../src/middlewares")

  router.use("/usuarios", usuarioRouter.start())
  router.use("/carrito", carritoRouter.start())
  router.use("/productos", productosRouter.start())
  router.use("/api/productos", apiProductosRouter.start())
  router.get("/", auth,(req, res) => {
      res.redirect('/productos')
  });

  
  module.exports = router;
  