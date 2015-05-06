var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sets = require('./sets.js');
var db = require('./db.js');
var favicon = require('serve-favicon');
var port = process.env.PORT || 5000;
var User = require('./schemas/user.js');
var Set = require('./schemas/set.js');



// This allows us to read POSTed form data using `req.body`
app.use(bodyParser.urlencoded({extended:true}));
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));


// Database stuff:
var mongoose = require('mongoose');
var mongodbUri = 'mongodb://heroku_app35692599:o6517enfrv515n3imhj1pdhg66@ds061757.mongolab.com:61757/heroku_app35692599';
mongoose.connect(mongodbUri);
var db = mongoose.connection;
db.on('error', function(error){
	console.log('There was an error connecting to mongo:' + error);
});
db.once('open', function(){
	console.log('Successfully connected to mongo!');
});


// This makes it so that `res.render` renders ejs views in the views folder
app.set('view engine', 'ejs');



app.get('/', function (req, res){
	Set.find({}, function (err, results){
	//datbase query
		if (err) {
		     res.send('Error fetching sets:' + results);
		  } else {
			//console.log('set data is >> ' + results);

			var set = results;

			var viewData = {
				sets: results,
				set: set,
				pageTitle: 'SQNTA - Home'
			}

			res.render('pages/index',viewData)
		}
	});
});





app.get('/upload', function(req,res){
	Set.find({}, function (error, sets){
		//database query
		if (error){
			res.send('Error fetching sets:' + error);
		} else {
			//console.log ('Got sets from database', sets);
			res.render('pages/upload',{
				sets: sets
			});
		}
	});
});





app.post('/upload', function(req,res){
	var setTitle = req.body.name;
	var soundcloudUrl = req.body.soundcloudUrl;
	var lineup = req.body.lineup;
	var description = req.body.description;
	var address = req.body.address;
	var when = req.body.when;
	var startTime = req.body.startTime;
	var endTime = req.body.endTime;
	var city = req.body.city;
	var buy = req.body.buy;
	var price = req.body.price;


	console.log('new set!');


	var set = new Set({
		setTitle: setTitle,
		soundcloudUrl: soundcloudUrl,
		lineUp: lineup,
		description: description,
		address: address,
		when: when,
		startTime: startTime,
		city: city,
		endTime: endTime,
		buy: buy,
		price: price
	});


	set.save(function(err,data){
	if (err) {
	  res.send('Error saving new set: ' + err);
		} else {
			console.log('NEW SET! >> ' + data);
      		res.redirect('/' + data._id );
		}
	});
});





app.get('/sets', function(req,res){
	console.log('lets get all the sets');

	Set.find({},function(err,dataFromMongoLab){
		if(err) console.log(err);
		else{
			console.log('set data is >> ' + dataFromMongoLab);

			var viewData = {
				sets: dataFromMongoLab,
				pageTitle: 'All Sets!'
			}

			res.render('pages/sets',viewData)
		}
	})

});






app.get('/sets/:_id', function(req,res){
	var url = req.params._id;

	console.log('getting the id' + url);

	Set.find({ _id: url}, function(err, results){
		console.log('done finding set, err:',err,'results:',results);
		if (err) {
			res.send('')

		}else{
			var set = results[0];

			var viewData = {
				set: set,
				pageTitle: set.setTitle
			}

			res.render('pages/set', viewData)
		}



	});


});






app.post('/createAccount', function(req,res){
	var username = req.body.username;
	var user = new User({ username: username});

	user.save(function(err){
	if (err) {
	  res.send('Error saving user: ' + err);
		} else {

      res.redirect('/');
		}
	});
});





app.get ('/*', function (req, res){
	res.status(404).render('pages/error.ejs', {title: 'Error'});
});

app.listen(port, function(){
  console.log('App running on port',port);
});
