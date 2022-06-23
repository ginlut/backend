const express = require('express')
const handlebars = require('express-handlebars')
const rutas = require('./routes/index')
const puerto = 8080
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', rutas) 


/*-----------------------------------------------------------*/

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

/*-----------------------------------------------------------*/

app.listen(puerto, err => {
    if (err) {
        console.log(`Se produjo un error al iniciar el servidor ${err}`)
    } else {
        console.log(`El servidor esta escuchando el puerto: ${puerto}`)
    }
})