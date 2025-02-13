import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"

//app config

const app = express()
const port = process.env.PORT || 4000

connectDB()

//middleware

app.use(express.json())
app.use(cors())

//api end points

app.get('/',(req,res)=>{
    res.send("Api Working")
})

app.listen(port, ()=> console.log('Server is running on PORT : '+ port))