var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require('../model/queryMongo.js');
var path = require('path');
var cors = require('cors');
var util = require('util')

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));


app.use(cors());


app.get('/:number', function(req, res) {
    // console.log('getting here');
    
    // console.log('__dirname: ', __dirname);
    // res.locals.id = req.params.number;
    // console.log(res.locals.id);
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// if the client requests queries just api it will query the database for some reason
app.get('/api/price', function(req, res) {
    // db.getPriceFromDB(null, function(result) {
    //     console.log('/price this is the result from the server', result);
    //     res.send(result);
    // }); 

    res.send({
        "price": 100000
    })
});

app.get('/api/price/:priceId', function(req, res) {
    db.byIdgetPriceFromDB(null, req.params.priceId, function( result){ 
        // if (err) console.error(err);
        // res.locals.id = req.params.priceId;
        // console.log('res.locals.id: ', res.locals.id);
        // result = util.inspect(result)
        res.send(result);
    });
});

app.get('/loaderio-88627c2e57ccb88863e7a8bce87e90e2/', function (req, res) {
    res.sendFile(path.join(__dirname, 'loaderio-88627c2e57ccb88863e7a8bce87e90e2.txt'))
})

var port = process.env.PORT || 3008;

app.listen(port, function() {
    console.log(`Server is listening on port: ${port}`);
});