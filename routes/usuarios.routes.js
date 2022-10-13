const { Router, express } = require('express');
const path = require("path");
const router = Router()
const { auth} = require("../src/middlewares")
const compression = require('compression')
router.use(compression())
const UsersController =require("../controllers/usuarios.controller")
const passport = require ('passport') 
const upload = require ('../src/multer/multer')

class RouterUsers{
  constructor() {
    this.controller = new UsersController();
  }

  start() {
  router.get("/micuenta", auth, this.controller.getAcount);

  router.get("/login", auth, this.controller.home);

  router.post('/login',passport.authenticate('login',
    {failureRedirect: '/failedLogin',failureMessage: true}), this.controller.home);

  router.get('/failedLogin', this.controller.failedLogin);  

  router.get("/signup", this.controller.signup);  

  router.post('/signup',upload.single('myFile'),passport.authenticate('signup',{ failureRedirect: '/failedSignup',failureMessage: true}),this.controller.home); 
   
  router.get('/failedSignup',(req, res)=>{
  res.sendFile(path.join(__dirname, "../public/plantillas/failedSignup.html"));
  })
  
  router.get('/logout', this.controller.logout) 
  
  return router;
  }

}

  module.exports = RouterUsers;
  