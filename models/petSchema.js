const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
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
    breed:{
        type:String,
        require:true
    },
    img:{
        data: Buffer,
        contentType: String 
    },
    allergy:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
});

module.exports = mongoose.model('pets',petSchema);