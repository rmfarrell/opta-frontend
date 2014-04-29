'use strict';

app.controller("menu", function ($scope, seasonService) {
	
	$scope.games = [];
	
	//Make games data availble for $scope
	seasonService.forEach(function(g) {
		
		var gameObj = {};
		
		gameObj.id = g[0];
		
		gameObj.away = g[1];
		
		gameObj.home = g[2];
		
		//Get a date object (helpers)
		gameObj.date = formateDate(g[3]);
		
		return $scope.games.push(gameObj)
	});
	
});

var homeTeam = 0;

app.controller("pullData", function ($scope, $route, gameService) {

	$scope.gameId = $route.current.params.gameId;

	$scope.getGame = gameService.getGameInfo($scope.gameId);
	
	$scope.getEvents = gameService.getEventInfo($scope.gameId);
	
	$scope.players = [];
	
	$scope.venue = "";
	
	$scope.events;
	
	$scope.attendance = 0;
	
	$scope.matchId = 0;
	
	$scope.teams;
	
	var _matchData = {};
	
	$scope.getGame.success(function(data) {
		
		//Populate global var MatchData w/ match data from service
		$.extend(_matchData, data);
		
		$scope.teams = data.SoccerDocument.Team;
		
		$scope.matchId = data.SoccerDocument["@attributes"].uID.split("f")[1];
		
		$scope.venue = data.SoccerDocument.Venue.Name.split("-").join(" ");
		
		$scope.attendance = numberWithCommas(data.SoccerDocument.MatchData.MatchInfo.Attendance);
		
		//Assign a home team
		homeTeam = 	$scope.teams[0]["@attributes"].uID.split('t')[1];

		$.each($scope.teams, function(i,team) {
			
			//Instantiate goals variable so we know the score
			team.goals = 0;
			
			//Get reference to all the players in team and populate $scope.players
			for (var x = 0; x < team.Player.length; x++) {

				$scope.players.push(team.Player[x]);
			}
		});//End of Team loop
	});//End of getGame
	
	//populate $scope.events
	$scope.getEvents.success(function(data) {

		var _richEvents = [];

		$.each(data.Game.Event, function(i,e) {
			
			//get goals and increment them to $scope.teams.goals
			if (e["@attributes"].type_id == 16) {
				
				$scope.teams.forEach(function(team, index) {
					
					if ("t" + e["@attributes"].team_id === team["@attributes"].uID) team.goals += 1;
				});
			}

			_richEvents.push(e);
		});

    $scope.events = _richEvents;
	});
});

app.controller("stats", function ($scope, $http, $route, $filter, $controller) {
	
	//Inherit gets from pullData controller
	$controller("pullData", {$scope: $scope});
	
	//Initialize the stats object
	$scope.getGame.success(function(data) {
			
		$scope.players.forEach(function(p) {
			
			$scope.players.push(p)

			return attachStats.init(p);
		});
	});//End of Get Game
	
	$scope.getEvents.success(function(data) {
		
		$scope.flatEvents = flattenEvents($scope.events);
		
		$scope.flatEvents.forEach(function(e,i) {
			
			//addPassing
			switch (parseInt(e.type_id)) {
					
				case 1: //pass
					attachStats.passes($scope.players, e.player_id, e.outcome);
					break;
					
				case 16: //goals
					attachStats.shots($scope.players, e.player_id, true)
					break;
					
				case 13:
				case 14: //misses
					attachStats.shots($scope.players, e.player_id, false)
					break;
					
				case 8: //interceptions
				case 7: //tackles
				case 12: //clearance
					attachStats.defense($scope.players, e.player_id, e.type_id)
					break;
					
				default:
					//do nothing
					break;
				}
		});
		
		$scope.info = function(p, ev) {
			
			var closeFunction = $(ev.target).data('player-stats'), //attached to element on open
				fullStats = null; //
			
			if (closeFunction) closeFunction();
			
				else {
			    
			    fullStats = new	FullStats(p, ev);
			    
			    return fullStats.open();
				}
		}
		
		//Do math on stats
		$scope.players.forEach(function(player) {
			
			//Calculate passing percentage
			player.stats.passes.pct = attachStats.passPercent(player.stats.passes);
		});
	});//End of Get Events
});//End of Stats controller

app.controller("passmap", function ($scope, $filter, $controller) {
	
	var requestedTeam = [];
	
	//Inherit gets from pullData controller
	$controller("pullData", {$scope: $scope});

	$scope.filterItem = {store: 0};

	$scope.filterPlayers = {};

	$scope.filterTeams = function() {
		
		if (event.target.checked) {
			
			//Add requested team to the array
			requestedTeam.push(event.target.value)
			
		} else {
			
			//Remove team from array of requested teams
			requestedTeam.forEach(function(team, index, arr) {

				if (team === event.target.value) return arr.splice(index,1) //console.log(index)
			});
		}
	};

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
			
			requestedTeam.push(t[0]);
		});
	});

	$scope.mapFilter = function (data) {
		
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
		
		function isTeam(t) {
			
			//Both teams selected
			if (requestedTeam.length === 2) return true;
				
				//Return false if array is empty
				else if (requestedTeam.length === 0) return false;
				
				//Filter based on selectd team if only one
				else return requestedTeam[0] === ("t" + t);
		}
	
		if (isTeam(data["@attributes"].team_id) && doPlayersMatch && inRange) return true;
		
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
				'-moz-transform' : 'rotate(' + ang + 'deg)',
				'-ms-transform' : 'rotate(' + ang + 'deg)',
				'left' : fromCoords.left + '%',
				'top' : fromCoords.top + '%',
				'background-color' : 'hsla('  + awayColorOffset + ', 80%,'  + isSuccessOffset + '%, 1)',
				'border-color' : 'hsla('  + awayColorOffset + ', 80%,'  + isSuccessOffset + '%, 1)'
			};
		};

		$scope.showMoreInfo = function() {
			
			var ngThis = this.event["@attributes"],
				moContent = '',
				player = getPlayerFromId(ngThis.player_id, $scope.players),
				outcomeInt = parseInt(ngThis.outcome),
				outcome = (isSuccessfullAction(ngThis)) ? 'completed' : 'failed';
				
			moContent += '<strong class="time">' + ngThis.min + '&rsquo;' + ngThis.sec + '&rdquo;' + '</strong><br/>';
			moContent += player.PersonName.First + " " + player.PersonName.Last + '<br/>';
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
		create: function(event) {
		
			$(event.target).find('a').eq(0).html("0'");
		
			$(event.target).find('a').eq(1).html("90'");
		},
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
			
			//update values
			var hh = $(event.target).find('a');
			
			hh.eq(0).html(ui.values[0] + "'");
			
			hh.eq(1).html(ui.values[1] + "'");
		}
	}).removeClass('ui-corner-all');

	$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
		" - $" + $( "#slider-range" ).slider( "values", 1 ) );
});