var sets = require('./data/sets').data;

exports.list = function(req, res){
  res.render(
	  'sets.ejs', {
		  title: 'SQNTA - sets list',
    	  sets: sets	
  });
};


exports.single = function(req, res) {
	var data = sets.filter(function (set){
		return (set.url === req.params.title);	
  });

  if (data.length > 0) {
    data = data[0];
	data.title = 'SQNTA - Set';
	res.render('set.ejs', data);
  } else {
	res.status(404).render('error.ejs', {title:'Set not found '});
  }
};


exports.upload = function(req, res){
	res.render('upload_result.ejs', {
		title: 'SQNTA - Thanks!',
		name: req.body.name,
		lineup: req.body.lineup,
		description: req.body.description
	});
};