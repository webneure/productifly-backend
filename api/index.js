const express = require('express');
const cors = require('cors')
const app = express();
const payment = require('./payment.js')
// demo hellow rpwrld
app.use('/',(req,res) =>{
    res.send('hello wrold')
})
// payment routes
app.use('/payment',payment)

app.use(cors())

app.listen('5000',function(){
    console.log('server connected succesful')
})