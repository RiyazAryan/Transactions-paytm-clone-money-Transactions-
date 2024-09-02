const mongoose=require("mongoose");
require("dotenv").config()

mongoose.connect(process.env.MONGOURL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
        trim: true,
        minLength:3,
        maxLength:30,
        require: true,
    },
    lastName:{
        type: String,
        trim: true,
        require: true,
        default:""
    },
    username:{
        type:String,
        trim: true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:30,
        require: true,
    },
    password:{
        type: String,
        minLength:8,
        require: true,
    }
})

const accountSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
const Account=mongoose.model('Account', accountSchema)
module.exports={
    User, Account
}