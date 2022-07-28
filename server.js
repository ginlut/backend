const express = require('express')
const { Server: HttpServer } = require('http')
const app = express()
const httpServer = new HttpServer(app)
const puerto = 8080
const routes = require('./routes/routes')


/*------------- SERVIDOR APP-----------------------*/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', routes) 


 /*---------------SERVIDOR-------------------*/   

 const connectedServer = httpServer.listen(puerto, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
