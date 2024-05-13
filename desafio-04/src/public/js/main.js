// Aca van las respuesta del servidor a las distintas acciones del usuario
const socket = io()

// Enviamos dos mensajes
socket.emit("movimiento", "Ca7")

socket.emit("rendirse", "Me he rendido. Una vez mas...") // El primer parametro es la accion, el segundo parametro es el mensaje enviado

// Mi servidor espera dos mensajes
socket.on("mensaje-jugador", info => {
    console.log(info)
})

// Como nosotros emotivimos este mensaje y esta en "broadcast", no nos llegara
socket.on("rendicion", info => {
    console.log(info)
})