function parallax(selector, speed, max) {
	
	var scrolled = $(window).scrollTop();
	
	console.log(scrolled)
	
	var newPos = Math.min(scrolled * speed, max)
	
	$(selector).css('top', -newPos + 'px');
}

function numberWithCommas(x) {
	var x = x || 'unknown';
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function FullStats(playerObject, ev) {
	
	var $targ = $(ev.target);
	
	var $tableContainer = $('<tr><td colspan="5" class="full-stats-container"></td></tr>');
	
	var $table = $('<table class="full-stats"></table>');
	
	var $row = $targ.parent().parent();
	
	var tableHTML = "";
	
	var statsObj = {};
	
	var that = this;
	
	return {
		
		open: function() {
			
			var z = 0;

			$targ.addClass('open');

			$.each(playerObject.stats, function(_key, _value) {
				
				var zebra = (z % 2) ? "zebra-1" : "zebra-2"
				
				z++;
				
				var rs = Object.keys(_value).length;
				
				var border = "border-top";
								
				tableHTML += '<tr class="' + zebra + " " + border + '"><td rowspan="' + (rs + 1) + '" class="header"><h5>' + _key + '</h5></td></tr>';

				$.each(_value, function(__key, __value) {

					tableHTML += ('<tr class="' + zebra + " " + border + '"><td class="full-stats-key">' + __key + '</td><td class="full-stats-value">' + __value + '</td></tr>');
				
					border = " "
				});
			});

			$table.append(tableHTML)

			$tableContainer.find('td').append($table);

			$targ.parent().parent().after($tableContainer);

			$tableContainer.hide().slideDown();
			
			return $targ.data('player-stats', this.close);
		},
		
		close: function() {
			
			$tableContainer.hide();

			$targ.removeClass('open');
			
			$targ.removeData('player-stats');
			
			return false;
		}
	}
};

function formateDate(dateString) {
	
	var d = dateString || ""; //Comes from opta in YEAR-MONTH-DAY format
	var formattedDate = null; //return value
	
	d = dateString.split("-");
	
	formattedDate = new Date(d[0],d[1],d[2]);
	
	return formattedDate.toDateString();
}

function InfoModal ( $target, options ) { 
	
	var settings = {
		left : '50%',
		top: '50%',
		content : null,
		target : $target
	};
	
	$.extend(settings,options);

	return {
		
		$wrapper : $('<div class="infoModalWrapper"></div>'),
		
		init : function () {
			
			alert('test')
			
			this.destroy();
			
			$(settings.target).after(this.$wrapper);
			
			this.$wrapper
				.append(settings.content)
				.css('left', settings.left)
				.css('top', settings.top);
		},
		
		destroy : function() {
			
			$('.infoModalWrapper').remove();
		}
	}
}

function getCoords (obj) {
	
	var coords = {};
	
	if (!obj.Q.length) {
		return;
	}
	
	$.each(obj.Q, function(i,e) {
		
		var qID = parseInt(e["@attributes"].qualifier_id);
		
		if (qID && qID === 140) {
			
			$.extend(coords, {'left': e["@attributes"].value});
			
		} else if (qID === 141) {
			
			$.extend(coords, {'top': e["@attributes"].value});
			
		}
	});
	
	return coords;
}

function pythagorize(c1, c2) {
	
	var h = Math.abs((c1.left) - (c2.left));
	
	var v = Math.abs((c1.top / 2) - (c2.top / 2));
	
	return Math.sqrt((h*h) + (v*v)) - 1;
}

function calculateAngle(c1, c2) {
	
	var deltaX = (c1.left * 90) - (c2.left * 90);
	
	var deltaY = (c1.top * 45) - (c2.top * 45);
	
	var deg = Math.round(Math.atan2(deltaY,deltaX)*(180/Math.PI));
	
	return deg;
}

function pickColor(min, sec) {
	
	var minutes = parseInt(min);
	
	var seconds = parseInt(sec);
	
	var relativeRGB = Math.min(getRelativeTime(minutes, seconds) / fullTime, 1);
	
	return Math.round(relativeRGB * 50);
}

function getRelativeTime (min,sec) {
	
	return min*60 + sec;
}

function getPlayerNameFromId(playersArr, id) {
	
	var id = 'p' + id,
	p;
	
	playersArr.forEach(function(player,i) {
		
		if (player[0] == id) return p = player;
	});
	
	return p;
}

function getPlayerFromId(playerId, players) {
		
	var _playerId = 'p' + playerId,
		_player;

	players.forEach(function(player, index) {
	
		if (_playerId == player["@attributes"].uID) return _player = players[index];
	});

	return _player;
}

function isSuccessfullAction(e) {
	
	//If Goal
	if (e.type_id == 16) return true;
	
		//if completed pass
		else if (parseInt(e.type_id) == 1 && e.outcome == 1) return true;
}

//flatten $scope.events to get rid of rich data
var flattenEvents = function(eventObj) {
	
	var _o = [];
	
	eventObj.forEach(function(ev) {
		
		_o.push(ev["@attributes"]);
	});
	
	return _o;
}

attachStats = {
	
	init: function(p) {
		
		var stats = {		
			
			passes: {
				successful: 0,
				attempts: 0,
				pct: 0
			},
		
			shots: {
				goals: 0,
				attempts: 0,
			},
			
			defense: {
				tackles: 0,
				interceptions: 0,
				clearances: 0
			}
		}
		
		p.stats = stats;
	},
	
	shots: function(players, playerId, wasGood) {
		
		var _player = getPlayerFromId(playerId, players);
		
		if (wasGood) _player.stats.shots.goals += 1;
		
		return _player.stats.shots.attempts += 1;
	},
	
	defense: function(players, playerId, action) {
		
		var _player = getPlayerFromId(playerId, players);
		
		if (action == 8) return _player.stats.defense.interceptions += 1;
		
			else if (action == 7) return _player.stats.defense.tackles += 1;

			else if (action == 12) return _player.stats.defense.clearances += 1;
	},
	
	passPercent: function(passes) {
		
		var _pct = passes.successful / passes.attempts;
		
		_pct = _pct || "";
		
		if (typeof _pct === 'number') return (_pct * 100).toFixed(1) + "%";
		
			else return "n/a";
	},
	
	passes : function(players, playerId, wasGood) {
		
		var _player = getPlayerFromId(playerId, players);
		
		if (parseInt(wasGood) > 0) _player.stats.passes.successful += 1 
			
		return _player.stats.passes.attempts += 1;
	}
};