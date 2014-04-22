'use strict';

var eventAppendix = [
	"Pass",
	"Offside Pass",
	"Take On",
	"Free kick",
	"Out", //5
	"Corner",
	"Tackle",
	"Interception",
	"Turnover",
	"Save", //10
	"Claim",
	"Clearance",
	"Miss",
	"Post",
	"Attempt Saved", //15
	"Goal",
	"Card",
	"Player off",
	"Player on",
	"Player retired", //20
	"Player returns",
	"Player becomes goalkeeper",
	"Goalkeeper becomes player",
	"Condition change",
	"Official change", //25
	"Possession",
	"Start delay",
	"End delay",
	"Temporary stop",
	"End", //30
	"Picked an orange",
	"Start",
	"Start/End canceling",
	"Team set up",
	"Player changed position", //35
	"Player changed Jersey number",
	"Collection End",
	"Temp_Goal",
	"Temp_Attempt",
	"Formation change", //40
	"Punch",
	"Good skill",
	"Deleted event",
	"Aerial",
	"Challenge", //45
	"Postponed",
	"Rescinded card",
	"Provisional lineup",
	"Ball recovery",
	"Dispossessed", //50
	"Keeper pick-up",
	"Cross not claimed",
	"Smother",
	"Offside provoked",
	"Error", //55
	"Shot faced",
	"Shield ball oop",
	"Foul throw in",
	"Keeper Sweeper",
	"Event placeholder", //60
	"Chance Missed",
	"Ball touch",
	"Temp_Save",
	"Resume"
];


var passiness = [1];
var shots = [16, 13, 14];
var passOrShot = passiness.concat(shots)

/* Filters */
angular.module('eventTypeFilter', [])
	.filter('byPlayer', function() {
		
		return function(input, expression, comparator) {
			
			return [];
		};
	})
	.filter('eA', function() {

		return function(input) {
			return eventAppendix[input-1];
		};
	})
	.filter('teamText', function() {
		
		return function(input) {
			
			input = 't' + input;
			
			var theTeam = '';
			
			for (var x = 0; x < teams.length; x++) {
			 	
				if (teams[x].indexOf(input) !== -1) {
					
					return teams[x][1];
				}
			}
		};
	})
	.filter('isPassOrShot', function() {
		
		return function(input, expression, comparator) {
			
			if (passOrShot.indexOf(input) === -1) return false;
			
				else return true;
		};
	})
	.filter('isPass', function() {
		
		return function(input, expression, comparator) {
			
			if (passiness.indexOf(input) === -1) return false;

				else return true;
		}
	})
	.filter('playerText', function() {
		
		return function(input, expression, comparator) {
			
			for (var x = 0; x < players.length; x++) {
				
				if (players[x][0].indexOf(input) !== -1) {
					
					var playerInfo = '';
					
					for (var y = 0; y < attr.length; y ++) {
						
						playerInfo += players[x][attr[y]] + ' ';
					
					}
					
					return playerInfo;
				}
			}
		}
	});

//angular.module('matchDataFilter', [])
