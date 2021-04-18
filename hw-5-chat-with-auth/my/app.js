import express from 'express'
import path from 'path'
import pug from 'pug'
import {collor, requestTime} from "./midleware.js"

const app = express(),
      port = process.env.PORT || 1337,
      __dirname = path.resolve()


app.use(express.static(path.resolve(__dirname,'public')))
app.set('view engine','pug')
app.set('views', './views')

app.use(requestTime)
app.use(collor)

app.get('/', (req, res) => {
    res.render('index', {title: 'hi', 'name': 'u sus'})
})

app.listen(port, ()=>{
    let date = new Date()
    console.log(`\n\n\t${date.getHours()}.${date.getMinutes()}.${date.getSeconds()} : Server start on http://localhost:${port}...`)
})