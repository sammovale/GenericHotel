var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search.html', function(req, res){
  //search and return the data for the search site
});


module.exports = router;
