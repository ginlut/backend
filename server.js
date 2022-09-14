const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const handlebars = require('express-handlebars')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
require("dotenv").config();
const os = require("os");
const cluster = require("cluster");
const cpus = os.cpus();
const isCluster = process.argv[3] == "cluster";
const port = process.env.PORT || 8080;
const {productosApi} = require("./databases/daos/ProductosDaoMongoDb");
const ContenedorMensajes = require('./api/contenedorMensajes')
const mensajesApi = new ContenedorMensajes('mensajes')
const passport = require("passport");
const initPassport = require( './passport/init')
const routes = require('./routes/routes')(passport)
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require( "mongoose")
const { fork } = require("child_process");
const logger = require("./logger")






mongoose.connect(process.env.MONGO_URL);

app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGO_URL}),
    secret: process.env.SECRET,
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

/*------------- SERVIDOR APP-----------------------*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static(`${__dirname}/public`));

app.engine(
  "hbs",
  handlebars({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
  })
);
app.set("view engine", "hbs");
app.set("views", "./public");
app.use('/', routes) 



// PASSPORT
app.use(passport.initialize());

app.use(passport.session());
app.use(passport.authenticate('session'));
initPassport(passport);

const connectedServer = httpServer.listen(process.env.PORT || 8080, () => {
    logger.info(`Servidor http escuchando en el puerto ${connectedServer.address().port} - PID ${process.pid}`)
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


