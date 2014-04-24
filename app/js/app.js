'use strict';

/* App Module */
var app = angular.module('opta', ['eventTypeFilter']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider
      //when('/games', {templateUrl: 'partials/events.html',   controller: timeline}).
      .when('/map/:gameId', {
				templateUrl: 'partials/passmap.html',
				controller: 'passmap'
			})
			.when('/stats/:gameId', {
				templateUrl: 'partials/stattables.html',
				controller: 'stats'
			})
			.when('/menu', {
				templateUrl: 'partials/menu.html',
				controller: 'menu'
			})
      //when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      .otherwise({redirectTo: '/menu'});
}]);

// var menu = angular.module('menu', []).
// 	config(['$routeProvider', function($routeProvider) {
// 		
// 		$routeProvider
// 			.when('/menu', {
// 				templateUrl: 'partials/menu.html',
// 				controller: 'games'
// 			})
// }]);