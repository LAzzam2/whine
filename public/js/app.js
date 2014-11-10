angular.module( 'whine', ['whine.home'])
.service('whineService', ['$resource', function($resource) {
    var WhinesResource = $resource('/api/whines');
    this.getWhines = function ( page , perPage ) {
        var whines = WhinesResource.get({
            page: page || 1,
            perPage: perPage || 1
        }, function() {
            return whines;
        });
    }
}])
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | WHINE' ;
    }
  });
});
