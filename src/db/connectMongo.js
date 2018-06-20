var mongodb = require('mongodb').MongoClient;
var MongoClient = mongodb.MongoClient;
var url = "mongodb://127.0.0.1:27017/scDB";

var data;
MongoClient.connect(url, (err, db)=>{
	var dbo = db.db("scDB");
	data = dbo.collection("song").find();
	console.log(data);
});

export default data;
