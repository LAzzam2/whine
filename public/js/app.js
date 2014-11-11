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
    
    faObject("scrollObject",function(scrollObject){
    	scrollObject.sync.on("start",function(event){
    		console.log('start');
	    	test(event);
	    });
	    scrollObject.sync.on("update", function (event) {
	    	console.log('update');
  			test(event);
		});
		scrollObject.sync.on("end",function(event){
			console.log('end');
	    	test(event);
	    });
	});
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
        var limit = 10;
        whineService.random(limit, function(whines) {
            $scope.whineList = whines;
            $scope.currentWhine = _.first(whines);
        });
    };
}]);
