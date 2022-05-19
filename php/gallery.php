<?php
	$brand = $_GET["brand"];
	$model = $_GET["model"];

	try
	{
		$handle = new PDO("sqlite:./database/database.db", "user", "password", array(
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_EMULATE_PREPARES => false
		));

		$query = 'SELECT * FROM gallery WHERE brand = "' . $brand . '" AND model = "' . $model . '"';
		$statement = $handle->query($query);
		$result = null;
		$index = 0;

		while ($data = $statement->fetch()) {

			$result[$index]['brand'] = $data['brand'];
			$result[$index]['model'] = $data['model'];
			$result[$index]['filename'] = $data['filename'];

			$index++; // increment counter
		}
	}
	catch (PDOException $exception)
	{
		print new Exception($exception->getMessage());
	}

	$handle = null;

	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	
	echo json_encode($result);
?>