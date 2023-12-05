const post = require("../models/postModal");
const User = require("../models/userModal");

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
  const { title, description } = req.body;
  const NewPost = await post.create({
    title,
    description,
    user: req.id,
  });
  res.json({ message: NewPost });
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
    let UpPost = await post
      .findOneAndUpdate({ _id: id },req.body,{new:true})
      .where({ user:req.id });
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
