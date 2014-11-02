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
			skrollr.init({
				forceHeight: false
			});
			$('form').css('height',$('form').height());
			// site.scrollHandler();
		},
		scrollHandler: function(){
			var that = this;
			// left: 37, up: 38, right: 39, down: 40,
			// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
			var keys = [37, 38, 39, 40, 32];

			function preventDefault(e) {
			  e = e || window.event;
			  if (e.preventDefault)
			      e.preventDefault();
			  e.returnValue = false;  
			}

			function keydown(e) {
			    for (var i = keys.length; i--;) {
			        if (e.keyCode === keys[i]) {
			            preventDefault(e);
			            return;
			        }
			    }
			}
			function wheel(e) {
			  $(document).on( 'DOMMouseScroll mousewheel', function(event) {
			  	if($('body').hasClass('characterState')){
				    if(event.deltaY == -1){

				      name = $('#charactercarousel>.roundabout-in-focus').attr('data');
				      name = name.replace(/\s/g, '');

				      if(name == 'undefined'){

				      }if(name != 'undefined'){
				      	that.crystalState(name);
				      }
				    }
			    };
			  });
			  $(document).on( 'DOMMouseScroll mousewheel', function(event) {
			    if($('body').hasClass('crystalState')){
				    if(event.deltaY == 1){
				    	that.characterState();
						that.closeCrystalSelection();
				    }
			    };
			  });
			  preventDefault(e);
			}
			window.disable_scroll = function() {
			  if (window.addEventListener) {
			      window.addEventListener('DOMMouseScroll', wheel, false);
			  }
			  window.onmousewheel = document.onmousewheel = wheel;
			  document.onkeydown = keydown;
			}

			window.enable_scroll = function() {
			    if (window.removeEventListener) {
			        window.removeEventListener('DOMMouseScroll', wheel, false);
			    }
			    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
			}
			disable_scroll();
		},
		pullWhine: function(){
			$('#whine').fadeOut('slow', function(){
				$.getJSON( "api/whines/random", function( data ) {
					whine = data.contents;
					by = data.by;
				  	console.log(whine);
				  	$('#whine>h2').html(whine);
				  	if(by){
				  		$('#whine>h3').remove();
				  		$('#whine').prepend('<h3></h3>')
				  		$('#whine>h3').html(by);
				  		$('#whine').fadeIn();
				  	}
				});
			})
		},
		postWhine: function(){
			$.ajax({
			    url: 'api/whines',
			    type: 'post',
			    data: JSON.stringify({
			        contents: ''+$('textarea').val()+'',
			        by: ''+$('.name').val()+''
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
			$('button').on('click', function(){
				site.pullWhine();
			});
			$('#drop').on('click', function(){
			        $('html,body').animate({
			          scrollTop: $(window).height()
			        }, 1500);
			});
		},
		successPost: function(){
			$('input:submit').css('pointer-events','none');
			$('.wrap h1, input, form').animate({
				opacity: '0'
			}, 1000, function(){
				$('form').height(0);
				$('.wrap h1').html('Thanks for whining here instead, you bitch.');
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

})(window.jQuery);
