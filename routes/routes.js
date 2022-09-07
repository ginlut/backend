const { Router, express } = require('express');
const {productosApi} = require("../databases/daos/ProductosDaoMongoDb");
const path = require("path");
const router = Router()
const { login, auth, checkAuth } = require("../middlewares")
//const passport = require("passport");
const util = require("util");
const { fork } = require("child_process");
const compression = require('compression')
router.use(compression())
const logger = require("../logger")



module.exports = function(passport){

router.get("/datos"),(req, res) => {
  res.send("Server fork" )}


router.get("/info", (req, res) => {
  console.log(  `Titulo del proceso: ${process.title}
  Sistema operativo: ${process.platform}
  Version de Node: ${process.version}
  Memoria total reservada: ${util.inspect(process.memoryUsage(), {
    showHidden: false,
    depth: null,
    colors: true})}
  Path de ejecución: ${util.inspect(process.execPath)}
  Process id: ${process.pid}    
  Carpeta del proyecto: ${process.cwd()}
  Procesadores presentes: ${process.pid}`)
  res.json(
  `Titulo del proceso: ${process.title}
  Sistema operativo: ${process.platform}
  Version de Node: ${process.version}
  Memoria total reservada: ${util.inspect(process.memoryUsage(), {
    showHidden: false,
    depth: null,
    colors: true})}
  Path de ejecución: ${util.inspect(process.execPath)}
  Process id: ${process.pid}    
  Carpeta del proyecto: ${process.cwd()}
  Procesadores presentes: ${process.pid}`
    )})


// router.get("/api/randoms",(req, res) => { 
//   const forked = fork("child.js");
//   forked.send(req.query.cant ? Number(req.query.cant) : 100000000)
//   forked.on('message', (msg) => {
//   res.json(msg);
//   });
// });


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
    logger.info(`Ingreso exitoso`);
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



router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {     console.log(err); return next(err); }
  });
  res.redirect('/');

  router.get('/api/mensajes', async function (req, res) {
    try{
      res.json(await mensajesApi.getAll())}
      catch(err){
        logger.error(`error ${err} al mostrar mensajes`);
      }
  })

  app.get("*", (req, res) => {
    const { url, method } = req;
    logger.warn(`Ruta ${method} ${url} no implementada`);
    res.send(`Ruta ${method} ${url} no está implementada`);
  });
})  

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






//module.exports = router;