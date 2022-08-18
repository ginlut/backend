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

