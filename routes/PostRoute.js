const express = require('express');
const { ShowPost, CreatePost, deletePost, Updatepost } = require('../controller/postController');
const { auth } = require('../middlewares/auth');
const route = express.Router();

route.get('/posts',auth,ShowPost);
route.post('/posts',auth,CreatePost);
route.delete('/posts/:id',auth,deletePost);
route.patch('/posts/:id',auth,Updatepost);
module.exports = route;