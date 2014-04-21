'use strict';

/* Controllers */

var MatchData = {};

var teams = []; //Delete later

var players = [];

var homeTeam = 0;

function stats($scope, $http) {
	
}

function passmap($scope, $http, $route, $filter) {
	
	$scope.filterItem = {store: 0};
	
	$scope.filterPlayers = {};
	
	$scope.filterTeams = [];
	
	$scope.filterTime = {
		
		start : 0,
		end : 90
	}
	
	$scope.gameId = $route.current.params.gameId;
	
	var $passInfo = $('#pass-info');
	
	var $passMap = $('#passMap');

	$passInfo.find('#pass-info-close').click(function(e) {
		
		e.preventDefault();
		$passInfo.fadeOut();
	})
	
	$scope.customFilter = function (data) {
		
		var requestedTeam = $scope.filterItem.store;
		
		var matchedPlayer = 'p' + data["@attributes"].player_id;
		
		var requestedPlayers = [];
		
		var currentMinute = data["@attributes"].min;
		
		if (!$filter('isPass')(parseInt(data["@attributes"].type_id))) return false;
			
		$.each($scope.filterPlayers, function(i,v) {
			
			if (v === true) {
				
				requestedPlayers.push(i);
			}
		});
		
		var doPlayersMatch = (requestedPlayers.length < 1 || requestedPlayers.indexOf(matchedPlayer) !== -1) ? true : false;
		
		var inRange = (currentMinute >= $scope.filterTime.start && currentMinute <= $scope.filterTime.end) ? true : false;
		
		if (requestedTeam != 0) {
			
			requestedTeam = parseInt(requestedTeam.split('t')[1]);
		}
		
		if (data["@attributes"].team_id == requestedTeam && doPlayersMatch && inRange) return true;
			
	    else if (requestedTeam == 0 && doPlayersMatch && inRange) return true;
			
	    else return false;
	};
	
	//Populate game metadata
	$http.get('../get_data.php?game_id=' + $scope.gameId + '&feed_type=f7').success(function(data) {
		
		//Populate global var MatchData w/ match data from service
		$.extend(MatchData, data);
		
		//Assign a home team
		homeTeam = MatchData.SoccerDocument.Team[0]["@attributes"].uID.split('t')[1];
		
		//populate golbal var teams with array of team ids and team names
		$.each(MatchData.SoccerDocument.Team, function(i,v) {
			
			var teamID = this["@attributes"].uID;
	
			var teamName = this.Name;
			
			var t = []
	
			t.push(teamID, teamName);
			
			$scope.filterTeams.push(t);
		});
		
		//populate golbal var player with array of player ids and player names
		$.each(MatchData.SoccerDocument.Team, function(i,e) {
			
			for (var x = 0; x < e.Player.length; x++) {
				
				var pl = e.Player[x];
				
				var playerData = [];
				
				playerData.push(pl["@attributes"].uID);
				
				playerData.push(pl.PersonName.First);
				
				playerData.push(pl.PersonName.Last);
				
				playerData.push(pl["@attributes"].Position);
				
				players.push(playerData);
			}
		});
		
		//Populate Event data
		$http.get('../get_data.php?game_id=' + $scope.gameId + '&feed_type=f24').success(function(data) {
			
			//Events
			var eventsAttr = [];
	
			//Event Qualifiers
			var eventsQ = [];
			
			var richEvents = [];
			
			$.each(data.Game.Event, function(i,e) {
				
				richEvents.push(e);
			});
			
			$scope.players = MatchData.SoccerDocument.Team;
			
	    	$scope.events = richEvents;
			
			$scope.isHome = function() {
				
				return 'team-' + this.event["@attributes"].team_id;
			}
		
			$scope.style = function() {
				
				var style = "";
				
				var toCoords = getCoords(this.event);
				
				var atts = this.event["@attributes"]
				
				var fromCoords = {
					left : atts.x,
					top : atts.y
				};
				
				var w = pythagorize(toCoords, fromCoords);
				
				var ang = calculateAngle(toCoords, fromCoords);
				
				var awayColorOffset = (atts.team_id === homeTeam) ? 40 : 190;
				
				ang = Math.round(ang);
				
				//var rgbVar = pickColor(atts.min, atts.sec);d
				
				var isSuccessOffset = (atts.outcome > 0) ? 65 : 30;
				
				return {
					'width' : w + '%',
					'-webkit-transform' : 'rotate(' + ang + 'deg)',
					'left' : fromCoords.left + '%',
					'top' : fromCoords.top + '%',
					'background-color' : 'hsla('  + awayColorOffset + ', 80%,'  + isSuccessOffset + '%, 1)',
					'border-color' : 'hsla('  + awayColorOffset + ', 80%,'  + isSuccessOffset + '%, 1)'
				};
			};
			
			
			$scope.showMoreInfo = function() {
				
				var ngThis = this.event["@attributes"],
					moContent = '',
					player = getPlayerNameFromId(players, ngThis.player_id),
					outcomeInt = parseInt(ngThis.outcome),
					outcome = (outcomeInt > 0) ? 'completed' : 'failed'
				
				moContent += '<strong class="time">' + ngThis.min + '&rsquo;' + ngThis.sec + '&rdquo;' + '</strong><br/>';
				moContent += player[1] + " " + player[2] + '<br/>';
				moContent += outcome + " " + eventAppendix[ngThis.type_id - 1].toLowerCase();
				
				$(event.target.parentNode).children().removeClass('selected');
				
				$(event.target).addClass('selected');
				
				$passInfo.fadeIn().find('.content').html(moContent);
				
				// var mo = new InfoModal(event.target,  {
				// 				
				// 					content : moContent,
				// 					left : ngThis.x + '%',
				// 					top : ngThis.y - 2 + '%'
				// 				});
				
				//mo.init();
				
				//var targ = getCoords(this.event);
			}
		});
		
	});
	
	//instantiate slider
	$( "#slider-range" ).slider({
		range: true,
		min: 0,
		max: 90,
		values: [ 0, 90 ],
		slide: function( event, ui ) {
			
			var el = $('input[name=start-time]');
			var scope = angular.element(el[0]).scope();
			scope.$apply(function() {
				scope.filterTime.start = ui.values[0];
			});

			var elEnd = $('input[name=end-time]');
			var scopeEnd = angular.element(elEnd[0]).scope();
			scopeEnd.$apply(function() {
				scopeEnd.filterTime.end = ui.values[1];
			});
		}
	});
	
	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	
}
/*
function timeline($scope, $http) {
	
	$scope.filterItem = {store: 0};
	
	$scope.filterPlayers = {};
	
	$scope.filterTeams = [];
	
	$scope.customFilter = function (data) {
		
		var requestedTeam = $scope.filterItem.store;
		
		var matchedPlayer = 'p' + data.player_id;
		
		var requestedPlayers = [];
		
		$.each($scope.filterPlayers, function(i,v) {
			
			if (v === true) {
				
				requestedPlayers.push(i);
			}
		});
		
		var doPlayersMatch = (requestedPlayers.length < 1 || requestedPlayers.indexOf(matchedPlayer) !== -1) ? true : false;
		
		if (requestedTeam != 0) {
			
			requestedTeam = parseInt(requestedTeam.split('t')[1]);
		}
		
		if (data.team_id == requestedTeam && doPlayersMatch) {
			
			return true;
			
	    } else if (requestedTeam == 0 && doPlayersMatch) {
		
			return true;
			
	    } else {
		
			return false;		
		}
	};  
	
	$http.get('../get_data.php?game_id=' + gameID + '&feed_type=f7').success(function(data) {
		
		//Populate global var MatchData w/ match data from service
		$.extend(MatchData, data);
		
		//populate golbal var teams with array of team ids and team names
		$.each(MatchData.SoccerDocument.Team, function(i,v) {
			
			var teamID = this["@attributes"].uID;
	
			var teamName = this.Name;
			
			var t = []
	
			t.push(teamID, teamName);
			
			$scope.filterTeams.push(t);
		});
		
		//populate golbal var player with array of player ids and player names
		$.each(MatchData.SoccerDocument.Team, function(i,e) {
			
			for (var x = 0; x < e.Player.length; x++) {
				
				var pl = e.Player[x];
				
				var playerData = [];
				
				playerData.push(pl["@attributes"].uID);
				
				playerData.push(pl.PersonName.First);
				
				playerData.push(pl.PersonName.Last);
				
				playerData.push(pl["@attributes"].Position);
				
				players.push(playerData);
			}
		});
		
		$http.get('../get_data.php?game_id=' + gameID + '&feed_type=f24').success(function(data) {
	
			//Events
			var eventsAttr = [];
	
			//Event Qualifiers
			var eventsQ = [];
	
			$.each(data.Game.Event, function(i,e) {
				
				eventsAttr.push(e["@attributes"]);
				eventsQ.push(e.Q);
			});
			
	    	$scope.events = eventsAttr;
			
			//console.log($scope.events);
	
			$scope.players = MatchData.SoccerDocument.Team;
		});
	});
}
*/