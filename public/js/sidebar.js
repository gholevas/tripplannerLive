$('#upperPanel').on('click', 'button', function() {
    if ($(this).attr('id') == 'hotelButton') {
    	var repeat;
    	var hotelName = $(this)[0].previousElementSibling.value;
        hotels.forEach(function(element){
        	if(element.name === hotelName) {
        			var hotelLocation = [element.place[0].location[0], element.place[0].location[1]];
        			repeat = drawLocation(hotelLocation, {
       					icon: '/images/lodging_0star.png'
    				},
    				hotelName,
    				$('#day-title').data("day") || 1,
    				'hotel'
    				);
        		}
        });
        if(!repeat) $('#hotelList').append('<div class="itinerary-item hotelItem"><span class="title">' + hotelName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');

    } else if ($(this).attr('id') == 'restaurantButton') {
    	var repeat;
    	var restaurantName = $(this)[0].previousElementSibling.value;
	    restaurants.forEach(function(element){
        	if(element.name === restaurantName) {
        			var restaurantLocation = [element.place[0].location[0], element.place[0].location[1]];
        			repeat = drawLocation(restaurantLocation, {
       					icon: '/images/restaurant.png'
    				},
    				restaurantName,
    				$('#day-title').data("day") || 1,
    				'restaurant'
    			);
        		}
        });
        if(!repeat){
      	  $('#restaurantList').append('<div class="itinerary-item restaurantItem"><span class="title">' + restaurantName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
        }

    } else if ($(this).attr('id') == 'activityButton') {
        var repeat;
        var activityName = $(this)[0].previousElementSibling.value;
    	activities.forEach(function(element){
        	if(element.name === activityName) {
        			var activityLocation = [element.place[0].location[0], element.place[0].location[1]];
        			repeat = drawLocation(activityLocation, {
       					icon: '/images/star-3.png'
    				},
    				activityName,
    				//console.log($('#day-title').data("day"))
    				$('#day-title').data("day") || 1,
    				'activity'
        		)}
        	
        });
        if(!repeat){
	        $('#activityList').append('<div class="itinerary-item activityItem"><span class="title">' + activityName + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
        }
    }
});

$('#lowerPanel').on('click', 'button', function() {
	var self = this;
	var thisname = $(this)[0].previousElementSibling.innerText;
	var today = $('#day-title').data("day") || 1;
     deleteThing(today, thisname);
	 $(self)[0].parentElement.remove()
});

function dayOn(day){
    for(var name in ourMarkers[day]){
        ourMarkers[day][name][0].setMap(map);
    }
}

function dayOff(day){
    for(var name in ourMarkers[day]){
        ourMarkers[day][name][0].setMap(null);
    }
}

$('.day-buttons').on('click','.day-btn' ,function() {
    var prevDay = $('#day-title').data("day") || 1;
	var today = +$(this)[0].innerText;
    $('#day-title').html('Day '+today+' ');
    $('#day-title').data("day", +today);
    dayOff(prevDay);
    dayOn(today);
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

function deleteThing(day,name){
	ourMarkers[day][name][0].setMap(null);
	delete ourMarkers[day][name];
}

function deleteDay(day){
	for(var key in ourMarkers[day]){
		deleteThing(day,key);
	}
}

$('#deleteDay').on('click', function() {
	var today = $('#day-title').data("day") || 1;
	deleteDay(today);
	ourMarkers.splice(today, 1);
	$(".day-btn:last").remove();
});

$('#addDay').on('click', function() {
	var num = (+$(this)[0].previousElementSibling.innerText)+1;
	var $day = $('<button class="btn btn-circle day-btn">'+num+'</button>');
	 $day.insertBefore($(this));
	 ourMarkers[num] = {};
});