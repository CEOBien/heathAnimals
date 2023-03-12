const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historyTransactionSchema = new Schema({
    coin:{
        type:Number,
        default:0
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true});

module.exports = mongoose.model('wallets',historyTransactionSchema);