const jwt = require('jsonwebtoken')
const User = require('../models/userModal');

async function showUsers(req,res){
    const Allusers = await User.find({});
    console.log(Allusers);
    if(Allusers === null){
        res.status(200).json({message:"no users found"});
    }
    else{
        res.status(200).json({message:Allusers});
    }
}

async function CreateUser(req, res){
    const {name , email , password} = req.body;
const Newuser = await User.create({
    name,
    email,
    password
})

const token = jwt.sign({id:Newuser.id}, process.env.SECRET_KEY )
 res.status(200).json({Message:"new user Created" ,token});
}

async function signUser(req,res){
const {email,password} = req.body;
const ExistingUser = await User.findOne({email:email})
if(!ExistingUser){
 return res.status(200).json({message:'No user Found'})
}
if(ExistingUser.password != password){
   return res.json({message:'invalid Credentials'})
}
else{
    token = jwt.sign({id: ExistingUser._id},process.env.SECRET_KEY , {expiresIn:'60h'})
  res.json({message:ExistingUser , token});
}
}

module.exports = { CreateUser, showUsers, signUser

}