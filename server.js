const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const handlebars = require('express-handlebars')


const ContenedorMensajes = require('./api/contenedorMensajes')
const Productos = require('./api/productos')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const puerto = 8080
const {configMariaDB} = require('./db')

const productosApi = new Productos(configMariaDB, 'productos')
const mensajesApi = new ContenedorMensajes('mensajes')

const { faker } =require('@faker-js/faker');
const normalize = mensajesApi.normalize()

//console.log(normalize)



/*------------- SERVIDOR APP-----------------------*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+"/public"));

app.engine(
  "hbs",
  handlebars({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
  })
);
app.set("view engine", "hbs");
app.set("views", "./public");


app.post('/api/productos-test', async function(req, res) {
    res.json(await productosApi.saveFaker(req.body))
})

app.get('/api/productos-test', async function (req, res) {

    const productos = [];
      for  (let i = 0; i<6; i++){
        const producto = {};
          producto.title= faker.commerce.productName(),
          producto.price= faker.commerce.price(),
          producto.thumbnail= faker.image.imageUrl(),
          producto.description= faker.commerce.productDescription(),
          producto.code= faker.random.alphaNumeric(5),
          producto.stock= faker.random.numeric()
          productos.push(producto)
      }
      const template = handlebars.compile("index.hbs");
      const html = template({ productos })
      console.log(html)
     res.status(200).render(html);
    
  })

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

  app.get('/api/mensajes-test', async function (req, res) {
    res.json(await mensajesApi.getAll())
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

