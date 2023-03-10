const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historyTransactionSchema = new Schema({
    coin:{
        type:Number
    },
    monney:{
        type:Number
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true});

module.exports = mongoose.model('paypals',historyTransactionSchema);