const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const ContenedorMensajes = require('./api/contenedorMensajes')
const Productos = require('./api/productos')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const puerto = 8080
const {configMariaDB, configSQLite3} = require('./db')

const productosApi = new Productos(configMariaDB, 'productos')
const mensajesApi = new ContenedorMensajes(configSQLite3, 'mensajes')


/*------------- SERVIDOR APP-----------------------*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/api/productos', async function (req, res) {
    res.json(await productosApi.getAll())
  })

app.get('/api/productos/:id', async function (req, res) {
    res.json(await productosApi.getById(req.params.id))
  })

app.post('/api/productos', async function(req, res) {
      res.json(await productosApi.save(req.body))
  })


  app.put('/api/productos/:id', async function (req, res) {
      res.json(await productosApi.updateProducts(req.body, req.params.id))
  })


  app.delete('/api/productos/:id', async function (req, res) {
   res.json(await productosApi.deleteById(req.params.id))
  })
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

