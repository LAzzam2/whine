// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function($){
	var site = {
		init: function(){
			site.pullWhine();
		},
		pullWhine: function(){
			$.getJSON( "api/whines/", function( data ) {
				whine = data[Math.floor(Math.random() * data.length-1)+1].contents;
			  	console.log(whine);
			  	$('#whine>h2').html(whine);
			});
		},
	}
	
	$(document).ready(function (){
		site.init();
	});
	
	$(window).load(function() {
		
	});
	
	$(window).resize(function() {
		
	});

})(window.jQuery);