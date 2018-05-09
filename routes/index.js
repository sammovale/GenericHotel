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

router.get('/search', function(req, res){
  //search and return the data for the search site
  var searchQuery = req.query.search;
  res.redirect('/search.html?search=' + searchQuery);
});


module.exports = router;
