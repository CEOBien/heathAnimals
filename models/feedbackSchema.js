const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const feedbackSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    ny_id:{
        type:Schema.Types.ObjectId,
        ref:'infos'
    },
    content:{
        type:String
    },
    rate:{
        type:Number
    }
},{timestamps:true});
module.exports = mongoose.model('feedbacks',feedbackSchema);