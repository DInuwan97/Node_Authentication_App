const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type:String,
        default:''
    },lastName:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    mobile:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    regDate:{
        type:String,
        default:Date.now()
    },
    userType:{
        type:String,
        default:''
    }
});

module.exports = Users = mongoose.model('users',UserSchema);