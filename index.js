const app = require('express')()
const http = require('http').createServer(app)


app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.on("send_message", (data) => {
        userSocket.broadcast.emit("receive_message", data)
    })
    userSocket.on("event_name", (data) => {
        console.log(data)
    })
    userSocket.broadcast.emit("event_name", data)
})

http.listen(process.env.PORT)