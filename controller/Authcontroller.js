const jwt = require('jsonwebtoken')
const User = require('../models/userModal');

async function showUsers(req,res){
    const Allusers = await User.find({});
    console.log(Allusers);
    if(Allusers === null){
        res.status(400).json({message:"no users found"});
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
 return res.status(400).json({message:'No user Found'})
}
if(ExistingUser.password != password){
   return res.status(400).json({message:'invalid Credentials'})
}
else{
    token = jwt.sign({id: ExistingUser._id},process.env.SECRET_KEY , {expiresIn:'60h'})
    const oneDay = 1000*60*60*24;
    res.cookie('token' , token,{
        httpOnly:true,
        expires:new Date(Date.now() + oneDay),
        secure:false    
    })
    ExistingUser.password=undefined;
  res.status(200).send({ExistingUser, token});
}
}
// show single user
async function SingleUser(req, res){
    try {
        let SingleUser  = await User.findOne({_id:req.id})
        SingleUser.password=undefined
        if(!SingleUser){
            res.status(400).send(Error);
        }
        res.send(SingleUser);
    } catch (error) {
        res.send(error)
    }
    
}

async function logout(req,res){
   res.cookie('token' ,'logout' ,{
    httpOnly:true,
    expires:new Date(Date.now())
   })
   res.json({message:'You are Logged Out'})
}

module.exports = { CreateUser, showUsers, signUser,logout,SingleUser

}