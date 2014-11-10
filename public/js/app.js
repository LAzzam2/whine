angular.module( 'whine' , ['famous.angular'])
.service('whineService', [function(Restangular) {
}])
.controller( 'HomeCtrl', ['$scope', function AppCtrl ( $scope ) {
    $scope.test = "Angular works!";
    $scope.stuff = [
        'fdsa  ',
        ' paosdpf ppaosd '
    ]
}]);
