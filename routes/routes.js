const { Router, express } = require('express');
const {productosApi} = require("../databases/daos/ProductosDaoMongoDb");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const router = Router()
const { login, auth, checkAuth } = require("../middlewares")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const users = [];


router.use(cookieParser());

router.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://GinaLutfallah:Gina123@cluster0.9yyhw.mongodb.net/?retryWrites=true&w=majority"}),
    secret: 'backend',
    resave: false,
    saveUninitialized: false,
    rolling: true, 
    cookie: {
      maxAge: 500000,
      httpOnly: false,
      secure: false
    },
  })
);

router.get("/", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  }
);

router.get('/data', checkAuth, (req, res)=>{
  res.json({ user: req.session.user.username})
});

router.get("/login", login, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"))});
  

router.post('/login', (req, res) => {
  const user = users.find((user) => user.username === req.body.username);

  if (!user || user.password !== req.body.password) {
    return res.json({ error: true, message: "Usuario y/o contraseña inválidos" });
  }
  req.session.user = user;

  console.log(user)
  res.redirect('/')

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


router.post("/signup", (req, res) => {
  
  const existingUser = users.find(
    (user) => req.body.username === user.username
  );

  if (existingUser) {
    return res.json({ error: true,
      message: "El usuario ya existe" });
  }
  const user = {username: req.body.username, password: req.body.password}
  users.push(user);
  //console.log(users)
  res.redirect("/login");
});



router.get('/logout', (req, res) => {
  if (req.session.user) {
      req.session.destroy(err => {
          if (!err) {
              res.sendFile(path.join(__dirname, "../public/login.html"))
          } else {
              res.redirect('/')
          }
      })
  } else {
      res.redirect('/')
  }
})




/*----------------------PRODUCTOS-------------------------- */



router.get('/api/productos-test', async function(req, res) {
  res.json(await productosApi.saveFaker(5))
})


router.get('/api/productos', async function (req, res) {
    res.json(await productosApi.getAll())
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

  router.get('/api/mensajes-test', async function (req, res) {
    res.json(await mensajesApi.getAll())
  })




module.exports = router;