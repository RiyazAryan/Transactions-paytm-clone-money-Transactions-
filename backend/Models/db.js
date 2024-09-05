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
        minlength:3,
        maxlength:30,
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
        minlength:3,
        maxlength:30,
        require: true,
    },
    password:{
        type: String,
        minlength:8,
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

userSchema.pre('save', function (next) {
    if (this.firstName) {
        this.firstName = this.firstName
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    if (this.lastName) {
        this.lastName = this.lastName
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    next();
});

const User = mongoose.model('User', userSchema);
const Account=mongoose.model('Account', accountSchema)
module.exports={
    User, Account
}