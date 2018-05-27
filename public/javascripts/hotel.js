//use search number at the moment but will most likely change to a unique ID/key in the database that will be refrenced 
var searchNumber = 0;
var map = null;
var map2 = null;

//create a hotelStruct/object that will be used but replaced with a struct that grabs data from the database
var hotelStruct = {title:"Mantra Hindmarsh Square", description:"The Mantra Hotel is a very fine hotel with fantastic views. Great pricing and location makes Mantra the hotel for you! There is a pool and all other sorts of entertainment.",
                    key:"1", locationLat:-26.363, locationLng:132.044
};

var roomStruct = {title:"The Penthouse $300", description:"The Mantra Hotel is a very fine hotel with fantastic views. Great pricing and location makes Mantra the hotel for you! There is a pool and all other sorts of entertainment.", key:"1", locationLat:-26.363, locationLng:132.044};
var hotels = [];
var rooms = [];

//listen for events
$(document).ready(function(){

  //if the search button is clicked run the addHotel function for now
  $("#searchData").click(function(){
   addHotel(hotelStruct);
  });

  $(".signin").click(function(){
    $("body").load("/login.html");
  });

  $(".resultNumber").text("Showing "+searchNumber+" Results");

  $("#contact").click(function(){
   
  });

});

//make an AJAX GET request for the hotels
function search(){

   // Create new AJAX request
    var xhttp = new XMLHttpRequest();
            
      // Define behaviour for a response
      xhttp.onreadystatechange = function() {
            
      if(this.readyState == 4 && this.status == 200) {
                
        // convert from string to JSON, populate hotels array
        //call the addhotels fucntion and add all the hotels that the GET response sent
        hotels = JSON.parse(xhttp.responseText);
        for (var i = hotels.length - 1; i >= 0; i--){
            addHotel(hotels[i]);
        }            
      }
    };
            
    // Initiate connection
    xhttp.open("GET", "data/hotels.json", true);
            
    // Send request
    xhttp.send();

}

function getRoom(){

//not the best way to do it but get the paramter hotelID to send a get request for all hotel rooms with that ID
 var ID = location.search.split('hotelID=')[1]

   // Create new AJAX request
    var xhttp = new XMLHttpRequest();
            
      // Define behaviour for a response
      xhttp.onreadystatechange = function() {
            
      if(this.readyState == 4 && this.status == 200) {

   
        // convert from string to JSON, populate hotels array
        //call the addhotels fucntion and add all the hotels that the GET response sent
        //start changing the html on the hotel.html to the data received from get request too such as the title
        rooms = JSON.parse(xhttp.responseText);
        $(".titleHotel").append("<h2 class='hotelMainTitle'>"+rooms[0].name+"</h2>");
        for (var i = rooms.length - 1; i >= 0; i--){
            addRoom(rooms[i]);
        }



      }
    };
            
    // Initiate connection
    xhttp.open("GET", "data/rooms.json?"+"hotelID="+ID, true);
            
    // Send request
    xhttp.send();

}

function onSignIn(googleUser){
          // Useful data for your client-side scripts:
          var profile = googleUser.getBasicProfile();
          console.log("ID: " + profile.getId()); // Don't send this directly to your server!
          console.log('Full Name: ' + profile.getName());
          console.log('Given Name: ' + profile.getGivenName());
          console.log('Family Name: ' + profile.getFamilyName());
          console.log("Image URL: " + profile.getImageUrl());
          console.log("Email: " + profile.getEmail());

          // The ID token you need to pass to your backend:
          var id_token = googleUser.getAuthResponse().id_token;
          console.log("ID Token: " + id_token);
            
          // Pass the token to my getUserInfo
          getUserInfo({idtoken: id_token});
};
      
// Init map
function login(){
  getUserInfo({username:document.getElementById('user').value, password:document.getElementById('pass').value});
}

// Load and show users details
function getUserInfo(params) {
    // Create new AJAX request
    var xhttp = new XMLHttpRequest();
            
    // Define behaviour for a response
    xhttp.onreadystatechange = function() {
            
      if (this.readyState == 4 && this.status == 200) {
                
        // convert from string to JSON, populate hotels array
        user = JSON.parse(xhttp.responseText);
                    
        // Check is logged in
        if(user.username !== null){
          document.getElementById('loginForm').innerHTML=' \
          <h2>Welcome back, '+user.username+'</h2>';
        // else prompt for login
        }else{
          document.getElementById('loginForm').innerHTML=' \
          <h2>Please Log In/Sign Up</h2>\n \
          <input type="text" id="user" name="name">Username</input><br />\n \
          <input type="password" id="pass" name="name">Password</input><br />\n \
          <button onclick="login();">Login/Signup</button><br />\n';
        }
      }
    };
            
    // Initiate connection
    xhttp.open("POST", "/user.json", true);
            
    xhttp.setRequestHeader("Content-type","application/json");
            
    // Send request
    xhttp.send(JSON.stringify(params));
}

