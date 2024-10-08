const express = require("express")
const user=require("./user")
const account = require("./account")

const router= express.Router();

router.use("/user",user)
router.use("/account",account)

module.exports = router;