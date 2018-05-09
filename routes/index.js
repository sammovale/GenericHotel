var express = require('express');
var router = express.Router();
var fs = require('fs');

var hotels = [];

fs.readFile('data/hotels.json', 'utf8', function(err, data){ 
    hotels = JSON.parse(data);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//send the hotels that match to the search query
router.get('/data/hotels.json', function(req, res){
	
});

router.get('/search', function(req, res){
  //search and return the data for the search site
  var searchQuery = req.query.search;
  res.redirect('/search.html?search=' + searchQuery);
});


module.exports = router;
