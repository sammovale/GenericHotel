var express = require('express');
var router = express.Router();
var fs = require('fs');

var CLIENT_ID = '422635074327-p09d4f60471au43tsv84vhg5qkhrlj4q.apps.googleusercontent.com';
var {OAuth2Client} = require('google-auth-library');
var client = new OAuth2Client(CLIENT_ID);

var users = [{username:"testuser", password:"NYANNYAN", google:"115137473611550193156"}];

var sessions = {};

var hotels = [];
var rooms = [];

fs.readFile('data/hotels.json', 'utf8', function(err, data){ 
    hotels = JSON.parse(data);
});

fs.readFile('data/rooms.json', 'utf8', function(err, data){ 
    rooms = JSON.parse(data);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//send the hotels that match to the search query
router.get('/data/hotels.json', function(req, res){
    var searchQuery = req.query.search;
    console.log("SEARCH QUERY IS: " + searchQuery);
    //connect to the database
    req.pool.getConnection(function(err,connection){
        if(err){
            throw err;
        }
        //if no search query return the whole database for now, else perform search query with search text
        if(searchQuery == "undefined"){
            console.log("SHOWING ALL FROM TABLES");
            var query = "SELECT * from hotels";
        }else{
            //this should be santised for prevention against SQL and XSS injection techniques, will get to that later
             var query = "SELECT * from hotels WHERE title LIKE '"+searchQuery+"%'";
        }
        connection.query(query, function(err, results){
            connection.release(); //release connection
            res.send(JSON.stringify(results));
        });
    });
});

//send the rooms data corresponding to the key value from the hotel
router.get('/data/rooms.json', function(req, res){
    //get the hotelID param passed from html and return only rooms corresponding to that ID
    var hotelID = req.query.hotelID;
    var roomsID = [];
    for (var i = rooms.length - 1; i >= 0; i--){
        if(rooms[i].key == hotelID){
            roomsID.push(rooms[i]);
        }
    }
    res.send(JSON.stringify(roomsID));
    
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
