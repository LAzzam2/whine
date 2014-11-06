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
			// site.pullRandomWhine();
			var whinePage = parseInt(window.location.hash.replace('#', ''));
			if(whinePage = 'nan'){
				whinePage = 0;
			}
			site.pullWhineGroup(whinePage);
			site.clickFunc();
			skrollr.init({
				forceHeight: false
			});
			site.logoScroll();
			$('form').css('height',$('form').height());
			$('#whine').animate({'opacity':'1'});
		},
		logoScroll: function(){
			var sectionHeight = $('#homeHero').height();
			var scrollTop     = $(window).scrollTop(),
			    elementOffset = $('#postWhine').offset().top,
			    distance      = (elementOffset - scrollTop);
			if(distance <= sectionHeight/2){
				$('#logo').css('top','25px');
			}else{
				$('#logo').css('top','-63px');
			}
		},
		pullRandomWhine: function(){
			$('#whine').fadeOut('slow', function(){
				$.getJSON( "api/whines/random", function( data ) {
					whine = data.text;
					author = data.author;
				  	$('#whine>h2').html(whine);
				  	if(author){
				  		$('#whine>h3').remove();
				  		$('#whine').prepend('<h3></h3>')
				  		$('#whine>h3').html(author);
				  	}
				  	$('#whine').fadeIn();
				});
			})
		},
		pullWhineGroup: function(page){
			$('#whines').fadeOut('slow', function(){
				$.getJSON( "api/whines?perPage=5&page="+page+"", function( data ) {
					window.location.hash = page;
				  	$('#whines>ul').empty();
				  	$.each(data, function( index, value ) {
					  $('#whines>ul').append('<li>'+value.text+'</li>');
					  $('#whines').fadeIn();
					});
				});
			})
		},
		postWhine: function(){
			$.ajax({
			    url: 'api/whines',
			    type: 'post',
			    data: JSON.stringify({
			        text: ''+$('textarea').val()+'',
			        author: ''+$('.name').val()+''
			    }),
			    headers: {
			        "Content-Type": 'application/json',
			    },
			    dataType: 'json',
			    success: function (data) {
			        site.successPost();
			    }
			});
		},
		clickFunc: function(){
			$('input:submit').on('click', function( event ){
				event.preventDefault();
				if($('textarea').val()){
					site.postWhine();
				}
			});
			$('#whine button').on('click', function(){
				site.pullRandomWhine();
			});
			$('#whines button').on('click', function(){
				var whinePage = parseInt(window.location.hash.replace('#', '')) +1;
				console.log(whinePage);
				site.pullWhineGroup(whinePage);
			});
			$('#d1').on('click', function(){
			        $('html,body').animate({
			          scrollTop: $(window).height()
			        }, 1500);
			});
			$('#d2').on('click', function(){
			        $('html,body').animate({
			          scrollTop: $(window).height()*2
			        }, 1500);
			});
			$('#logo').on('click',function(event){
				event.preventDefault();
				$('html,body').animate({ scrollTop: 0 }, 400);
			});
		},
		successPost: function(){
			$('input:submit').css('pointer-events','none');
			$('.wrap h1, input, form').animate({
				opacity: '0'
			}, 1000, function(){
				$('form').height(0);
				$('.wrap h1').html('Thanks for whining here.');
				$('.wrap h1').css('text-align','center');
				$('.wrap h1').animate({opacity: '1'}, 1000);
			});
		}
	}

	$(document).ready(function (){
		site.init();
	});

	$(window).load(function() {

	});

	$(window).resize(function() {

	});

	$(window).scroll(function(){
		site.logoScroll();
	});
	


})(window.jQuery);
