const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoUserSchema = new Schema({
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
    
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    img:{
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
    cloudinary_id:{
        type:String
    },
    description:{
        type:String,
        require:true
    },
    character:{
        type:String,
        require:true
    },
    appearance:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('infoUsers',infoUserSchema);