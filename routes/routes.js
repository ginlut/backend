const { Router, express } = require('express');
const {productosApi} = require("../databases/daos/ProductosDaoMongoDb");
const path = require("path");
const router = Router()
const { login, auth, checkAuth } = require("../middlewares")
const passport = require("passport");


module.exports = function(passport){

router.get("/", (req, res) => {
  if(req.isAuthenticated()){
    res.sendFile(path.join(__dirname, "../public/home.html"));
  }else{
    res.sendFile(path.join(__dirname, "../public/login.html")); 
  }}
);

router.get('/data',(req, res)=>{
  res.json({username: req.user.username})
})

router.get("/login", (req, res) => {
  if(req.isAuthenticated()){

    res.redirect('/')
    }else{
      res.sendFile(path.join(__dirname, "../public/login.html"))}
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
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});


router.post('/signup',passport.authenticate('signup',{ failureRedirect: '/failedSignup',failureMessage: true}),(req, res)=>{
  console.log('req- metodo post-login',req.body)   
  res.redirect('/login') 
})


///FAIL SIGNUP
router.get('/failedSignup',(req, res)=>{
res.sendFile(path.join(__dirname, "../public/plantillas/failedSignup.html"));
})



router.get('/logout',  function(req, res, next) {
  let user= req.user.username
  req.logout(function(err) {  
    if (err)  return next(err); 
  res.send(`<h1>Hasta luego ${user}</h1>
      <script type="text/javascript">
      setTimeout(function(){ location.href = '/login'},2000)
      </script>`
    )
})})

return router;
}

/*----------------------PRODUCTOS-------------------------- */



// router.get('/api/productos-test', async function(req, res) {
//   res.json(await productosApi.saveFaker(5))
// })


// router.get('/api/productos', async function (req, res) {
//     res.json(await productosApi.getAll())
//   })

//   router.get('/api/productos/:id', async function (req, res) {
//     res.json(await productosApi.getById(req.params.id))
//   })

//   router.post('/api/productos', async function(req, res) {
//       res.json(await productosApi.save(req.body))
//   })


//   router.put('/api/productos/:id', async function (req, res) {
//       res.json(await productosApi.updateProducts(req.body, req.params.id))
//   })


//   router.delete('/api/productos/:id', async function (req, res) {
//    res.json(await productosApi.deleteById(req.params.id))
//   })

//   router.get('/api/mensajes-test', async function (req, res) {
//     res.json(await mensajesApi.getAll())
//   })




//module.exports = router;