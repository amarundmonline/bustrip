var express = require('express');
var router = express.Router();
var MongoClient = require('./mongo.js').MongoClient;
var url = require('./mongo.js').url;
router.get('/test', function (req, res) {
    res.sendFile(__dirname + '/public/unitTest.html');
});
router.get('/123', function (req, res) {
    res.sendFile(__dirname + '/public/123.html');
});
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
//search page route
router.get('/search', function (req, res) {
    res.sendFile(__dirname + '/public/search.html');
});
var count = 0;
router.get('/api/searchresult', function (req, res) {
        //console.log(req.query.formCityName);
        count++;
        console.log(count);
        MongoClient.connect(url, function (err, db) {
            if (err) {
                res.send({
                    result: 'error'
                });
                console.log(err);
            }
            else {
                db.collection('busses').find({
                    "routeFrom": req.query.formCityName
                    , "routeTo": req.query.toCityName
                }).toArray(function (err, data) {
                    if (err) {
                        db.close();
                        res.send({
                            result: 'error'
                        })
                    }
                    else {
                        //console.log(data);
                        db.close();
                        if (data.length !== 0) {
                            res.send({
                                "flag": true
                                , "data": data
                            });
                        }
                        else {
                            res.send({
                                "flag": false
                                , "data": "No Busses Found"
                            });
                        }
                    }
                })
            }
        });
    })
    //all cities api
router.get('/api/allcities', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.send({
                result: 'error'
            });
        }
        else {
            db.collection('cityNames').find({}).toArray(function (err, data) {
                if (err) {
                    db.close();
                    res.send({
                        result: 'error'
                    });
                }
                else {
                    //console.log(data);
                    db.close();
                    res.json(data);
                }
            })
        }
    })
});
module.exports = router;