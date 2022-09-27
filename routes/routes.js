const { Router, express } = require('express');
const {productosApi} = require("../src/utils/databases/daos/ProductosDaoMongoDb");
const {carritosApi} = require("../src/utils/databases/daos/CarritosDaoMongoDb");
const path = require("path");
const router = Router()
const { login, auth, checkAuth } = require("../src/middlewares")
const util = require("util");
const compression = require('compression')
router.use(compression())
const upload = require ('../src/multer/multer')
const logger = require('../src/utils/logger')
const cartModel = require('../src/utils/databases/models/carrito')
const userModel = require('../src/utils/databases/models/usuario')


module.exports = function(passport){
  
  router.get("/", (req, res) => {
    if(req.isAuthenticated()){
      res.redirect('/api/productos')
      //res.render("home", {username: req.user.username, avatar: req.user.avatar});
    }else{
      res.sendFile(path.join(__dirname, "../public/plantillas/login.html")); 
    }}
  );
  
  router.get("/login", (req, res) => {
    if(req.isAuthenticated()){
  
      res.redirect('/')
      }else{
        res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))}
  });
  
  router.post('/login',passport.authenticate('login',
    {failureRedirect: '/failedLogin',failureMessage: true}),
    (req, res)=>{
        res.redirect('/')
      }
  )
  
  
  router.get('/failedLogin',(req, res)=>{
    res.sendFile(path.join(__dirname, "../public/plantillas/faillogin.html"));
  })
    
  
  
  router.get("/api/login", async (req, res) => {
    try {
      req.session.username = req.query.username;
      res.redirect("/");
    } catch (err) {
      res.json({ error: true, message: err });
    }
  });
  
  
  router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/plantillas/signup.html"));
  });
  
  
  router.post('/signup',upload.single('myFile'),passport.authenticate('signup',{ failureRedirect: '/failedSignup',failureMessage: true}),(req, res)=>{
    //console.log('req- metodo post-login',req.body)   
    res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))
  })
  
  
  ///FAIL SIGNUP
  router.get('/failedSignup',(req, res)=>{
  res.sendFile(path.join(__dirname, "../public/plantillas/failedSignup.html"));
  })
  
  
  
  router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) {     console.log(err); return next(err); }
    });
    res.redirect('/');
  })  

  router.get("/user", (req, res)=>{
    if(req.isAuthenticated()){
      res.render('user', { user: req.user })
      }else{
        res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))}
  })





  /*----------------------PRODUCTOS-------------------------- */
router.get('/api/productos', async function (req, res) {
  if(req.isAuthenticated()){
    try {
      const products = await productosApi.getAll()
      res.render('products', { products })
    } catch (error) {
    // logger.warn('error', error)
      res.status(404).json({ message: error.message })}
   }
  else{
    res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))}   
})

  router.get('/api/productos/:id', async function (req, res) {
    res.json(await productosApi.getById(req.params.id))
  })

  router.post('/api/productos', async function(req, res) {
      res.json(await productosApi.save(req.body))
  })


  router.put('/api/productos/:id', async function (req, res) {
      res.json(await productosApi.updateProducts(req.body, req.params.id))
  })


  router.delete('/api/productos/:id', async function (req, res) {
   res.json(await productosApi.deleteById(req.params.id))
  })

  /*----------------------CARRITO-------------------------- */

  router.get("/carrito", async (req, res)  => {
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
        res.status(404).json({ message: error.message })
      }
    }  else{
        res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))}   
    })
  
  router.post('/api/carrito/addProductos', async function(req, res){
    const user = req.user
    const product = await productosApi.getById(req.body.productId)
    let cart = await cartModel.findOne({ username: req.user.username })
    console.log(cart)
    if (!cart) {
      cart = new cartModel({
        username: user.username,
        products: [],
      })
      cart.save()
    }
    (await carritosApi.addProductToCart(cart.id, product))
  })
  
  router.post('/api/carrito/deleteproductos/:id_prod', async function(req, res) {
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
        res.status(404).json({ message: error.message })
      }
  }})

  router.post('/api/carrito/buyCarrito', async function(req, res){
    if(req.isAuthenticated()){
      try {
      const usuario = await userModel.findOne({email: req.username})
      await carritosApi.buyCart(usuario)
      res.redirect('/api/productos');
      }
      catch (error) {
      res.status(404).json({ message: error.message })
    }
  }})

  
  return router;
  }