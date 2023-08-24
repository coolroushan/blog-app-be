const express=require('express')
const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const { UserModel } = require('../model/user.model')


const userRouter=express.Router()


userRouter.post("/register", async(req, res)=>{
    const {username, avatar, email, password}=req.body
    try {
        bcrypt.hash(password,5, async(err, hash)=>{
            if(err){
                res.status(200).json({err:err.message})
            }else{
                const user= new UserModel({username, avatar, email, password:hash})
                await user.save()
                res.status(200).json({msg:"New user has been added", user:req.body})
                
            }
        })
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
try {
    const user= await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password, (err,result)=>{
            if(result){
                let token=jwt.sign({userID:user._id},process.env.secret)
                res.status(200).json({msg:"Login Successful", token})
            }else{
                res.status(200).json({msg: 'Invalid Credentials'})
            }
        })
    }else{
        res.status(200).json({msg: 'User not found'})
    }
    
} catch (error) {
    res.status(400).json({error: error.message})
}

})



module.exports={
    userRouter
}