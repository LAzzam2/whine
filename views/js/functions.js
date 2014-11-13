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
			site.pullRandomWhine();
			var whinePage = parseInt(window.location.hash.replace('#', ''));
			if(whinePage = 'nan'){
				whinePage = 0;
			}
			site.pullWhineGroup(whinePage);
			site.clickFunc();
			$('form').css('height',$('form').height());
			// site.skrollrInit();
			site.logoScroll();
			site.navScroll();
			site.backgroundScroll();

			function updatePosition () {
				site.backgroundScroll(this.y);
			}

			function loaded () {
				myScroll = new IScroll('#sections', { probeType: 3, mouseWheel: true });

				myScroll.on('scroll', updatePosition);
				myScroll.on('scrollEnd', updatePosition);
			}
			loaded();
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		},
		logoScroll: function(){
			var sectionHeight = $('#homeHero').height();
			var scrollTop     = $(window).scrollTop(),
			    elementOffset = $('#postWhine').offset().top,
			    distance      = (elementOffset - scrollTop);
			if($('#homeHero .wrap').css('opacity') == 0){
				$('#logo').css('top','25px');
			}else{
				$('#logo').css('top','-63px');
			}	
		},
		navScroll: function(){
			var sectionHeight = $('#homeHero').height();
			var scrollTop     = $(window).scrollTop(),
			    elementOffset = $('#browseWhines').offset().top,
			    distance      = (elementOffset - scrollTop);
			if($('#browseWhines #whine').css('opacity') > 0 || $('#browseWhines #whines').css('opacity') > 0 ){
				$('#toggle').css({
					opacity: '1'
				});
			}else{
				$('#toggle').css({
					opacity: '0'
				});
			}
		},
		pullRandomWhine: function(){
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
		},
		pullWhineGroup: function(page){
			$.getJSON( "api/whines?perPage=5&page="+page+"", function( data ) {
				window.location.hash = page;
			  	$('#whines>ul').empty();
			  	$.each(data, function( index, value ) {
				  $('#whines>ul').append('<li><span>by: '+value.author+'</span> '+value.text+'</li>');
				  $('#whines').fadeIn();
				});
			});
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
			$('#toggle>ul>li:eq(0)').on('click', function(){
				$('#toggle li').attr('class','');
				$(this).attr("class","active");
				site.browse();
			});
			$('#toggle>ul>li:eq(1)').on('click', function(){
				$('#toggle li').attr('class','');
				$(this).attr("class","active");
				site.list();
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
		},
		browse: function(){
			$('#whines').addClass("hide");
			$('#whine').removeClass("hide");
		},
		list: function(){
			$('#whines').removeClass("hide");
			$('#whine').addClass("hide");
		},
		skrollrInit: function(){
			var sections = $('.section');
			var windowHeight = $(window).height();
			$.each(sections,function(){
				var index = $(this).index();
				var wrap = $(this).children('.wrap');
				var dropP = $(this).children('.drop').children('p');
				var dropImg = $(this).children('.drop').children('img');
				var contentHeight = wrap.height();
					
				wrap.attr('data--200-center','opacity: 0; top: 40%;');
				wrap.attr('data--100-center','opacity: 1; top: 50%;');
				wrap.attr('data-center','opacity: 1; top: 50%;');
				wrap.attr('data-100-center','opacity: 1; top: 50%;');
				wrap.attr('data-200-center','opacity: 0; top: 60%;');


				dropP.attr('data-bottom','opacity: 1;');
				dropP.attr('data--150-bottom','opacity: 0;');

				dropImg.attr('data-bottom','opacity: 1;');
				dropImg.attr('data--150-bottom','opacity: 0;');
			});

			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 				return
			}else {
				skrollr.init({
					forceHeight: false
				});
			}
		},
		backgroundScroll: function(x){
			var y = x;
			var sections = $('.section').parent('li');
			$.each(sections,function(){
				var bg = $(this).children('.section').children('.bg');
				var index = $(this).index();
				bg[0].style.webkitTransform = "translate(-50%,"+(-y-($(window).height()*index))+"px)";
			});
		},
	}

	$(document).ready(function (){
		site.init();
	});

	$(window).load(function() {

	});

	$(window).resize(function() {
		site.init();
	});


})(window.jQuery);
