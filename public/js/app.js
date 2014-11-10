angular.module( 'whine' , ['famous.angular'])
.service('whineService', [function(Restangular) {
}])
.controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
        
    var EventHandler = $famous['famous/core/EventHandler'];
    $scope.eventHandler = new EventHandler();
    
    $scope.options = {
      scrollViewTwo: {
      }
    };

}]);
