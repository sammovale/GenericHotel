var express = require('express');
var router = express.Router();
var fs = require('fs');

var CLIENT_ID = '422635074327-p09d4f60471au43tsv84vhg5qkhrlj4q.apps.googleusercontent.com';
var {OAuth2Client} = require('google-auth-library');
var client = new OAuth2Client(CLIENT_ID);

var users = [{username:"testuser", password:"NYANNYAN", google:"115137473611550193156"}];

var sessions = {};

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
	res.send(JSON.stringify(hotels));
});

router.get('/search', function(req, res){
  //search and return the data for the search site
  var searchQuery = req.query.search;
  res.redirect('/search.html?search=' + searchQuery);
});

//router for user login with session
router.post('/user.json', function(req, res){
    
    var user = null;
    
    console.log(JSON.stringify(req.body));
    
    // If login details present, attempt login
    if(req.body.username !== undefined && req.body.password !== undefined){
        console.log("Username + Password received");
        
        for (var i=0; i<users.length; i++){
         
            if(users[i].username === req.body.username && users[i].password === req.body.password){
                sessions[req.session.id] = req.body.username;
                user = req.body.username;
            }
        }
        res.json({username:user});
        
    // If google login token present
    } else if(req.body.idtoken !== undefined) {
        console.log("Google Token Recieved");
        
        // 
        async function verify() {
            // Verify google ID token
            const ticket = await client.verifyIdToken({
                idToken: req.body.idtoken,
                audience: CLIENT_ID
            });
            
            // Get user data from token
            const payload = ticket.getPayload();
            
            // Get user's Google ID
            const userid = payload['sub'];
            
            for (var i=0; i<users.length; i++){
         
                /* 
                 * If google ID matches a user
                 * save the session
                 * send that username
                 * (otherwise user will remain null)
                 */
                if(users[i].google === userid){
                    sessions[req.session.id] = users[i].username;
                    user = users[i].username;
                }
                
            }
            res.json({username:user});
        }
        verify().catch(console.error);
        

    // If no login details, but valid session
    } else if(sessions[req.session.id] !== undefined) {
        console.log("Valid session");
        user = sessions[req.session.id];
        res.json({username:user});
    }
    
});

module.exports = router;
