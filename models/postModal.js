const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
       title:{
        type:String,

       },
       description:{
        type:String,

       },
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       },
       imgurl:String,
       imgid:String,
})

const post = mongoose.model("post" , postSchema)
module.exports = post;