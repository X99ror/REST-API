const mongoose =require("mongoose")

const userSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
        
    },
    password:{
        type:String,
        required:true
    },
    membership_type:{
        type:String,
        required:true
    },
    registered_date:{
        type:String,
        required:true
    }


})

const User = mongoose.model("User", userSchema);

module.exports=User;