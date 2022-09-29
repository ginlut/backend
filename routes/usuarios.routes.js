const { Router, express } = require('express');
const path = require("path");
const router = Router()
const { login, auth, checkAuth } = require("../src/middlewares")
const compression = require('compression')
router.use(compression())
const passport = require ('passport') 
const upload = require ('../src/multer/multer')


router.get("/micuenta", (req, res)=>{
    if(req.isAuthenticated()){
      res.render('user', { user: req.user })
      }else{
        res.sendFile(path.join(__dirname, "../public/plantillas/login.html"))}
  })

    
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
    
  
  

  
  
  router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/plantillas/signup.html"));
  });
  
  
  router.post('/signup',upload.single('myFile'),passport.authenticate('signup',{ failureRedirect: '/failedSignup',failureMessage: true}),(req, res)=>{ 
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


  module.exports = router;
  