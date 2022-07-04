const socket = io.connect();

//Añadir productos a la tabla
const addProduct = document.getElementById('addProduct')
addProduct.addEventListener('submit', event => {
    event.preventDefault()
    const producto = {
        nombre: addProduct[0].value,
        descripcion: addProduct[1].value,
        codigo: addProduct[2].value,
        foto: addProduct[3].value,
        precio: addProduct[4].value,
        stock: addProduct[5].value,
    }
    socket.emit('update', producto);
    addProduct.reset()
})


// Mostrar tabla de productos

socket.on('productos', productos => {
    tableProducts(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function tableProducts(productos) {
    return fetch('plantillas/index.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

