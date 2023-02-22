const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const experirenceSchema = new Schema({
    ny_id:{
        type: Schema.Types.ObjectId,
        ref:'users',
        unique:[true,'exited you can not add !']
    },

    level:{
        type:Schema.Types.ObjectId,
        ref:'ranks'
    },
    accumulated:{
        type:Number,
        require:true
    }
    
},{timestamps:true});

module.exports = mongoose.model('experiences', experirenceSchema);





