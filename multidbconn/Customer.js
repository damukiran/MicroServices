var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var conn2=require("./dbConfig").conn2
var SomeModelSchema = new Schema({
    name: {
        type:String
    },
    age: {
        type:String 
    }, address: {
        type:String
    }   
},{versionKey:false});


var SomeModel = conn2.model('Customers', SomeModelSchema );

module.exports=SomeModel