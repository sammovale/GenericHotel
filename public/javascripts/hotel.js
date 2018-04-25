//use search number at the moment but will most likely change to a unique ID/key in the database that will be refrenced 
var searchNumber = 3;
var map = null;
var map2 = null;

//create a hotelStruct/object that will be used but replaced with a struct that grabs data from the database
var hotelStruct = {title:"Mantra Hindmarsh Square", description:"The Mantra Hotel is a very fine hotel with fantastic views. Great pricing and location makes Mantra the hotel for you! There is a pool and all other sorts of entertainment.",
                    key:"1", locationLat:-26.363, locationLng:132.044
};

var roomStruct = {title:"The Penthouse $300", description:"The Mantra Hotel is a very fine hotel with fantastic views. Great pricing and location makes Mantra the hotel for you! There is a pool and all other sorts of entertainment.", key:"1"}

//listen for events
$(document).ready(function(){
  //if the search button is clicked run the addHotel function for now
  $("#searchData").click(function(){
   addHotel(hotelStruct);
  });

  $(".resultNumber").text("Showing "+searchNumber+" Results");

  $("#contact").click(function(){
    addRoom(roomStruct);
  });
});



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
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
}

//this function will add a new hotel that will grabbed from the database query and show it in the search.html page
//at the moment this is activated when the search button is pressed on the search.html
function addHotel(hotelData){
  //build the structure for the searchResult
  $(".content").append("<div class='searchResult' id='result"+searchNumber+"'>");
  //where searchNumber is this will be replaced with the UDID from the database from the SQL query
  $("#result"+searchNumber).append("<button type='submit' class='searchResultButton' onclick=\"window.location.href=\'hotel.html\'\">View Rooms</button>"); 
  $("#result"+searchNumber).append("<img src='images/hotel"+hotelData.key+".jpg' class='searchResultImage'>");

  $("#result"+searchNumber).append("<h3 class='searchResultTitle'>"+hotelData.title+"</h3>");
  $("#result"+searchNumber).append("<p class='searchResultDescription'>"+hotelData.description+"</p>");

  $(".content").append("</div>");

  //add one to the counter to keep track of the number of posts and which ones are what
  searchNumber = searchNumber+1;
  $(".resultNumber").text("Showing "+searchNumber+" Results");

  //add a marker to the map
  var hotelPos = {lat: hotelData.locationLat, lng: hotelData.locationLng};
  var marker = new google.maps.Marker({
    position: hotelPos,
    map: map
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

}



 