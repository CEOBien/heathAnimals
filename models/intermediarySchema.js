const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const intermediarySchema = new Schema({
    coin:{
        type:Number,
        default:0
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    parterId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    token: String,
    expireAt: { type: Date, default: Date.now, expires: 300 }
},{timestamps:true});

module.exports = mongoose.model('intermediarys',intermediarySchema);