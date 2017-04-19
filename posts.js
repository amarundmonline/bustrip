var express = require('express');
var router = express.Router();
var MongoClient = require('./mongo.js').MongoClient;
var url = require('./mongo.js').url;
router.post('/api/submitbooking', function (req, res) {
    // console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', req.query);
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.send({
                result: 'error'
            });
            console.log(err);
        }
        else {
            //for (ind in JSON.parse(req.query.seats)) {
            // console.log(ind);
            //}
            for (inds in JSON.parse(req.query.seats)) {
                //console.log('ddddddddddddddddfffffffffffffffffffffffffff', JSON.parse(req.query.seats));
                //console.log('ddddddddddddddddddddddddssssssssssssssssssssssss', JSON.parse(req.query.seats)[inds].bookingGender);
                db.collection('busses').findAndModify({
                    'busId': req.query.busId
                    , 'seats.rightRow': {
                        $elemMatch: {
                            sId: parseInt(inds)
                            , bookedSt: false
                        }
                    }
                }, [['_id', 'asc']], {
                    $set: {
                        'seats.rightRow.$.bookedSt': true
                        , 'seats.rightRow.$.bookedBy': JSON.parse(req.query.seats)[inds].bookingGender
                    }
                }, {}, function (a, b) {
                    console.log(a);
                    console.log(b.value);
                });
                db.collection('busses').findAndModify({
                    'busId': req.query.busId
                    , 'seats.leftRow': {
                        $elemMatch: {
                            sId: parseInt(inds)
                            , bookedSt: false
                        }
                    }
                }, [['_id', 'asc']], {
                    $set: {
                        'seats.leftRow.$.bookedSt': true
                        , 'seats.leftRow.$.bookedBy': JSON.parse(req.query.seats)[inds].bookingGender
                    }
                }, {}, function (a, b) {
                    console.log(a);
                    console.log(b.value);
                    //console.log(c);
                });
            }
            res.send({
                result: 'success'
            });
            /*
            
            
            db.collection('busses').find({
                'busId': req.query.busId
            }).toArray(function (err, busdata) {
                if (err) {
                    res.send({
                        result: 'error'
                    });
                }
                else {
                    console.log('imp..................', busdata[0].seats.leftRow[2].sId);
                    //console.log(typeof busdata);
                    for (ind in JSON.parse(req.query.seats)) {
                        //console.log(busdata[0]);
                        busdata[0].seats.leftRow.forEach(function (stInd, inds) {
                            //console.log('StInd', stInd);
                            //console.log('Ind', ind);
                            //console.log(typeof stInd.sId);
                            //console.log(typeof ind);
                            if (stInd.sId === parseInt(ind) && stInd.bookedSt !== true) {
                                console.log(inds);
                                var temp = "seats.leftRow[" + inds + "].sId";
                                console.log(temp);
                                //test find
                                 db.collection('busses').find({
                                     'busId': req.query.busId
                                     , 'seats.leftRow': {
                                         $elemMatch: {
                                             sId: inds
                                             , bookedSt: false
                                         }
                                     }
                                 }).toArray(function (err, data) {
                                     if (err) {
                                         console.log(err)
                                     }
                                     else {
                                         console.log('data', data);
                                     }
                                 });
                                //test find
                                db.collection('busses').updateOne({
                                        'busId': req.query.busId
                                        , 'seats.leftRow': {
                                            $elemMatch: {
                                                sId: inds
                                                , bookedSt: false
                                            }
                                        }
                                    }, {
                                        $set: {
                                            'seats.leftRow.$.bookedSt': true
                                        }
                                    }, function (err, data) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log(data);
                                        }
                                    });
                                    //db.collection('busses').updateOne({
                                    //})
                            }
                            else {
                                //   console.log('Some thing went wrong');
                            }
                        })
                    }
                }
            });
            
            
            
            */
        }
    });
});
module.exports = router;