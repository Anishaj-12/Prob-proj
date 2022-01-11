const express = require('express');
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const usersRoute = express.Router()
//Register

usersRoute.post('/register',asyncHandler(async (req, res)=>{
const {name, email, password} = req.body
const userExists = await User.findOne({ email: email});
if(userExists) {

    throw new Error('User Exist')
}
const userCreated = await User.create({email, name, password})
res.json({
    _id: userCreated._id,
    name:userCreated.name,
    password: userCreated.password,
    email: userCreated.password,
    token: generateToken(userCreated._id),
})
}))
 





//Login
usersRoute.post('/login', asyncHandler(async (req , res) =>{
  const {email , password} = req.body

  const user = await User.findOne({email})
 
  if(user && (await user.isPasswordMatch(password))){
//set status code
res.status(200)

res.json({
    _id: user._id,
    name:user.name,
    password: user.password,
    email: user.password,
    token: generateToken(user._id),
})
      res.send(user)


  }else {
      res.status(401);
      throw new Error('Invalid credentials')
  }

}))





//Update
usersRoute.put('/update', authMiddleware, (req,res)=>{
    res.send('Updated')
})

//Delete
usersRoute.put('/:id', (req,res)=>{
    res.send('Deleted')
})

//fetch users
usersRoute.get('/', authMiddleware, (req,res)=>{
    console.log(req.headers)
    res.send(req.headers)
})
 module.exports = usersRoute

/*
 usersRoute.post('/register',async (req,res)=>{
    try {
      const {name,email,password} = req.body;
      const user = await User.create({name, email , password})
      console.log(user);
     res.send(user)
 
    } catch (error) {
        res.send(error)
    }
    */