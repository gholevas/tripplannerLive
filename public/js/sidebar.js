$('#upperPanel').on('click', 'button', function() {
    if ($(this).attr('id') == 'hotelButton') {
    	var hotelName = $(this)[0].previousElementSibling.value;
        $('#hotelList').append('<div class="itinerary-item hotelItem"><span class="title">' + hotelName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
        hotels.forEach(function(element){
        	if(element.name === hotelName) {
        			var hotelLocation = [element.place[0].location[0], element.place[0].location[1]];
        			drawLocation(hotelLocation, {
       					icon: '/images/lodging_0star.png'
    				},
    				hotelName
    				);
        		}
        });

    } else if ($(this).attr('id') == 'restaurantButton') {
    	var restaurantName = $(this)[0].previousElementSibling.value;
        $('#restaurantList').append('<div class="itinerary-item restaurantItem"><span class="title">' + restaurantName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
	    restaurants.forEach(function(element){
        	if(element.name === restaurantName) {
        			var restaurantLocation = [element.place[0].location[0], element.place[0].location[1]];
        			drawLocation(restaurantLocation, {
       					icon: '/images/restaurant.png'
    				},
    				restaurantName);
        		}
        });

    } else if ($(this).attr('id') == 'activityButton') {
        var activityName = $(this)[0].previousElementSibling.value;
        $('#activityList').append('<div class="itinerary-item activityItem"><span class="title">' + activityName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    	activities.forEach(function(element){
        	if(element.name === activityName) {
        			var activityLocation = [element.place[0].location[0], element.place[0].location[1]];
        			drawLocation(activityLocation, {
       					icon: '/images/star-3.png'
    				},
    				activityName
        		)}
        	
        });
    }
});

$('#lowerPanel').on('click', 'button', function() {
	var thisname = $(this)[0].previousElementSibling.innerText;
	 ourMarkers[thisname].setMap(null);
     delete ourMarkers[thisname];
    
	 $(this)[0].parentElement.remove()
});