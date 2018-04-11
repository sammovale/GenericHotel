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


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

