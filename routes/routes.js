const { Router, express } = require('express');
const path = require("path");
const router = Router()
const util = require("util");
const compression = require('compression')
router.use(compression()) 
const usuarioRouter = require('./usuarios.routes')
const carritoRouter = require('./carrito.routes')
const productosRouter = require('./productos.routes')

  router.use("/usuarios", usuarioRouter)
  router.use("/carrito", carritoRouter)
  router.use("/productos", productosRouter)

  router.get("/", (req, res) => {
    if(req.isAuthenticated()){
      res.redirect('/productos')
      //res.render("home", {username: req.user.username, avatar: req.user.avatar});
    }else{
      res.sendFile(path.join(__dirname, "../public/plantillas/login.html")); 
    }}
  );

  
  module.exports = router;
  