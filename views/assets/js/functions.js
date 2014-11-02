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
			site.clickFunc();
		},
		pullWhine: function(){
		},
		postWhine: function(){
			$.ajax({
			    url: 'api/whines',
			    type: 'post',
			    data: JSON.stringify({
			        content: ''+$('textarea').html()+''
			    }),
			    headers: {
			        "Content-Type": 'application/json',
			    },
			    dataType: 'json',
			    success: function (data) {
			        console.log(data);
			    }
			});
		},
		clickFunc: function(){
			$('input:submit').on('click', function( event ){
				event.preventDefault();
				console.log('whine sent');
				site.postWhine();
			})
		}
	}

	$(document).ready(function (){
		site.init();
	});

	$(window).load(function() {

	});

	$(window).resize(function() {

	});

})(window.jQuery);
