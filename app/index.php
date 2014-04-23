<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>**</title>
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  <link rel="stylesheet" href="../stylesheets/screen.css">

  <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
  <script src="lib/plugins.js"></script>
  <script src="lib/angular/angular.js"></script>
  <script src="js/helpers.js"></script>
  <script src="js/app.js"></script>
  <script src="js/controllers.js"></script>
  <script src="js/filters.js"></script>
  <script src="js/services.js"></script>
  <script src="lib/angular/angular-resource.js"></script>
</head>
<body>
	<!-- <nav id="game-navigation">
			<a id="game-nav-toggle"></a>
			<table>
				<tr>
					<td class="date">2007-08-10</td>
					<td class="home">FSV Mainz 05</td>
					<td class="v">v.</td>
					<td class="away">TuS Koblenz</td>
					<td class="map"><a href="#/map/131897">map</a></td>
					<td class="stats"><a href="#/stats/131897">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-10</td>
					<td>Alemannia Aachen</td>
					<td class="v">v.</td>
					<td>FC Carl Zeiss Jena</td>
					<td class="map"><a href="#/map/131898">map</a></td>
					<td class="stats"><a href="#/stats/131898">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-13</td>
					<td>1. FC Kaiserslautern</td>
					<td class="v">v.</td>
					<td>Borussia Mönchengladbach</td>
					<td class="map"><a href="#/map/131899">map</a></td>
					<td class="stats"><a href="#/stats/131899">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-12</td>
					<td>FC Augsburg</td>
					<td class="v">v.</td>
					<td>TSV München 1860</td>
					<td class="map"><a href="#/map/131900">map</a></td>
					<td class="stats"><a href="#/stats/131900">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-12</td>
					<td>FC Erzgebirge Aue</td>
					<td class="v">v.</td>
					<td>SpVgg Greuther Fürth</td>
					<td class="map"><a href="#/map/131901">map</a></td>
					<td class="stats"><a href="#/stats/131901">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-12</td>
					<td>SC Paderborn</td>
					<td class="v">v.</td>
					<td>OFC Kickers 1901</td>
					<td class="map"><a href="#/map/131902">map</a></td>
					<td class="stats"><a href="#/stats/131902">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-12</td>
					<td>1899 Hoffenheim</td>
					<td class="v">v.</td>
					<td>SV Wehen Wiesbaden</td>
					<td class="map"><a href="#/map/131903">map</a></td>
					<td class="stats"><a href="#/stats/131903">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-10</td>
					<td>FC St. Pauli</td>
					<td class="v">v.</td>
					<td>1. FC Köln</td>
					<td class="map"><a href="#/map/131904">map</a></td>
					<td class="stats"><a href="#/stats/131904">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-10</td>
					<td>VfL Osnabrück</td>
					<td class="v">v.</td>
					<td>SC Freiburg</td>
					<td class="map"><a href="#/map/131905">map</a></td>
					<td class="stats"><a href="#/stats/131905">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-19</td>
					<td>Borussia Mönchengladbach</td>
					<td class="v">v.</td>
					<td>1899 Hoffenheim</td>
					<td class="map"><a href="#/map/131906">map</a></td>
					<td class="stats"><a href="#/stats/131906">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-17</td>
					<td>SC Freiburg</td>
					<td class="v">v.</td>
					<td>SC Paderborn</td>
					<td class="map"><a href="#/map/131907">map</a></td>
					<td class="stats"><a href="#/stats/131907">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-19</td>
					<td>SpVgg Greuther Fürth</td>
					<td class="v">v.</td>
					<td>1. FSV Mainz 05</td>
					<td class="map"><a href="#/map/131908">map</a></td>
					<td class="stats"><a href="#/stats/131908">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-19</td>
					<td>TSV München 1860</td>
					<td class="v">v.</td>
					<td>1. FC Kaiserslautern</td>
					<td class="map"><a href="#/map/131909">map</a></td>
					<td class="stats"><a href="#/stats/131909">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-20</td>
					<td>1. FC Köln</td>
					<td class="v">v.</td>
					<td>Alemannia Aachen</td>
					<td class="map"><a href="#/map/131910">map</a></td>
					<td class="stats"><a href="#/stats/131910">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-17</td>
					<td>TuS Koblenz</td>
					<td class="v">v.</td>
					<td>FC Augsburg</td>
					<td class="map"><a href="#/map/131911">map</a></td>
					<td class="stats"><a href="#/stats/131911">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-19</td>
					<td>FC Carl Zeiss Jena</td>
					<td class="v">v.</td>
					<td>FC St. Pauli</td>
					<td class="map"><a href="#/map/131912">map</a></td>
					<td class="stats"><a href="#/stats/131912">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-19</td>
					<td>OFC Kickers 1901</td>
					<td class="v">v.</td>
					<td>FC Erzgebirge Aue</td>
					<td class="map"><a href="#/map/131913">map</a></td>
					<td class="stats"><a href="#/stats/131913">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-17</td>
					<td>SV Wehen Wiesbaden</td>
					<td class="v">v.</td>
					<td>VfL Osnabrück</td>
					<td class="map"><a href="#/map/131914">map</a></td>
					<td class="stats"><a href="#/stats/131914">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-24</td>
					<td>1. FSV Mainz 05</td>
					<td class="v">v.</td>
					<td>Borussia Mönchengladbach</td>
					<td class="map"><a href="#/map/131915">map</a></td>
					<td class="stats"><a href="#/stats/131915">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-26</td>
					<td>Alemannia Aachen</td>
					<td class="v">v.</td>
					<td>OFC Kickers 1901</td>
					<td class="map"><a href="#/map/131916">map</a></td>
					<td class="stats"><a href="#/stats/131916">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-26</td>
					<td>1. FC Kaiserslautern</td>
					<td class="v">v.</td>
					<td>SpVgg Greuther Fürth</td>
					<td class="map"><a href="#/map/131917">map</a></td>
					<td class="stats"><a href="#/stats/131917">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-27</td>
					<td>FC Augsburg</td>
					<td class="v">v.</td>
					<td>SC Freiburg</td>
					<td class="map"><a href="#/map/131918">map</a></td>
					<td class="stats"><a href="#/stats/131918">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-24</td>
					<td>1. FC Köln</td>
					<td class="v">v.</td>
					<td>FC Carl Zeiss Jena</td>
					<td class="map"><a href="#/map/131919">map</a></td>
					<td class="stats"><a href="#/stats/131919">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-26</td>
					<td>FC Erzgebirge Aue</td>
					<td class="v">v.</td>
					<td>SV Wehen Wiesbaden</td>
					<td class="map"><a href="#/map/131920">map</a></td>
					<td class="stats"><a href="#/stats/131920">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-26</td>
					<td>1899 Hoffenheim</td>
					<td class="v">v.</td>
					<td>TSV München 1860</td>
					<td class="map"><a href="#/map/131921">map</a></td>
					<td class="stats"><a href="#/stats/131921">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-26</td>
					<td>FC St. Pauli</td>
					<td class="v">v.</td>
					<td>TuS Koblenz</td>
					<td class="map"><a href="#/map/131922">map</a></td>
					<td class="stats"><a href="#/stats/131922">stats</a></td>
				</tr>
				<tr>
					<td>2007-08-24</td>
					<td>VfL Osnabrück</td>
					<td class="v">v.</td>
					<td>SC Paderborn</td>
					<td class="map"><a href="#/map/131923">map</a></td>
					<td class="stats"><a href="#/stats/131923">stats</a></td>
				</tr>
			</table>
		</nav> -->
	<div ng-view ng-app="opta"></div>
</body>
</html>
