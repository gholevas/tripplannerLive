    // initialize new google maps LatLng object
    var myLatlng = new google.maps.LatLng(40.705189, -74.009209);

    // set the map options hash
    var mapOptions = {
        center: myLatlng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // get the maps div's HTML obj
    var map_canvas_obj = document.getElementById('map-canvas');

    // initialize a new Google Map with the options
    var map = new google.maps.Map(map_canvas_obj, mapOptions);


    // draw some locations on the map
    var ourMarkers = {};
    function drawLocation(location, opts, name) {
        if (typeof opts !== 'object') {
            opts = {};
        }
        opts.position = new google.maps.LatLng(location[0], location[1]);
        opts.map = map;
        var marker = new google.maps.Marker(opts);
        ourMarkers[name] = marker;
    }

$(document).ready(function() {
  //  initialize_gmaps();
});




