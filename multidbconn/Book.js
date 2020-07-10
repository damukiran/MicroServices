var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var conn = require("./dbConfig").conn

var SomeModelSchema = new Schema({
    title: {
        type:String
    },
    author: {
        type:String 
    }, numberPages: {
        type:String
    },
     publisher: {
        type:String
    }
},{versionKey:false});
var SomeModel = conn.model('Books', SomeModelSchema );

module.exports=SomeModel