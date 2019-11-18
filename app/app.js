const express = require('express')
const router = require('./router/chaos')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(router)

app.listen(port, ()=>{

    console.log('App Started on port ' + port)
})