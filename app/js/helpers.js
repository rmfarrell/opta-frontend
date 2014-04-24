function numberWithCommas(x) {
	var x = x || 'unknown';
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
			
			passes : {
				successful: 0,
				failed: 0,
				pct: 0
			},
		
			shots : {
				successful: 0,
				failed: 0,
				pct: 0
			}
		}
		
		p.stats = stats;
	},
	
	passPercent: function(passes) {
		
		var _pct = passes.successful / (passes.failed + passes.successful);
		
		_pct = _pct || "";
		
		if (typeof _pct === 'number') return (_pct * 100).toFixed(1) + "%";
		
			else return "n/a";
		
		// _pct = _pct || ;
		// 	
		// 	 _pct += "%";
		// 	
		// 	return _pct;
	},
	
	passes : function(players, playerId, wasGood) {
		
		var _player = getPlayerFromId(playerId, players);
		
		if (parseInt(wasGood) > 0) return _player.stats.passes.successful += 1 
			
			else return _player.stats.passes.failed += 1;
	}
};