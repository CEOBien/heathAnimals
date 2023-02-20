const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name:{
        type:String
    }
});

module.exports = mongoose.model('menus',menuSchema);