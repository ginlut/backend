const socket = io.connect();

//Añadir productos a la tabla
const addProduct = document.getElementById('addProduct')
addProduct.addEventListener('submit', event => {
    event.preventDefault()
    const producto = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
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

/*-----------------------------------*/

const username = document.getElementById('username')
const inputMessage = document.getElementById('inputMessage')
const btnSend = document.getElementById('btnSend')


// Publicar un mensaje
const postMessage = document.getElementById('postMessage')

postMessage.addEventListener('submit', event => {
    event.preventDefault()
    const message = { autor: username.value, texto: inputMessage.value }
    socket.emit('newMessage', message);
    postMessage.reset()
    inputMessage.focus()
    btnSend.disabled = true
})

socket.on('messages', messages => {
    const html = messageList(messages)
    document.getElementById('messages').innerHTML = html;
})

function messageList(messages) {
    return messages.map(message => {
        return (`
            <div>
                <b style="color:blue;">${message.autor}</b>
                [<span style="color:brown;">${message.time}</span>] :
                <i style="color:green;">${message.texto}</i>
            </div>
        `)
    }).join(" ");
}

username.addEventListener('input', () => {
    const emailPresent = username.value.length
    const messagePresent = inputMessage.value.length
    btnSend.disabled = !emailPresent || !messagePresent
})

inputMessage.addEventListener('input', () => {
    const emailPresent = username.value.length
    const messagePresent = inputMessage.value.length
    btnSend.disabled = !emailPresent || !messagePresent
})
