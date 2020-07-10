const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 2000
var ModelA = require("./Book")
var ModelB = require("./Customer")
var ObjectId = require('mongodb').ObjectID;
const bodyParser = require("body-parser")
app.use(bodyParser.json())



app.get('/books', (req, res) => {
   var input = req.query
   ModelA.find({}).exec(function (err, data) {
        console.log(data)
        res.send(data)
    })
})
app.get('/customers', (req, res) => {
    var input = req.query
    ModelB.find({}).exec(function (err, data) {
         console.log(data)
         res.send(data)
     })
 })
 app.get('/targetdatabase/:db', (req, res) => {
    let result;
    var input = req.params.db;
    if(input=="db1"){
        result = ModelB.find({})
        
    }
    if(input=="db2"){
        result = ModelA.find({})
      
        
    } 
          result.exec(function (err, data) {
    // result.find({}).exec(function (err, data) {
        //  console.log(data)
         res.send(data)
     })
 })

app.listen(port, () => {
    console.log("server started with port no" + port)
})