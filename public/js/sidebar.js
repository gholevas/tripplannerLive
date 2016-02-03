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
    				hotelName,
    				$('#day-title').data("day") || 1,
    				'hotel'
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
    				restaurantName,
    				$('#day-title').data("day") || 1,
    				'restaurant'
    			);
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
    				activityName,
    				//console.log($('#day-title').data("day"))
    				$('#day-title').data("day") || 1,
    				'activity'
        		)}
        	
        });
    }
});

$('#lowerPanel').on('click', 'button', function() {
	var thisname = $(this)[0].previousElementSibling.innerText;
	var today = $('#day-title').data("day") || 1;
	 ourMarkers[today][thisname][0].setMap(null);
     delete ourMarkers[today][thisname];
    
	 $(this)[0].parentElement.remove()
});

$('.day-buttons').on('click','.day-btn' ,function() {
	var today = +$(this)[0].innerText;
	$('#day-title').html('Day '+today+' ')
	$('#day-title').data("day", +today);
	$('#lowerPanel >> .list-group').each(function(index,element){
		element.innerHTML = '';
		console.log(index);
		if(index === 0) {
			for(var key in ourMarkers[today]){
				if(ourMarkers[today][key][1] === "hotel"){
				$(this).append('<div class="itinerary-item hotelItem"><span class="title">' + key + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
				}
			}
		}else if(index === 1) {
			for(var key in ourMarkers[today]){
				if(ourMarkers[today][key][1] === "restaurant"){
				$(this).append('<div class="itinerary-item restaurantItem"><span class="title">' + key + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
				}
			}
		}else if(index === 2) {
			for(var key in ourMarkers[today]){
				if(ourMarkers[today][key][1] === "activity"){
				$(this).append('<div class="itinerary-item activityItem"><span class="title">' + key + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
				}
			}
		}
	})


});

$('#addDay').on('click', function() {
	var num = (+$(this)[0].previousElementSibling.innerText)+1;
	var $day = $('<button class="btn btn-circle day-btn">'+num+'</button>');
	 $day.insertBefore($(this));
	 ourMarkers[num] = {};
});