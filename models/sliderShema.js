const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlideSchema = new Schema({
    title:{
        type:String,
        reuqire:true
    },
    img:{
        type:String,
        require:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    cloudinary_id:{
        type:String
    },
    create_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('sliders',SlideSchema);