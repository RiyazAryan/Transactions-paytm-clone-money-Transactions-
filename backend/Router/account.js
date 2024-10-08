const express = require("express");
const { authMiddelware } = require("../Middlewares/authMiddleware");
const { Account } = require("../Models/db");
const router=express.Router();
const mongoose = require("mongoose")

router.get("/balance",authMiddelware,async(req,res)=>{
    const check=await Account.findOne({
        userId: req.userId,
    })
    if(check){
        return res.status(200).json({
            balance: check.balance
        })
    }
    return res.status(500).json({
        Error: "Internal server error. Please try again..."
    })
})

router.post("/transfer", authMiddelware,async(req, res)=>{
    const session = await mongoose.startSession()
    session.startTransaction();
    try{
    const {amount, to}=req.body;
    const from = await Account.findOne({
        userId: req.userId
    }).session(session)
    if(!from || from.balance<amount || amount<0){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient Balance"
        })
    }

    const toAccount=await Account.findOne({
        userId: to
    }).session(session)
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid Account"
        })
    }
    await Account.updateOne({
        userId: req.userId
    },{
        $inc:{
            balance: -amount
        }
    }).session(session)
    await Account.updateOne({
        userId: to
    },{
        $inc:{
            balance: +amount
        }
    }).session(session)
    await session.commitTransaction();
    await session.endSession();
    return res.json({
        message:"Transfer Successful Rs."+amount
    })
}
catch(error){
    await session.abortTransaction();
        return res.status(400).json({
            message:"Transaction failed"
        });
    } finally {
        session.endSession();
    }
})
module.exports=router