const mongoose = require('mongoose');
const passport = require('passport');
const Schema= mongoose.Schema;

const UserSchema=new Schema({
     
    firstname:{
        type:String,
        required:true,
        minlength:3
    },
    lastname:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        trim:true,
        required:true,
        validate:{
            validator:(v)=>vaild.isEmail(v)
        }
    },
    password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('userAuth',UserSchema);