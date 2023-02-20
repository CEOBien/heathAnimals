const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rankSchema = new Schema({
    level: {
        type:Number,
        require:true
    },
    name:{
        type:String,
        require: true
    },
    img:{
        type:String
    },
    cloudinary_id:{
        type:String
    }
    
},{timestamp:true});

module.exports = mongoose.model('rank', rankSchema);