const express = require('express');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({storage})

const { ShowPost, CreatePost, deletePost, Updatepost, ShowAllPosts } = require('../controller/postController');
const { auth } = require('../middlewares/auth');
const route = express.Router();

route.get('/AllPosts',ShowAllPosts)
route.get('/posts',auth,ShowPost);
route.post('/posts',auth,upload.single('image'),CreatePost);
route.delete('/posts/:id',auth,deletePost);
route.patch('/posts/:id',auth,upload.single('image'),Updatepost);
module.exports = route;