const express = require("express")
const app = express()
const mongoose = require("mongoose")
const axios = require("axios")
const port = 2022
require("./Order")
var ObjectId = require('mongodb').ObjectID;
//const url ="mongodb://damukiran:damu3383@cluster0-shard-00-00-2wakd.mongodb.net:27017/bookservice"
const url = "mongodb://qachurchviteadmin:$QaChurchVite@13.126.33.219:27017/churchviteqa"
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const Order = mongoose.model("Orders")
mongoose.connect(url, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to the database successfully.')
})
app.get('/orders', (req, res) => {
    var input = req.query
    Order.find({ "_id": input.id }).exec(function (err, data) {
        if (data) {
            var v = data[0].customerId
            var b = data[0].bookId
            console.log("http://192.168.99.100:9001/?id=" + v)
            console.log("http://192.168.99.100:9000/?id=" + b)
            axios.get("http://192.168.99.100:9001/customers/?id=" + v).then((response) => {
                var orderObject = {
                    customerName: response.data.name,
                    customerAge: response.data.age,
                    bookTitle: '',
                    bookAuthor: '',
                    bookPages: ''
                }
                axios.get("http://192.168.99.100:9000/books?id=" + b).then((response1) => {
                    orderObject.bookTitle = response1.data.title
                    orderObject.bookAuthor = response1.data.author
                    orderObject.bookPages = response1.data.numberPages
                    res.json(orderObject)
                })
            })
        }
        else {
            throw err
        }
    })
})
app.post('/', (req, res) => {
    var input = req.body
    var neworder = {
        customerId: ObjectId(input.customerId),
        bookId: ObjectId(input.bookId),
        intialDate: input.intialDate,
        deliveryDate: input.deliveryDate

    }
    var order = new Order(neworder)
    order.save().then(() => {
        console.log("data saved")
        res.send("data saved")
    }).catch((err) => {
        if (err) { throw err }
    })
})
app.listen(port, () => {
    console.log("server started with port no" + port)

})