var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var db;
if (process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://localhost:27017/bookAPI_test');
else
    db = db = mongoose.connect('mongodb://localhost:27017/bookAPI');

var Book = require('./model/bookModel');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

var bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.send('Hello');
});

app.listen(port, function () {
    console.log('listening on PORT: ' + port);
});

module.exports = app;