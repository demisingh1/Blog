const post = require("../models/postModal");

const ShowPost = async (req, res) => {
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
  Updatepost,
};
