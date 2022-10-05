const { Router, express } = require('express');
const DaoFactory =require("../src/utils/databases/daos/daoFactory")
const daoFactory = new DaoFactory();
const productDao = daoFactory.createDao();
const {carritosApi} = require("../src/utils/databases/daos/index.daos");
const path = require("path");
const router = Router()
const { login, auth, checkAuth } = require("../src/middlewares")
const util = require("util");
const compression = require('compression')
router.use(compression())
const logger = require('../src/utils/logs/logger')
const cartModel = require('../src/utils/databases/models/carrito.model')
const userModel = require('../src/utils/databases/models/usuario.model')
const passport = require ('passport') 



router.get("/", async (req, res)  => {
  if(req.isAuthenticated()){
    try {
      let cart = await cartModel.findOne({ username: req.user.username })
      if (!cart) {
        cart = new cartModel({
          username: req.user.username,
          products: [],
        })
        cart.save()
      }
      const productsInCart = cart.productos
      let valorInicial= 0
      const total = productsInCart.reduce((sum, product) => sum + product.precio, valorInicial)
      res.render('cart', { productos: productsInCart, total: total })
    } catch (error) {
      logger.error(`No estás autenticado, por favoor ingresa tus datos`)
    }
  }  else{
      res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))}   
})
  

router.post('/addProductos', async function(req, res){
  const user = req.user
  const product = await productDao.getById(req.body.productId)
  let cart = await cartModel.findOne({ username: req.user.username })
  if (!cart) {
    cart = new cartModel({
      username: user.username,
      products: [],
    })
    cart.save()
  }
  (await carritosApi.addProductToCart(cart.id, product))
})

router.post('/deleteproductos/:id_prod', async function(req, res) {
  if(req.isAuthenticated()){
    try {
      const cart = await cartModel.findOne({ username: req.user.username })
      const productos = cart.productos
      const index = productos.findIndex((prod)=> prod._id == req.params.id_prod)
          if (index > -1) {
              productos.splice(index, 1);
          }
          const updatedCart = await cart.updateOne({productos: productos});
          res.redirect('/carrito');
    } catch (error) {
      logger.error(`No se ha encontrado el producto`)
    }
}})

router.post('/buyCarrito', async function(req, res){
  if(req.isAuthenticated()){
    try {
    const usuario = await userModel.findOne({email: req.username})
    await carritosApi.buyCart(usuario)
    res.redirect('/productos');
    }
    catch (error) {
      logger.error(`${error}`)
  }
}})


module.exports = router;
