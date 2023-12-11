require('dotenv').config();
require('express-async-errors');
const express = require('express');
const dbConnection = require('./dataBase');
const app  = express();
const cors = require('cors')
const userroute = require('./routes/userRoute')
const auth = require('./middlewares/auth');
const noteroute = require('./routes/PostRoute');
const cookieParser = require('cookie-parser');
const path = require('path')
const cloudinary = require('cloudinary')
// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'ddn8tuw7s', 
  api_key: '575561338227957', 
  api_secret: 'x0WGf4fk8Ga-cutJ59fsooAlN7o' 
});



app.use('/static', express.static(path.join(__dirname, '/uploads')))
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