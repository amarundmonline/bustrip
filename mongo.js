var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://tripitadmin:admin123@ds157549.mlab.com:57549/tripit';
//var url = 'mongodb://superadmin:superadmin123@localhost:27017/tripit';
//var url = 'mongodb://tripitadmin:tripitadmin123@127.0.0.1:27017/tripit';
module.exports = {
    MongoClient: MongoClient
    , url: url
}


//cool we ca export like this








