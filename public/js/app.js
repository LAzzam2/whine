angular.module( 'whine' , [])
.service('whineService', [function(Restangular) {
}])
.controller( 'HomeCtrl', ['$scope', function AppCtrl ( $scope ) {
    $scope.test = "Angular works!";
}]);
