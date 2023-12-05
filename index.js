require('dotenv').config();
const express = require('express');
const dbConnection = require('./dataBase');
const app  = express();
const cors = require('cors')
const userroute = require('./routes/userRoute')
const auth = require('./middlewares/auth');
const noteroute = require('./routes/PostRoute');
const cookieParser = require('cookie-parser');
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use((err,req,res,next)=>{
    auth();
    next();
})

app.use(cors())
app.use(cookieParser());
app.use('/',userroute);
app.use('/' , noteroute)
app.listen(8000 , ()=>{
    dbConnection(process.env.DATABASE_URI);
    console.log('server started');
})