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
    status:{
        type: String,
        enum: ['INACCEPT', 'ACCEPT', 'FINISH','CANCEl'],
        default: 'INACCEPT'
    },
    price:{
        type:String
    },
    startDate:{
        type:String,
        require:true
    },
    endDate:{
        type:String,
        require:true
    },
    day:{
        type:Date,
        require:true
    },
    intermediaryToken:{
        type:String
    },
    address:{
        type:String,
        require:true
    },
},{timestamps:true});

module.exports = mongoose.model('booking', bookingSchema);