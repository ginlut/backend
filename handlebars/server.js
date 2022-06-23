const express = require('express')
const handlebars = require('express-handlebars')
const rutas = require('./routes/index')
const puerto = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', rutas) 


/*-----------------------------------------------------------*/

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

/*-----------------------------------------------------------*/

app.listen(puerto, err => {
    if (err) {
        console.log(`Se produjo un error al iniciar el servidor ${err}`)
    } else {
        console.log(`El servidor esta escuchando el puerto: ${puerto}`)
    }
})