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

