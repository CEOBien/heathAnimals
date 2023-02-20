const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const experirenceSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },

    rank_id:{
        type: Schema.Types.ObjectId,
        ref:'rank'
    },
    
});

module.exports = mongoose.model('experiences', experirenceSchema);





