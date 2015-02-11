'use strict';

app.factory('gameService', function($http) {
	
	return {
		
		getGameInfo : function(game) {
			
			/*
			var url = '../get_data.php?game_id=' + game + '&feed_type=f7';
			var url = '../legacy-content/correct-pairs/g1/game.json'
			var url = '../legacy-content/correct-pairs/g2/game.json'
			var url = '../legacy-content/correct-pairs/g3/game.json';
			var url = '../legacy-content/correct-pairs/g4/game.json';
			var url = '../legacy-content/correct-pairs/g5/game.json';
			var url = '../legacy-content/correct-pairs/g6/game.json';
			var url = '../legacy-content/correct-pairs/g7/game.json';
			var url = '../legacy-content/correct-pairs/g8/game.json';
			*/
			
			var game = 8;
			
			var url = '../legacy-content/correct-pairs/g' + game + '/game.json';
			
			
			return $http.get(url)
		},
		
		getEventInfo: function(game) {
			/*
			var url = '../get_data.php?game_id=' + game + '&feed_type=f24';
			var url = '../legacy-content/correct-pairs/g1/event.json';
			var url = '../legacy-content/correct-pairs/g2/event.json';
			var url = '../legacy-content/correct-pairs/g3/event.json';
			var url = '../legacy-content/correct-pairs/g4/event.json';
			var url = '../legacy-content/correct-pairs/g5/event.json';
			var url = '../legacy-content/correct-pairs/g6/event.json';
			var url = '../legacy-content/correct-pairs/g7/event.json';
			var url = '../legacy-content/correct-pairs/g8/event.json';
			*/
			
			var game = 8;
			
			var url = '../legacy-content/correct-pairs/g' + game + '/event.json';
			
			return $http.get(url);
		}
	};
});

