var mongoose = require('mongoose')

var conn      = mongoose.createConnection('mongodb://devchurchviteadmin:$Churchvite12345@13.126.33.219:27017/churchvitedev',
{ useNewUrlParser: true,useUnifiedTopology: true });
conn.on('connected', function () {
    console.log('connected to books DB successfully');
});
conn.on('error', function (error) {
    console.log('error: ' + error.message+"BooksDB")
});


var conn2     = mongoose.createConnection('mongodb://prepodayyappa:$PreProdAyyappa@13.126.33.219:27017/preprodayyappa',
{ useNewUrlParser: true,useUnifiedTopology: true });

conn2.on('connected', function () {
    console.log('connected to customers DB successfully');
});
conn2.on('error', function (error) {
    console.log('error: ' + error.message+"customerDB")
});

    

module.exports={
    conn:conn,
    conn2:conn2
}
