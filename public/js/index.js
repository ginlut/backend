const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }
    socket.emit('update', producto);
    formAgregarProducto.reset()
})

socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('plantillas/index.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMessage = document.getElementById('inputMessage')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const message = { autor: inputUsername.value, texto: inputMessage.value }
    socket.emit('newMessage', message);
    formPublicarMensaje.reset()
    inputMessage.focus()
})

socket.on('messages', messages => {
    const html = makeHtmlList(messages)
    document.getElementById('messages').innerHTML = html;
})

function makeHtmlList(messages) {
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

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMessage.value.length
    inputMessage.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMessage.addEventListener('input', () => {
    const hayTexto = inputMessage.value.length
    btnEnviar.disabled = !hayTexto
})