//This is for the map on the search view. Will need to interface with the database to change the lat and lng values for the markers
function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru,
           gestureHandling: 'cooperative' //to prevent the page scrolling when using two finger scroll on laptops etc
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
}

//This is for the second map on the hotel view
function initMap2() {
        var uluru = {lat: -25.363, lng: 131.044};
        map2 = new google.maps.Map(document.getElementById('map2'), {
          zoom: 4,
          center: uluru,
           gestureHandling: 'cooperative' //to prevent the page scrolling when using two finger scroll on laptops etc
        });


        var contentString = '<div id="contentMarker">'+
                      '<div id="siteNotice">'+
                      '</div>'+
                      '<h2 id="firstHeading" class="firstHeading">'+hotelStruct.title+'</h2>'+
                      '<div id="bodyContent">'+
                       hotelStruct.description+
                      '</div>'+
                      '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var hotelPos = {lat: hotelStruct.locationLat, lng: hotelStruct.locationLng};

        var marker = new google.maps.Marker({
          position: uluru,
          map: map2
        });

        marker.addListener('click', function() {
          infowindow.open(map2, marker);
        });

}

//this function will add a new hotel that will grabbed from the database query and show it in the search.html page
//at the moment this is activated when the search button is pressed on the search.html
function addHotel(hotelData){
  //build the structure for the searchResult
  $(".content").append("<div class='searchResult' id='result"+searchNumber+"'>");
  //where searchNumber is this will be replaced with the UDID from the database from the SQL query

  $("#result"+searchNumber).append("<form action='hotel.html'><input type='hidden' name='hotelID' value='"+hotelData.hotel_id+"'>"+"<button type='submit' class='searchResultButton'>View Rooms</button>"+"</form>");
  $("#result"+searchNumber).append("<img src='images/hotel"+hotelData.hotel_id+".jpg' class='searchResultImage'>");

  $("#result"+searchNumber).append("<h3 class='searchResultTitle'>"+hotelData.title+"</h3>");
  $("#result"+searchNumber).append("<p class='searchResultDescription'>"+hotelData.description+"</p>");

  $(".content").append("</div>");

  //add one to the counter to keep track of the number of posts and which ones are what
  searchNumber = searchNumber+1;
  $(".resultNumber").text("Showing "+searchNumber+" Results");

  //add a marker to the map, this will correspond to the struct which will be later pulled from the database
  //this also includes the title and description will later also have a price for the cheapest room
  var contentString = '<div id="contentMarker">'+
                      '<div id="siteNotice">'+
                      '</div>'+
                      '<h2 id="firstHeading" class="firstHeading">'+hotelData.title+'</h2>'+
                      '<div id="bodyContent">'+
                       hotelData.description+
                      '</div>'+
                      '</div>';

  var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

  var hotelPos = {lat: hotelData.locationLat, lng: hotelData.locationLng};
  var marker = new google.maps.Marker({
    position: hotelPos,
    map: map
  });

  marker.addListener('click', function() {
          infowindow.open(map, marker);
  });
}

function addRoom(roomData){

  //build the structure for the searchResult
  $(".content").append("<div class='searchResult' id='result"+searchNumber+"'>");


  //where searchNumber is this will be replaced with the UDID from the database from the SQL query
  $("#result"+searchNumber).append("<button type='submit' class='searchResultButton' onclick=\"window.location.href=\'hotel.html\'\">Book Now!</button>"); 
  $("#result"+searchNumber).append("<img src='images/hotel"+roomData.key+".jpg' class='searchResultImage'>");

  $("#result"+searchNumber).append("<h3 class='searchResultTitle'>"+roomData.title+"</h3>");
  $("#result"+searchNumber).append("<p class='searchResultDescription'>"+roomData.description+"</p>");

  $(".content").append("</div>");

  //add one to the counter to keep track of the number of posts and which ones are what
  searchNumber = searchNumber+1;
  $(".resultNumber").text("Showing "+searchNumber+" Results");

  //add a marker to the map, this will correspond to the struct which will be later pulled from the database
  //this also includes the title and description will later also have a price for the cheapest room
  var contentString = '<div id="contentMarker">'+
                      '<div id="siteNotice">'+
                      '</div>'+
                      '<h2 id="firstHeading" class="firstHeading">'+roomData.title+'</h2>'+
                      '<div id="bodyContent">'+
                       roomData.description+
                      '</div>'+
                      '</div>';

  var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

  var hotelPos = {lat: roomData.locationLat, lng: roomData.locationLng};
  var marker = new google.maps.Marker({
    position: hotelPos,
    map: map2
  });
  marker.addListener('click', function() {
          infowindow.open(map2, marker);
  });

}



 