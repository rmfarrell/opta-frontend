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
