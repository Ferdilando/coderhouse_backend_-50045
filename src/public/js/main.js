
const socket = io();

socket.emit("hola", "hola server")

socket.on("productos", (data) => {
    //console.log(data)
    renderProductos(data)
})

const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
                            <p> ${item.id} </P>
                            <p> ${item.title} </P>
                            <p> ${item.description} </P>
                            <p> ${item.price} </P>
                            <button> Eliminar </button>
        `
        contenedorProductos.appendChild(card)

        card.querySelector("button").addEventListener("click", () =>{
            eliminarProducto(item.id)
        })
    })
}

const eliminarProducto = (id) => {
    socket.emit("eliminarProducto", id)
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
        category: document.getElementById("category").value,
    }
    socket.emit("agregarProducto", producto)
}