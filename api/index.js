const express = require('express');
const cors = require('cors')
const app = express();
const payment = require('./payment.js')
const morgan = require('morgan')
const bodyParser = require("body-parser");
//data parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

app.use('/demo',(req,res)=>{
    res.send('hello world')
})
app.use('/api',(req,res)=>{
        res.json({
            name:'priya',
            age:22,
            profession:'developer and entrepreneure'
        })
        // res.send('hello priyanka')
})
// payment routes
app.use('/payment',payment)
// cors policy
app.use(cors())
//http request logger
app.use(morgan('tiny'))
app.listen(PORT,function(){
    console.log('server connected succesful')
})