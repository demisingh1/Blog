require('dotenv').config();
const express = require('express');
const dbConnection = require('./dataBase');
const app  = express();
const userroute = require('./routes/userRoute')
const auth = require('./middlewares/auth');
const noteroute = require('./routes/PostRoute');
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use((err,req,res,next)=>{
    auth();
    next();
})


app.use('/',userroute);
app.use('/' , noteroute)
app.listen(8000 , ()=>{
    dbConnection(process.env.DATABASE_URI);
    console.log('server started');
})