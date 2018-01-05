

var express = require('express');

var app = express();
var mongojs=require('mongojs');
var db = mongojs('mongodb://ashu:ashu9984@ds159024.mlab.com:59024/mydatabase123',["contactList"]);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/getcontact',function(req,res)
{
 

 	db.contactList.find(function(err,args)
 	{
 		console.log(args);
 		 res.json(args);


 	})

   
    console.log("get api call");


});

app.post('/addcontact',function(req,res){

	console.log(req.body);
	db.contactList.insert(req.body, function(err , args)
	{
		res.json(args);
	})
	console.log("post api call");
})

app.delete('/deletecontact/:id',function(req, res){

	var id =req.params.id;
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)} , function(err,args)
	{
		res.json(args);

	})
	console.log("delete api call");
})

app.get('/getcontact/:id',function(req,res)
{
 	var id = req.params.id;

 	db.contactList.findOne({_id: mongojs.ObjectId(id)} , function(err,args)
	{
		res.json(args);

	})

   
    console.log("edit get api call");


});


app.put('/updatecontact/:id',function(req, res){

	var id =req.params.id;

	console.log(req.body.name);

	db.contactList.findAndModify( { 
		query: { _id: mongojs.ObjectId(id) } , 
		update: {$set: {name: req.body.name , email: req.body.email , phone: req.body.phone  } },
		new: true } , function(err,args){ 

		res.json(args);
		

	 }); console.log("put api call");
})


app.listen(3500);
console.log('server running');