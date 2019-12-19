const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
    item_name:{
        type:String
    },
    item_images:{
        type:Array
    },
    item_type:{
        type:String
    },
    item_available:{
        type:String
    },
    item_rating:{
        type:String
    }
});

module.exports = mongoose.model('Item', Item);