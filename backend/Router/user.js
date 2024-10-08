const express = require("express")
const router=express.Router();

const zod= require("zod");
const jwt=require("jsonwebtoken");
const {User, Account}=require("../Models/db")
require("dotenv").config()
const {authMiddelware}= require("../Middlewares/authMiddleware")
const secret = process.env.JWT_SECRET

const checksignup =zod.object({
    username: zod.string().email(),
    firstName : zod.string(),
    password: zod.string().min(8)
})


const checksignin = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const checkupdate=zod.object({
    password: zod.string().min(8).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/",authMiddelware,async(req,res)=>{
    const check=checkupdate.safeParse(req.body)
    if(!check.success){
        return res.status(411).json({
            message:"Error: Incorrect Inputs"
        })
    }
    const exists= await User.updateOne({ _id: req.userId },
    { $set: req.body })
    if(exists){
        return res.status(200).json({
            message:"Updated Successfully",
            user:{
                username: exists.username,
                firstName: exists.firstName,
                lastName: exists.lastName
            }
        })
    }
    return res.status(500).json({
            message:"Internal Error. Please try again..."
        })
})

router.get("/bulk", authMiddelware, async(req,res)=>{
    const list=req.query.filter||"";

    const listusers=await User.find({
            $or: [
                {
                    firstName: {
                        "$regex": list,
                        "$options": "i"
                    }
                },
                {
                    lastName: {
                        "$regex": list,
                        "$options": "i"
                    }
                }
    ]
    })
    return res.status(200).json({
        user: listusers.filter(user => user._id.toString() !== req.userId).map((user)=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
 
router.post("/signup",async(req,res)=>{
    const check = checksignup.safeParse(req.body)
    if(!check.success){
        return res.status(411).json({
            message:"Error: Incorrect inputs"
        })
    }

    const exists= await User.findOne({
        username: req.body.username
    })
    if(exists){
        return res.status(411).json({
            message:"Email/Username already exists."
        })
    }
    const createdUser=await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })
    if (createdUser){
        const userId=createdUser._id;
        const amt=await Account.create({
            userId,
            balance: 1+ Math.random() * 10000
        })

        const token=jwt.sign({
            userId
        },secret);
        return res.status(200).json({
            message:"User created successfully",
            token: token,
            availablebalance: amt.balance
        })
    }
    return res.status(500).json({
            message:"Internal error try again!..."
        })
})

router.post("/signin",async(req,res)=>{
    const check = checksignin.safeParse(req.body)
    if(!check.success){
        return res.status(411).json({
            message:"Error: Incorrect inputs"
        })
    }
    const exists= await User.findOne({
        username: req.body.username
    })
    if(!exists){
        return res.status(411).json({
            message:"Email doen't exist try signin.."
        })
    }
    if (exists.password != req.body.password ){
        return res.status(400).json({
            message:"Invalid Email/ Password. Please try again."
        })
    }
    const token=jwt.sign({
        userId: exists._id
    }, secret);
    if(token){
        return res.status(200).json({
                message:"Logged in successfully",
                token: token,
                username:exists.username,
                firstName:exists.firstName,
                lastName:exists.lastName
            })
    }
    return res.status(411).json({
            message:"Error while logging in"
        })

})

module.exports=router;