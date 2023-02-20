const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
    },
    resetCode:{
        type:String,
        default:null

    },
    resetToken:{
        type:String,
        expireIn: new Date().getTime() + 300,
        default: Date.now
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);