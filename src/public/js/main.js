
const socket = io();

socket.on("productos", (data) => {
    //console.log(data)
    renderProductos(data)
})

let user
const chatBox = document.getElementById("chatBox")
Swal.fire({
    title: "Tu nombre?",
    input: "text",
    text: "Ingrese su nombre",
    inputValidator: (value) => {
        return !value && "Por favor ingrese su nombre"
    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value
    console.log(user)
})
socket.emit("hola", "como estas?")

chatBox.addEventListener('keyup', (event) => {
    if(event.key === "Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message", {user: user, message: chatBox.value})
            chatBox.value = ""
        }
    }
})

socket.on("messagesLogs", (data) => {
    let log = document.getElementById("messagesLogs")
    let mensajes = ""
    data.forEach(mensaje => {
        mensajes = mensajes + `${mensaje.user} dice: ${mensaje.message}<br>`
    })
    log.innerHTML = mensajes
})

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
                            <p> Producto: ${item.title} </P>
                            <p> Descripcion: ${item.description} </P>
                            <p> Precio: ${item.price} </P>
                            <p> Stock: ${item.stock} </P>
                            <button> Eliminar </button>
        `
        contenedorProductos.appendChild(card)

        card.querySelector("button").addEventListener("click", () =>{
            eliminarProducto(item._id)
        })
    })
}

const eliminarProducto = (_id) => {
    socket.emit("eliminarProducto", _id)
}

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto();
})

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
    }
    socket.emit("agregarProducto", producto)
}