const express = require("express");
const root=require("./Router/index");
const cors= require("cors")
const dotenv=require("dotenv")
dotenv.config()
const PORT= process.env.PORT

const app= express()

app.use(cors())
app.use(express.json())

app.use("/api/v1", root)

app.listen(PORT, '0.0.0.0',(err)=>{
if(!err){
    console.log("Successful")
}
})

