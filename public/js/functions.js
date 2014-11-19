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

      function updatePosition() {
        site.backgroundScroll(this.y);
        site.logoScroll(this.y);
        site.navScroll(this.y);
      }

      function loaded () {
        myScroll = new IScroll('#sections', { 
          probeType: 3, 
          mouseWheel: true,
          bounce: false,
        });

        myScroll.on('scroll', updatePosition);
        myScroll.on('scrollEnd', updatePosition);
      }
      loaded();
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
    logoScroll: function(distance){
      var topLimit      = window.innerHeight/2;
          distance      = -distance;

      function mBarDown(){
        $('#mBar').css({
          'transform':"translate(0px,-65px)",
          '-moz-transform':"translate(0px,-65px)",
          '-ms-transform':"translate(0px,-65px)",
          '-webkit-transform':"translate(0px,-65px)",
          '-o-transform':"translate(0px,-65px)"
        });
      };

      if( distance >= topLimit){
        if(window.innerWidth <= 640){
          $('#logo').css('top','20px');
          $('#mBar').css({
          'transform':"translate(0px,0px)",
          '-moz-transform':"translate(0px,0px)",
          '-ms-transform':"translate(0px,0px)",
          '-webkit-transform':"translate(0px,0px)",
          '-o-transform':"translate(0px,0px)"
          });
        }else{
          $('#logo').css('top','35px');
          mBarDown();
        }
      }else{
        $('#logo').css('top','-80px');
        mBarDown();
      } 
      

    },
    navScroll: function(distance){
      var topLimit      = window.innerHeight*2;
          distance      = -distance;
      if( distance >= topLimit){
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
        site.pullWhineGroup(whinePage);
      });
      $('#d1').on('click', function(){
        myScroll.scrollTo('',-window.innerHeight, 1000);
      });
      $('#d2').on('click', function(){
        myScroll.scrollTo('',-window.innerHeight*2, 1000);
      });
      $('#logo').on('click',function(event){
        event.preventDefault();
        myScroll.scrollTo('',0, 1000);
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
      $('textarea').on('focus', function(){
      });
      $('textarea').on('blur', function(){
        
      sections.width(window.innerWidth);
      sections.height(window.innerHeight);
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
    backgroundScroll: function(distance){
      var distance = distance;
      var sections = $('.section').parent('li');

      var sections = $('.section').parent('li');
      sections.width(window.innerWidth);
      sections.height(window.innerHeight);
      $.each(sections,function(){
        var bg = $(this).children('.section').children('.bg');
        var wrap = $(this).children('.section').children('.wrap');
        var index = $(this).index();
        var top = index*window.innerHeight;

        bg.css({
          'transform':"translate(-50%,"+(-distance-($(window).height()*index))+"px)",
          '-moz-transform':"translate(-50%,"+(-distance-($(window).height()*index))+"px)",
          '-ms-transform':"translate(-50%,"+(-distance-($(window).height()*index))+"px)",
          '-webkit-transform':"translate(-50%,"+(-distance-($(window).height()*index))+"px)",
          '-o-transform':"translate(-50%,"+(-distance-($(window).height()*index))+"px)"
        });
      });
    }
  }

  $(document).ready(function (){
    site.init();
  });

  $(window).load(function() {
    site.logoScroll(myScroll.y);
  });

  $(window).resize(function() {
    console.log(myScroll.y);
    site.backgroundScroll(myScroll.y);
    site.logoScroll(myScroll.y);
    site.toggleScroll(myScroll.y);
  });


})(window.jQuery);