//Sent from Opta via Email
app.factory('seasonService', function($http) {
	
	return [
		[131897, 'TuS Koblenz','1. FSV Mainz 05','2007-08-12'],
		[131898, 'FC Carl Zeiss Jena','Alemannia Aachen','2007-08-10'],
		[131899, 'Borussia Mönchengladbach', '1. FC Kaiserslautern', '2007-08-13'],
		[131900, 'TSV München 1860', 'FC Augsburg', '2007-08-12'],
		[131901, 'SpVgg Greuther Fürth', 'FC Erzgebirge Aue', '2007-08-12'],
		[131902, 'OFC Kickers 1901', 'SC Paderborn', '2007-08-12'],
		[131903, 'SV Wehen Wiesbaden', '1899 Hoffenheim', '2007-08-12'],
		[131904, '1. FC Köln', 'FC St. Pauli', '2007-08-10'],
		[131905, 'SC Freiburg', 'VfL Osnabrück', '2007-08-10'],
		[131906, '1899 Hoffenheim', 'Borussia Mönchengladbach', '2007-08-19'],
		[131907, 'SC Paderborn', 'SC Freiburg', '2007-08-17'],
		[131908, '1. FSV Mainz 05', 'pVgg Greuther Fürth', '2007-08-19'],
		[131909, '1. FC Kaiserslautern', 'TSV München 1860', '2007-08-19'],
		[131910, 'Alemannia Aachen', '1. FC Köln', '2007-08-20'],
		[131911, 'FC Augsburg', 'TuS Koblenz', '2007-08-17'],
		[131912, 'FC St. Pauli', 'FC Carl Zeiss Jena', '2007-08-19'],
		[131913, 'FC Erzgebirge Aue', 'OFC Kickers 1901', '2007-08-19'],
		[131914, 'VfL Osnabrück', 'SV Wehen Wiesbaden', '2007-08-17'],
		[131915, 'Borussia Mönchengladbach', '1. FSV Mainz 05', '2007-08-24'],
		[131916, 'OFC Kickers 1901', 'Alemannia Aachen', '2007-08-26'],
		[131917, 'SpVgg Greuther Fürth', '1. FC Kaiserslautern', '2007-08-26'],
		[131918, 'SC Freiburg', 'FC Augsburg', '2007-08-27'],
		[131919, 'FC Carl Zeiss Jena', '1. FC Köln', '2007-08-26'],
		[131920, 'SV Wehen Wiesbaden', 'FC Erzgebirge Aue', '2007-08-26'],
		[131921, 'TSV München 1860', '1899 Hoffenheim', '2007-08-26'],
		[131922, 'TuS Koblenz', 'FC St. Pauli', '2007-08-26'],
		[131923, 'SC Paderborn', 'VfL Osnabrück', '2007-08-24'],
		[131924, 'VfL Osnabrück', 'Borussia Mönchengladbach', '2007-09-02'],
		[131925, '1899 Hoffenheim', 'SC Freiburg', '2007-09-03'],
		[131926, 'FC St. Pauli', 'SpVgg Greuther Fürth', '2007-09-02'],
		[131927, '1. FC Köln', 'TSV München 1860', '2007-08-31'],
		[131928, 'FC Erzgebirge Aue', 'SC Paderborn', '2007-09-02'],
		[131929, '1. FC Kaiserslautern', 'TuS Koblenz', '2007-08-31'],
		[131930, '1. FSV Mainz 05', 'FC Carl Zeiss Jena', '2007-09-02'],
		[131931, 'FC Augsburg', 'OFC Kickers 1901', '2007-08-31'],
		[131932, 'Alemannia Aachen', 'SV Wehen Wiesbaden', '2007-09-02'],
		[131933, 'SC Freiburg', '1. FSV Mainz 05', '2007-09-16'],
		[131934, 'TSV München 1860', 'Alemannia Aachen', '2007-09-16'],
		[131935, 'SC Paderborn', '1. FC Kaiserslautern', '2007-09-14'],
		[131936, 'SV Wehen Wiesbaden', 'FC Augsburg', '2007-09-16'],
		[131937, 'SpVgg Greuther Fürth', '1. FC Köln', '2007-09-16'],
		[131938, 'Borussia Mönchengladbach', 'FC Erzgebirge Aue', '2007-09-17'],
		[131939, 'TuS Koblenz', 'FC Carl Zeiss Jena', '2007-09-14'],
		[131940, 'VfL Osnabrück', '1899 Hoffenheim', '2007-09-16'],
		[131941, 'OFC Kickers 1901', 'FC St. Pauli', '2007-09-14'],
		[131942, 'FC Augsburg', 'Borussia Mönchengladbach', '2007-09-21'],
		[131943, '1. FC Kaiserslautern', 'SC Freiburg', '2007-09-23'],
		[131944, 'Alemannia Aachen', 'SpVgg Greuther Fürth', '2007-09-21'],
		[131945, 'FC St. Pauli', 'TSV München 1860', '2007-09-21'],
		[131946, '1899 Hoffenheim', 'SC Paderborn', '2007-09-21'],
		[131947, '1. FC Köln', 'TuS Koblenz', '2007-09-23'],
		[131948, '1. FSV Mainz 05', 'OFC Kickers 1901', '2007-09-23'],
		[131949, 'FC Carl Zeiss Jena', 'SV Wehen Wiesbaden', '2007-09-23'],
		[131950, 'FC Erzgebirge Aue', 'VfL Osnabrück', '2007-09-21'],
		[131951, 'TSV München 1860', '1. FSV Mainz 05', '2007-09-27'],
		[131952, 'SC Paderborn', 'Alemannia Aachen', '2007-09-25'],
		[131953, 'SV Wehen Wiesbaden', '1. FC Kaiserslautern', '2007-09-26'],
		[131954, 'VfL Osnabrück', 'FC Augsburg', '2007-09-25'],
		[131955, 'SC Freiburg', '1. FC Köln', '2007-09-26'],
		[131956, '1899 Hoffenheim', 'FC Erzgebirge Aue', '2007-09-25'],
		[131957, 'SpVgg Greuther Fürth', 'TuS Koblenz', '2007-09-26'],
		[131958, 'OFC Kickers 1901', 'FC Carl Zeiss Jena', '2007-09-26'],
		[131959, 'Borussia Mönchengladbach', 'FC St. Pauli', '2007-09-25'],
		[131960, 'Alemannia Aachen', 'Borussia Mönchengladbach', '2007-09-28'],
		[131961, 'FC Erzgebirge Aue', 'SC Freiburg', '2007-09-30'],
		[131962, 'FC Carl Zeiss Jena', 'SpVgg Greuther Fürth', '2007-09-30'],
		[131963, 'TuS Koblenz', 'TSV München 1860', '2007-09-30'],
		[131964, 'FC Augsburg', 'SC Paderborn', '2007-09-28'],
		[131965, '1. FC Kaiserslautern', 'OFC Kickers 1901', '2007-10-01'],
		[131966, '1. FC Köln', 'SV Wehen Wiesbaden', '2007-09-30'],
		[131967, '1. FSV Mainz 05', '1899 Hoffenheim', '2007-09-30'],
		[131968, 'FC St. Pauli', 'VfL Osnabrück', '2007-09-28'],
		[131969, 'FC Erzgebirge Aue', '1. FSV Mainz 05', '2007-10-07'],
		[131970, 'SC Freiburg', 'Alemannia Aachen', '2007-10-08'],
		[131971, 'SV Wehen Wiesbaden', 'SpVgg Greuther Fürth', '2007-10-05'],
		[131972, 'VfL Osnabrück', '1. FC Kaiserslautern', '2007-10-07'],
		[131974, 'OFC Kickers 1901', '1. FC Köln', '2007-10-05'],
		[131975, 'Borussia Mönchengladbach', 'TuS Koblenz', '2007-10-07'],
		[131976, 'TSV München 1860', 'FC Carl Zeiss Jena', '2007-10-05'],
		[131977, 'SC Paderborn', 'FC St. Pauli', '2007-10-07'],
		[131978, '1. FC Köln', 'Borussia Mönchengladbach', '2007-10-22'],
		[131979, 'FC St. Pauli', 'SC Freiburg', '2007-10-21'],
		[131980, 'SpVgg Greuther Fürth', 'TSV München 1860', '2007-10-21'],
		[131981, 'FC Augsburg', 'FC Erzgebirge Aue', '2007-10-21'],
		[131982, 'FC Carl Zeiss Jena', 'SC Paderborn', '2007-10-21'],
		[131983, 'TuS Koblenz', 'OFC Kickers 1901', '2007-10-19'],
		[131984, '1. FSV Mainz 05', 'SV Wehen Wiesbaden', '2007-10-21'],
		[131985, '1. FC Kaiserslautern', '1899 Hoffenheim', '2007-10-19'],
		[131986, 'Alemannia Aachen', 'VfL Osnabrück', '2007-10-19']
	];
});