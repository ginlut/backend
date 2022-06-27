const express = require('express')
//const handlebars = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const ContenedorMensajes = require('./api/contenedorMensajes')
const Productos = require('./api/productos')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const puerto = 8080

const productosApi = new Productos()
const mensajesApi = new ContenedorMensajes('archivo-mensajes.json')


/*------------- SERVIDOR APP-----------------------*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/*------------- SOCKET.IO-----------------------*/

io.on('connection', async socket => {
    console.log('Se ha conectado un nuevo usuario');

    //Tabla de productos introducidos
    socket.emit('productos', productosApi.getAll());

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
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
