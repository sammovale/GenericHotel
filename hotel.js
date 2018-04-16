//use search number at the moment but will most likely change to a unique ID/key in the database that will be refrenced 
var searchNumber = 3;

//create a hotelStruct/object that will be used but replaced with a struct that grabs data from the database
var hotelStruct = {title:"Mantra Hindmarsh Square", description:"The Mantra Hotel is a very fine hotel with fantastic views. Great pricing and location makes Mantra the hotel for you! There is a pool and all other sorts of entertainment.",
                    key:"1"
};

//listen for events
$(document).ready(function(){
  //if the search button is clicked run the addHotel function for now
  $("#searchData").click(function(){
   addHotel(hotelStruct);
  });

  $(".resultNumber").text("Showing "+searchNumber+" Results");

});



//This is for the map on the search view. Will need to interface with the database to change the lat and lng values for the markers
function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
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
        var map = new google.maps.Map(document.getElementById('map2'), {
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
  $("#result"+searchNumber).append("<img src='hotel"+hotelData.key+".jpg' class='searchResultImage'>");

  $("#result"+searchNumber).append("<h3 class='searchResultTitle'>"+hotelData.title+"</h3>");
  $("#result"+searchNumber).append("<p class='searchResultDescription'>"+hotelData.description+"</p>");

  $(".content").append("</div>");

  //add one to the counter to keep track of the number of posts and which ones are what
  searchNumber = searchNumber+1;
  $(".resultNumber").text("Showing "+searchNumber+" Results");

}



 