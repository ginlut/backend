const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const handlebars = require('express-handlebars')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const puerto = 8080
const {productosApi} = require("./databases/daos/ProductosDaoMongoDb");
const ContenedorMensajes = require('./api/contenedorMensajes')
const mensajesApi = new ContenedorMensajes('mensajes')
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const { login, auth } = require("./middlewares")
const routes = require('./routes/routes')



/*------------- SERVIDOR APP-----------------------*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`));

app.engine(
  "hbs",
  handlebars({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
  })
);
app.set("view engine", "hbs");
app.set("views", "./public");

app.use(cookieParser());
app.use('/', routes) 
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://GinaLutfallah:Gina123@cluster0.9yyhw.mongodb.net/?retryWrites=true&w=majority",
    }),
    secret: 'backend',
    resave: false,
    saveUninitialized: false,
    rolling: true, 
    cookie: {
      maxAge: 500000,
    },
  })
);


app.get("/", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "/public/home.html"));
  }
);

app.get('/data',(req, res)=>{
  res.json({ user: req.session.username})
})

app.get("/login", login, (req, res) => {
  res.sendFile(path.join(__dirname, "./public/login.html"))});
  



app.get("/api/login", async (req, res) => {
  try {
    req.session.username = req.query.username;
    res.redirect("/");
  } catch (err) {
    res.json({ error: true, message: err });
  }
});



app.post('/login', (req, res) => {
  req.session.username = req.body.username
  res.redirect('/')
})

app.get('/logout', (req, res) => {
  if (req.session.username) {
      req.session.destroy(err => {
          if (!err) {
              res.sendFile(path.join(__dirname, "./public/logout.html"))
          } else {
              res.redirect('/')
          }
      })
  } else {
      res.redirect('/')
  }
})

/*------------- SOCKET.IO-----------------------*/

io.on('connection', async socket => {
   // console.log('Se ha  un nuevo usuario');

    //Tabla de productos introducidos

    socket.emit( 'productos', await productosApi.getAll());

    socket.on('update', producto => {
        productosApi.save(producto)
        io.sockets.emit('productos', productosApi.getAll());
    })
    
    //Mensajes del chat
    socket.emit('messages', await mensajesApi.getAll());

    socket.on('newMessage', async message => {
        message.time = new Date().toLocaleString()
        await mensajesApi.save(message)
        io.sockets.emit('messages', await mensajesApi.getAll());
    })
    
})

 /*---------------SERVIDOR-------------------*/   

 const connectedServer = httpServer.listen(puerto, () => {
    //console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

