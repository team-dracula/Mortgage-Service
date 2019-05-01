const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://user:user123@3.80.167.2:27017/sdc";

// Database Name
const dbName = "sdc";
let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
   db = client.db("sdc");
});

const getPriceFromDB = function() {
  db.collection("prices").find({ id: 1 });
};

const byIdgetPriceFromDB = function(err, id, callback) {
  if (err) {
    return console.log("error: " + err);
  }

  db.collection("prices").findOne({ id: Number(id) }, function(err, result) {
    if (err) throw err;
    console.log("query result: ", result);
    callback(result);
  });
};

module.exports = {
  getPriceFromDB: getPriceFromDB,
  byIdgetPriceFromDB: byIdgetPriceFromDB
};
