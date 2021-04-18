import express from 'express'
import path from 'path'

const app = express(),
      port = process.env.PORT || 1337

const __dirname = path.resolve()

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public','index.html'))
})
app.listen(port, ()=>{
    console.log(`\n\nServer start on ${port} port...`)
})