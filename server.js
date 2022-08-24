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
const passport = require("passport");
const initPassport = require( './passport/init')
const routes = require('./routes/routes')(passport)
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require( "mongoose")



mongoose.connect("mongodb+srv://GinaLutfallah:Gina123@cluster0.9yyhw.mongodb.net/?retryWrites=true&w=majority");



app.use(cookieParser());

app.use(
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



// PASSPORT
app.use(passport.initialize());

app.use(passport.session());
app.use(passport.authenticate('session'));
initPassport(passport);
app.use('/', routes) 


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

