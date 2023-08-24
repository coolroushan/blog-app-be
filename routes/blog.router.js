const express=require('express')
const { auth } = require('../middleware/auth.middleware')
const { BlogModel } = require('../model/blog.model')

const blogRouter=express.Router()

blogRouter.use(auth)

blogRouter.post("/add",async(req,res)=>{
    try {
        const blog=new BlogModel(req.body)
        await blog.save()
        res.status(200).json({msg:"Blog has been added", blog: req.body})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

blogRouter.get("/",async(req,res)=>{
try {
    const blog = await BlogModel.find()
    res.status(200).json({blog})
    
} catch (error) {
    res.status(400).json({error:error.message})
}
})

blogRouter.patch("/edit/:id",async(req,res)=>{
    const {id}=req.params
    const userDocID=req.body.userID
    try {
        const blog=await BlogModel.findOne({_id:id})
        const userBlogID=blog.userID
        if(userDocID===userBlogID){
            await BlogModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).json({msg: "Blog has been updated"})
        }else{
            res.status(200).json({msg: "Not Authorized"})
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

blogRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    const userDocID=req.body.userID
    try {
        const blog=await BlogModel.findOne({_id:id})
        const userBlogID=blog.userID
        if(userDocID===userBlogID){
            await BlogModel.findByIdAndDelete({_id:id},req.body)
            res.status(200).json({msg: "Blog has been delete"})
        }else{
            res.status(200).json({msg: "Not Authorized"})
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports={
    blogRouter
}