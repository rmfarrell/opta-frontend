'use strict';

/* Controllers */

var MatchData = {};

var teams = []; //Delete later

var players = [];

var homeTeam = 0;

app.controller("pullData", function ($scope, $route, gameService) {

	$scope.gameId = $route.current.params.gameId;

	$scope.getGame = gameService.getGameInfo($scope.gameId);

	$scope.getEvents = gameService.getEventInfo($scope.gameId);
	
	$scope.players = [],
	
	$scope.events,
	
	$scope.teams,
	
	$scope.filterTeams = [];
	
	var _matchData = {};
	
	$scope.getGame.success(function(data) {
		
		//Populate global var MatchData w/ match data from service
		$.extend(_matchData, data);

		//Assign a home team
		homeTeam = data.SoccerDocument.Team[0]["@attributes"].uID.split('t')[1];

		//Populate $scope.players
		$.each(data.SoccerDocument.Team, function(i,e) {

			for (var x = 0; x < e.Player.length; x++) {

				var pl = e.Player[x];

				var playerData = [];

				playerData.push(pl["@attributes"].uID);

				playerData.push(pl.PersonName.First);

				playerData.push(pl.PersonName.Last);

				playerData.push(pl["@attributes"].Position);

				$scope.players.push(playerData);
			}
		});//End of Team loop
		
		$scope.teams = data.SoccerDocument.Team;
		
	});//End of getGame
	
	//populate $scope.events
	$scope.getEvents.success(function(data) {

		var _richEvents = [];

		$.each(data.Game.Event, function(i,e) {

			_richEvents.push(e);
		});

    $scope.events = _richEvents;
	});
});


app.controller("stats", function ($scope, $http, $route, $filter, $controller) {
	
	//Inherit gets from pullData controller
	$controller("pullData", {$scope: $scope});
	
	$scope.getEvents.success(function() {
		
	});
	
});

app.controller("passmap", function ($scope, $filter, $controller) {
	
	//Inherit gets from pullData controller
	$controller("pullData", {$scope: $scope});

	$scope.filterItem = {store: 0};

	$scope.filterPlayers = {};

	$scope.filterTeams = [];
	
	$scope.players = [];
	
	$scope.filterTeams = [];

	$scope.filterTime = {
	
		start : 0,
		end : 90
	}
	
	//$scope.game = gameService.getGameInfo($scope.gameId);

	var $passInfo = $('#pass-info');

	var $passMap = $('#passMap');

	$passInfo.find('#pass-info-close').click(function(e) {
	
		e.preventDefault();
		$passInfo.fadeOut();
	});
	
	
	$scope.getGame.success(function(data) {

		//populate global var teams with array of team ids and team names
		$.each(data.SoccerDocument.Team, function(i,v) {

			var teamID = this["@attributes"].uID;

			var teamName = this.Name;

			var t = []

			t.push(teamID, teamName);

			$scope.filterTeams.push(t);
		});
	});

	$scope.customFilter = function (data) {
	
		var requestedTeam = $scope.filterItem.store;
	
		var matchedPlayer = 'p' + data["@attributes"].player_id;
	
		var requestedPlayers = [];
	
		var currentMinute = data["@attributes"].min;
	
		//Is the action a pass or a shot?
		if (!$filter('isPassOrShot')(parseInt(data["@attributes"].type_id))) return false;
	
		//Is the player checked?
		$.each($scope.filterPlayers, function(i,v) {
		
			if (v === true) {
			
				requestedPlayers.push(i);
			}
		});
	
		var doPlayersMatch = (requestedPlayers.length < 1 || requestedPlayers.indexOf(matchedPlayer) !== -1) ? true : false;
	
		//Is the action within specified time slice
		var inRange = (currentMinute >= $scope.filterTime.start && currentMinute <= $scope.filterTime.end) ? true : false;
	
		//Is the action part of the correct team?
		if (requestedTeam != 0) {
		
			requestedTeam = parseInt(requestedTeam.split('t')[1]);
		}
	
		if (data["@attributes"].team_id == requestedTeam && doPlayersMatch && inRange) return true;
		
	    else if (requestedTeam == 0 && doPlayersMatch && inRange) return true;
		
	    else return false;
	};
	
	
	
	//Populate Event data
	$scope.getEvents.success(function(data) {

		$scope.addClasses = function() {

			var c = "";

			var t = parseInt(this.event["@attributes"].type_id);

			if (t === 1) c += " pass";

				else if (t === 16) c += " shot goal"

				else if (shots.indexOf(t) !== -1) c += " shot miss";

			return c;
		}

		$scope.style = function(element) {

			var style = "";

			var arrowHead = '<div class="arrowhead"></div>';

			var toCoords = getCoords(this.event);

			var atts = this.event["@attributes"];

			var fromCoords = {
				left : atts.x,
				top : atts.y
			};

			var w = pythagorize(toCoords, fromCoords);

			var ang = calculateAngle(toCoords, fromCoords);

			var awayColorOffset = (atts.team_id === homeTeam) ? 40 : 190;

			ang = Math.round(ang);

			//var rgbVar = pickColor(atts.min, atts.sec);d

			var isSuccessOffset = (isSuccessfullAction(this.event["@attributes"])) ? 65 : 30;

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
				player = getPlayerNameFromId($scope.players, ngThis.player_id),
				outcomeInt = parseInt(ngThis.outcome),
				outcome = (isSuccessfullAction(ngThis)) ? 'completed' : 'failed'

			moContent += '<strong class="time">' + ngThis.min + '&rsquo;' + ngThis.sec + '&rdquo;' + '</strong><br/>';
			moContent += player[1] + " " + player[2] + '<br/>';
			moContent += outcome + " " + eventAppendix[ngThis.type_id - 1].toLowerCase();

			$(event.target.parentNode).children().removeClass('selected');

			$(event.target).addClass('selected');

			$passInfo.fadeIn().find('.content').html(moContent);
		}
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
});

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