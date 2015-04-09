jQuery(document).ready(function($) {

	var fillingBlocks = $( '.cd-service' ).not( '.cd-service-divider' );

	var topValueFillingBlocks = [];
	fillingBlocks.each(function(index){
		var topValue = $(this).offset().top;
		topValueFillingBlocks[topValueFillingBlocks.length] = topValue;
	});

	$(window).on('scroll', function(){

		updateOnFocusItem(fillingBlocks.slice(0));

		bodyBackground(topValueFillingBlocks);
	});

	vibrate( "#twit" );
	vibrate( "#mail" );
	vibrate( "#lkin" );	

	upTime('nov,15,2013,014:00:00');

});

function updateOnFocusItem(items) {
	items.each(function(){
		( $(this).offset().top - $(window).scrollTop() <= $(window).height()/2 ) ? $(this).addClass('focus') : $(this).removeClass('focus');
	});
}

function bodyBackground(itemsTopValues) {
	var topPosition = $( window ).scrollTop() + $( window ).height()/2,
		servicesNumber = itemsTopValues.length;
	$.each(itemsTopValues, function(key, value){
		if ( (itemsTopValues[key] <= topPosition && itemsTopValues[key+1] > topPosition) || (itemsTopValues[key] <= topPosition && key+1 == servicesNumber ) ) {	
			$( 'body' ).removeClass('new-color-'+(key-1)+' new-color-'+(key+1)).addClass('new-color-'+key);
		}
	});
}


function vibrate(elem) {
  var interval = 10;
  var duration= 1000;
  var shake= 3;
  var vibrateIndex = 0;
  var selector = $( elem );
    $(selector).hover(
        function(){ 
        vibrateIndex = setInterval(vibrate, interval);    
        },
        function(){ 
            clearInterval(vibrateIndex);
            $(selector).stop(true,false)
                .css({position: 'static', left: '0px', top: '0px'});
        }
    
    );
    var vibrate = function(){
        $(selector).stop(true,false)
        .css({position: 'relative', 
        left: Math.round(Math.random() * shake) - ((shake + 1) / 2) +'px', 
        top: Math.round(Math.random() * shake) - ((shake + 1) / 2) +'px'
        });
    }
};


function upTime(countTo) {
  now = new Date();
  countTo = new Date(countTo);
  difference = (now-countTo);

  days=Math.floor(difference/(60*60*1000*24)*1);
  hours=Math.floor((difference%(60*60*1000*24))/(60*60*1000)*1);
  mins=Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
  secs=Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);

  // $('#years').text(years);
  $('#days').text(days);
	$('#hours').text(hours);
 	$('#minutes').text(mins);
  $('#seconds').text(secs);

  clearTimeout(upTime.to);
  upTime.to=setTimeout(function(){ upTime(countTo); },1000);
};