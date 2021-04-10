const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  socket.broadcast.emit('hi')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

server.listen(1337, () => {
  console.log('listening on *:1337')
})
