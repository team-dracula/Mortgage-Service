const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://user:user123@3.80.167.2:27017/sdc";

// Database Name
const dbName = "sdc";

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, auth: {user: 'user', password: 'user123'}, authSource: 'sdc', authMechanism: 'SCRAM-SHA-1' });

const getPriceFromDB = function() {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
    db.collection("prices").find({id: 1});
    // client.close();
  });
}

const byIdgetPriceFromDB = function(err, id, callback) {
  if (err) {
    return console.log("error: " + err);
  }
  client.connect( function(err, client) {
    // console.log(Number(id))
    if (err) throw err;
    var db = client.db("sdc");
    db.collection("prices").findOne({id: Number(id)}, function(err, result) {
      if (err) throw err;
      console.log("query result: ", result);
      callback(result)
      // client.close();
    });
  });
};

module.exports = {
  getPriceFromDB: getPriceFromDB,
  byIdgetPriceFromDB: byIdgetPriceFromDB
};


// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);
//   const collection = db.collection('prices')
//   collection.findOne({id: id}, (err, item) => {
//     console.log(item)
//   })
//   client.close();
// });

// const byIdgetPriceFromDB = function(err, id, callback) {
//   MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//     if (err) throw err;
//     db = client.db('sdc');
//     result = db.collection('prices').find({id: id})
//     console.log('result form query', result)
//     callback(result)
//   });
// };