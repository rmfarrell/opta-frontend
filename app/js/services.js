'use strict';

/* Services */

/*
angular.module('phonecatServices', ['ngResource']).
    factory('Phone', function($resource){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
});
*/

//Not used at the moment
angular.module('gameServices', ['ngResource']).
    factory('Game', function($resource){
  return $resource('../get_data.php', {}, {
    query: {method:'GET', params:{game_id: 131956, 'feed_type' : 24}, isArray:true}
  });
});