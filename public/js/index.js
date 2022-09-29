const socket = io.connect();

//Añadir productos a la tabla
const addProduct = document.getElementById('addProduct')
addProduct.addEventListener('submit', event => {
    event.preventDefault()
    const producto = {
        nombre: addProduct[0].value,
        precio: addProduct[1].value,
        foto: addProduct[2].value
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
    return fetch('views/products.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}
