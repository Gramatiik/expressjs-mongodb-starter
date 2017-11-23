var http = require("http");
var fs = require('fs');
var MongoClient = require("mongodb").MongoClient;

const express = require('express');
const app = express();

var mongoUrl = "mongodb://mongo:27017/test-app";

var insertDocuments = function(db, data, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany(data, function(err, result) {
    callback(result);
  });
}

async function getDocuments() {
	return new Promise( (resolve, reject) => {
		MongoClient.connect(mongoUrl, (err, db) => {
			db.collection('documents').find({}).toArray((err, docs) => {
				if(err != null) reject(err);

				resolve(docs);
			});
		});
	});
}

app.get('/', async (req, res) => {
	try {
		var docs = await getDocuments();
		res.json(docs);
	} catch (e) {
		res.json({
			error: e
		});
	}
});

app.get('/populate', function (req, res) {
	MongoClient.connect(mongoUrl, function(err, db) {
		var data = JSON.parse(fs.readFileSync('./users.json', {encoding: 'utf-8'}));
   		insertDocuments(db, data, function (results) {
   			res.json({ message: "OK", data: data });
   		});
	});
});

/* start app on port 8000 */
app.listen(8000, () => {
	console.log('Started app on port 8000');
});
