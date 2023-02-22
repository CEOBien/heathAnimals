const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const bookingSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    ny_id:{
        type:Schema.Types.ObjectId,
        ref:'infos'
    },
    amount:{
        type:Number
    },
    hour:{
        type:Number,
        require:true
    },
    status:{
        type: String,
        enum: ['INACCEPT', 'ACCEPT', 'FINISH'],
        default: 'INACCEPT'
    }
},{timestamps:true});

module.exports = mongoose.model('booking', bookingSchema);