const post = require("../models/postModal");
const User = require("../models/userModal");
const cloudinary = require('cloudinary')
const fs = require('fs');
// import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

  


const ShowAllPosts = async(req,res)=>{
  try {
    let AllPosts = await post.find({}).populate("user")
  res.status(200).json({AllPosts});
  } catch (error) {
    res.status(400).json(error);
  }
  
}

const ShowPost = async (req, res) => {
  console.log(req.cookies);
  const id = req.id;
  const userPosts = await post.find({ user: id });
  if (!userPosts) {
    res.send("No post found");
  } else {
    res.json({ message: userPosts });
  }
};
const CreatePost = async (req, res) => {
  let newPost = {...req.body}
      newPost.user = req.id
 if(req.file){
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  // { public_id: "olympic_flag" }, 
  // function(error, result) {console.log(result); });
  console.log(result);
  fs.unlink(req.file.path ,(err)=>{console.log(err)})
  newPost.imgurl = result.secure_url;
  newPost.imgid = result.public_id;
 }
  const FinalCreatedPost = await post.create({...newPost});
  res.send(FinalCreatedPost);
};

const deletePost = async (req, res) => {
  let { id } = req.params;

  try {
    let Posts = await post
      .findOneAndDelete({ _id: id })
      .where({ user: req.id });
    console.log(Posts);

    res.json({ Posts });
  } catch (error) {
    console.log(error);
  }
};

const Updatepost = async (req, res) => {
  let { id } = req.params;
  try {
    let newPost = {...req.body}
    if(req.file){
      let result = await cloudinary.v2.uploader.upload(req.file.path)
      fs.unlink(req.file.path,(err)=>console.log(err))
      newPost.imgurl = result.secure_url
      newPost.imgid = result.public_id
    }
    let UpPost = await post
      .findOneAndUpdate({ _id: id },{...newPost},{new:false}).where({ user:req.id });
      if(req.file && UpPost.imgid){
        await cloudinary.v2.api.delete_resources(UpPost.imgid)
      }
    res.json({ message: UpPost });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  ShowPost,
  CreatePost,
  deletePost,
  Updatepost,ShowAllPosts
};
