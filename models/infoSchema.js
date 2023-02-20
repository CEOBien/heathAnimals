const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    old:{
        type:Number,
        require:true
    },
    height:{
        type:Number
    },
    weight:{
        type:Number
    },
    skill:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    img:{
        type:String
    },
    cloudinary_id:{
        type:String
    },
    lit:{
        type:Number
    },
    lat:{
        type:Number
    },

    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('infos',infoSchema);