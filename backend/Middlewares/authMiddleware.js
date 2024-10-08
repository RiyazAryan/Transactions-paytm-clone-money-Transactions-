const jwt= require("jsonwebtoken");
require("dotenv").config()
const secret = process.env.JWT_SECRET

const authMiddelware=(req,res,next)=>{
    const auth=req.headers.authorization;
    if(!auth || !auth.startsWith("Bearer ")){
        return res.status(403).send()
    }
    const token=auth.split(" ")[1];
    try{
        const decoded =jwt.verify(token, secret)
        req.userId=decoded.userId;
        next();
    }
    catch(err){
        res.status(403).send("Unauthorized. Token expired or not valid.")
    }
}

module.exports={
    authMiddelware
}