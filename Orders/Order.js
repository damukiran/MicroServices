var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var SomeModelSchema = new Schema({
    customerId: {
        type:String
    },
    bookId: {
        type:String 
    }, intialDate: {
        type:Date
    },
     deliveryDate: {
        type:Date
    }
},{versionKey:false});


var SomeModel = mongoose.model('Orders', SomeModelSchema );

module.exports=SomeModel