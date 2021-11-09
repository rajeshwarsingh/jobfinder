// "use strict";
// /*requiring mongodb node modules */
// const  mongodb=require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;
// const assert = require('assert');
// // const MongoUrl='mongodb://localhost:27017/jugaadtest';
// const MongoUrl='mongodb+srv://webslayer:jugaad123@jugaad.lwctk.mongodb.net/Jugaad';

// module.exports.onConnect = (callback) => {	

// 	MongoClient.connect(MongoUrl, (err, db) => {
// 		console.log(err,db)
// 		assert.equal(null, err);
// 		callback(db,ObjectID);
// 	});
	
// }
const  mongodb=require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = mongodb.ObjectID;
 
// Connection URL
const url = 'mongodb+srv://webslayer:jugaad123@jugaad.lwctk.mongodb.net';
 
// Database Name
const dbName = 'Jugaad';
 

module.exports.onConnect = (callback) => {	


// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);

  return callback(db,ObjectID,client);

  const collection = db.collection('User');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });

 
  client.close();
});

}