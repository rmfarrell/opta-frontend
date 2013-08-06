'use strict';

/* App Module */
angular.module('opta', ['eventTypeFilter']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      //when('/games', {templateUrl: 'partials/events.html',   controller: timeline}).
      when('/map', {templateUrl: 'partials/passmap.html',   controller: passmap}).
      //when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/map'});
}]);
