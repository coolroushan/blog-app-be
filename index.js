const express=require('express')
const cors=require('cors')
const { connect } = require('./db')
const { userRouter } = require('./routes/user.router')
const { blogRouter } = require('./routes/blog.router')

require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())

app.use("/user", userRouter)
app.use("/blogs", blogRouter)


app.listen(process.env.port,async()=>{
    try{
        await connect
        console.log("DB is connected")
        console.log(`server is running at ${process.env.port}`)
    }catch(err){
        console.log(err.message)
    }
    
})