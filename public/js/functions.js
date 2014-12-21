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
      site.clickFunc();
      $('form').css('height',$('form').height());
      site.logoScroll();
      site.navScroll();
      site.backgroundScroll();
      site.auth();
      site.user;

      setTimeout(function(){
        $('#next').click();
      }, 300)

      function updatePosition() {
        $('.drop').mouseout();
        site.backgroundScroll(this.y);
        site.logoScroll(this.y);
        site.navScroll(this.y);
      }

      function loaded () {
        myScroll = new IScroll('#sections', { 
          momentum: true,
          probeType: 3, 
          mouseWheel: true,
        });

        myScroll.on('scroll', updatePosition);
      }
      loaded();
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    },
    auth: function(){
      $.getJSON( "auth", function( data ) {
        var user = [];
        $.each( data, function( key, val ) {
          user.push( key, val);
        });
        site.userState(user);
      }); 
    },
    userState: function(user){
      site.user = user;
      if(user[1] == true){
        $('#user').addClass('loggedIn');
        $('#user .name').html(user[3]);
        $('input[name]').val(user[3]);
        $('#user a').attr('href','auth/logout').html('Logout');
      }else{
      }
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
          opacity: '.4',
          pointerEvents: 'auto'
        });
      }else{
        $('#toggle').css({
          opacity: '0',
          pointerEvents: 'none'
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
      $('textarea').on('focus', function(){
      });
      $('textarea').on('blur', function(){
        
      sections.width(window.innerWidth);
      sections.height(window.innerHeight);
      });

      $('.likes').on('click', function(){
        site.like();
      });
      $('#sections, .close').on('click', function(){
        if($('body').hasClass('login')){
          site.like();
        }
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
    backgroundScroll: function(distance){
      var height = window.innerHeight;
      var distance = distance;
      var sections = $('.section').parent('li');
      sections.width(window.innerWidth);
      sections.height(window.innerHeight);
      $.each(sections,function(){

        var index = $(this).index();
        var bg = $(this).children('.section').children('.bg');
        bg.css({
          'transform':"translate(-50%,"+(-distance-(height*index))+"px)",
          '-moz-transform':"translate(-50%,"+(-distance-(height*index))+"px)",
          '-ms-transform':"translate(-50%,"+(-distance-(height*index))+"px)",
          '-webkit-transform':"translate(-50%,"+(-distance-(height*index))+"px)",
          '-o-transform':"translate(-50%,"+(-distance-(height*index))+"px)"
        });


        var wrap = $(this).children('.section').children('.wrap');
        var button = $(this).children('.section').children('.drop');
        var wrapHeight = wrap.height();
        var top = (index+1)*height;

        var scrollStart = index*height;
        var scrollMiddle = scrollStart+(height/2);
        var scrollEnd = scrollStart+height;

        if(-distance >= scrollStart){
          wrap.css({
            'opacity':''+(1+((distance+(height*index))/(top/2)))+'',
          });

          var buttonOpacity = (.6+((distance+(height*index))/(top/3)));
          button.css({
            'opacity':''+buttonOpacity+'',
          });
          if(buttonOpacity <= 0){
            button.css({'pointer-events':'none'});
          }else{
            button.css({'pointer-events':'auto'});
          }
        }
      });
    },
    login: function(){
      $('#sections, #login').stop();
      if(!$('body').hasClass('login')){
        $('#sections').animate({opacity: .4});
        $('#login').css('pointer-events','auto');
        $('#login').delay(150).animate({opacity: 1}, function(){
          $('body').removeClass('login');
          $('body').addClass('login');
        });
      }else{
        $('body').removeClass('login');
        $('#sections').delay(150).animate({opacity: 1});
        $('#login').css('pointer-events','none');
        $('#login').animate({opacity: 0});
      }
    },
    like: function(){
      console.log(site.user[1]);
      if(site.user[1] == true){
        alert("Thanks for voting! Loljk the voting isn't working yet. Once it is... shits getting real");
      }else{
        site.login();
      }
    },
  }

  $(document).ready(function (){
    site.init();
  });

  $(window).load(function() {
    site.logoScroll(myScroll.y);
  });

  $(window).resize(function() {
    site.backgroundScroll(myScroll.y);
    site.logoScroll(myScroll.y);
  });


})(window.jQuery);
