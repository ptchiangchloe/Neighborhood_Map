// Use tutorials for creating multiple markers from http://en.marnoto.com/2013/12/mapa-com-varios-marcadores-google-maps.html
//The information is stored in an array of objects variable called markersData
var markers = [{
        lat: 37.787904,
        lng: -122.405274,
        name: 'Valentino',
        markerId: 0,
        venueId: "52dc7459498e684da502c83e"
    }, {
        lat: 37.787899,
        lng: -122.406022,
        name: 'Chanel',
        markerId: 1,
        venueId: "4ee551cb61aff5a342a411eb"
    }, {
        lat: 37.787244,
        lng: -122.405187,
        name: 'Emporio Armani',
        markerId: 2,
        venueId: "4a97090cf964a520162820e3"
    }, {
        lat: 37.787243,
        lng: -122.406880,
        name: 'Louis Vitton',
        markerId: 3,
        venueId: "5086cce64c7f15b6c84dbc67"
    }, {
        lat: 37.788194,
        lng: -122.406476,
        name: 'Gucci',
        markerId: 4,
        venueId: "4a74564ef964a520e2dd1fe3"
    }]
    // This way of storing information is not the most effective from the viewpoint of performance of the JavaScript code. However what is intended here is to show, in the clearest possible way, how to create a procedure to insert multiple markers on a map.

// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers() {
    // this variable sets the map bounds and zoom level according to markers position
    var bounds = new google.maps.LatLngBounds();

    // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
    for (var i = 0; i < markers.length; i++) {

        var latlng = new google.maps.LatLng(markers[i].lat, markers[i].lng);
        var name = markers[i].name;
        var venueId = markers[i].venueId;
        var markerId = markers[i].markerId;
        createMarker(latlng, name, venueId, markerId);

        // Marker’s Lat. and Lng. values are added to bounds variable
        bounds.extend(latlng);

        // Finally the bounds variable is used to set the map bounds
        // with API’s fitBounds() function
        map.fitBounds(bounds);
    }
}


// This function creates each marker and sets their Info Window content
function createMarker(latlng, name, venueId, markerId) {
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: name
    });
    markersArray.push(marker);

    // This event expects a click on a marker
    // When this event is fired the infowindow content is created
    // and the infowindow is opened
    google.maps.event.addListener(marker, 'click', (function(marker, markerId) {
        // Variable to define the HTML content to be inserted in the infowindow
        return function(){
        requestFourSquareApi(marker, venueId);
        toggleBounce(marker);
        // opening the infowindow in the current map and at the current marker location
        infoWindow.open(map, marker);
      }
    })(marker, markerId));
}

function toggleBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 1500);
}

function requestFourSquareApi(marker, venueId) {
    $.ajax({
        type: 'GET',
        url: "https://api.foursquare.com/v2/venues/" + venueId + "?client_id=50RVLR23M3GJUAYXR1DUEISYTQAQ1X3RVEIIMAITF0THE3TC&client_secret=VUXIGGSVZZ4F4KCCAVQERN024C10YXJPQAA4UHS1KZKBDUX3&v=201609227",
        dataType: "json",
        success: function(data) {
            var result = data.response.venue;
            var name = result.name;
            var phone = result.contact.formattedPhone? result.contact.formattedPhone : 'No phone available.';
            var address = result.location.address;
            var postalCode = result.location.postalCode;
            var url = result.url? result.url : 'No link available.';
            var content = '<div id="iw_container">' +
                '<div class="iw_title">' + name + '</div>' +
                '<div class="iw_content">' + address + '<br />' +
                postalCode + '<br />' + phone + '<br />' + url + '</div></div>';
            // including content to the infowindow
            infoWindow.setContent(content);

            console.log("success");
        },
        error: function(error) {
            alert("request foursquare information failed, please contact: xxx@gmail.com");
        }
    });
}

function googleError() {
  alert("request google map failed, please contact: xxx@gmail.com")
}

function initMap() {
    var mapOptions = {
        center: new google.maps.LatLng(37.787244, -122.405187),
        zoom: 15,
        mapTypeId: 'roadmap',
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //  var searchBox = new google.maps.places.SearchBox(Menu.input);

    // a new Info Window is created
    infoWindow = new google.maps.InfoWindow();

    // Event that closes the InfoWindow with a click on the map
    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
    });

    // Finally displayMarkers() function is called to begin the markers creation
    displayMarkers();
    // console.log(markersArray);
}
