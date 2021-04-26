import express from 'express'
import path from 'path'
import pug from 'pug'
import http from 'http'
import { Server } from "socket.io";

const app = express(),
      server = http.createServer(app),
      io = new Server(server),
      PORT = process.env.PORT || 1337,
      __dirname = path.resolve()


app.use(express.static(path.resolve(__dirname,'public')))
app.use(express.static('socket.io'))

app.set('view engine', 'pug')
app.set('views', './views')


app.get('/', (req, res) => {
    //res.sendFile('/socket.io/socket.io.js')
    res.render('index')})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
        console.log('message: ' + msg);
    });
});



server.listen(PORT, ()=>{
    console.log('   running on http://localhost:'+PORT)
})