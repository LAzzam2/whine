angular.module('whine', ['famous.angular', 'restangular'])

.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/');
}])
.controller('ScrollCtrl', ['$scope', '$famous', 'faObject', function($scope, $famous, faObject) {
        
    var EventHandler = $famous['famous/core/EventHandler'];
    $scope.eventHandler = new EventHandler();
    
    $scope.options = {
      scrollViewTwo: {
      }
    };
}])

.service('whineService', ['Restangular', function(Restangular) {
    // create restangular resources
    var whines = Restangular.all('whines');
    var randomWhines = whines.all('random');

    /**
     * Get whines in a paginated fashion
     */
    this.browse = function (page, perPage, filters, callback) {
        // query parameters
        var params = {};
        params.page = page || 1;
        params.perPage = perPage || 10;
        // call the resource with the params and register a callback
        whines.getList(params).then(callback);
    };

    /**
     * Get random whines
     */
    this.random = function (limit, callback) {
        var params = {};
        params.limit = limit || 10;
        randomWhines.getList(params).then(callback);
    };

    /**
     * Create whine
     */
    this.create = function (whine, callback) {
        whines.post(whine).then(callback);
    };

}])

.controller( 'HomeCtrl', ['$scope', 'whineService', function AppCtrl ( $scope, whineService) {
    /**
     * uses the whine service to create a new whine
     */
    $scope.createWhine = function(text, author) {
        var newWhine = {
            author: author,
            text: text,
        };
        whineService.create(newWhine);
    };
    /**
     * gets random whines
     */
    $scope.getRandomWhines = function() {
        $('#next').css('pointer-events','none');
        $("#whine").animate({
          opacity: 0
        }, function(){
          var limit = 10;
          whineService.random(limit, function(whines) {

              $scope.whineList = whines;
              $scope.currentWhine = _.first(whines);

              $('button').css('pointer-events','auto');
              $('button>span').removeClass('currentLike');

              $('#next').css('pointer-events','auto');
              $('#whine').animate({
                opacity: 1
              });

              rating = $scope.currentWhine.rating;
              $('.likes>h3>span').html(rating);

               if($('.name').html().length > 0){
                whineID = $scope.currentWhine._id;
                $.get( 'api/whine/'+whineID+'/rate', function( data ) {
                  if(data.rating > 0){
                    $('button>span').removeClass('currentLike');
                    $('.up').css('pointer-events','none');
                    $('.up>span').addClass('currentLike');
                  }else if (data.rating < 0){
                    $('button>span').removeClass('currentLike');
                    $('.down').css('pointer-events','none');
                    $('.down>span').addClass('currentLike');
                  }else {
                    $('button>span').removeClass('currentLike');
                  }
                });
              }

          });
          
        });
    };
}]);
