<?php

include("cache.php");

class XmlToJson {

	public function Parse ($url) {

		$fileContents= file_get_contents($url);

		$fileContents = str_replace(array("\n", "\r", "\t"), '', $fileContents);

		$fileContents = trim(str_replace('"', "'", $fileContents));

		$simpleXml = simplexml_load_string($fileContents);

		$json = json_encode($simpleXml);

		return $json;

	}
}

$game = $_GET['game_id'];

$feedType = $_GET['feed_type'];

print XmlToJson::Parse("http://playground.opta.net/?game_id=".$game."&feed_type=".$feedType);

include("cache_footer.php");