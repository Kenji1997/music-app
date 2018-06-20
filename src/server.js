var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/scDB";

var server = require("http").createServer(app);
server.listen(8080);
// app.set("view engine", "ejs");
// app.set("views", "./views");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/search/:q' , (req, res)=>{
	// var data;
	let q = req.params.q;
	let replace = "^"+ q;
	let re = new RegExp(replace,"g");
	console.log(re);
	let queryStr = { query : re }


	MongoClient.connect(url, (err, db)=>{
		var dbo = db.db("scDB");
		dbo.collection("song").find(queryStr).toArray(function(err, result) {
		    if (err) throw err;
		    // data = result;
		    var data = JSON.stringify(result);
			res.end(data);
	    	db.close();
		});
	});

})

console.log('im running');