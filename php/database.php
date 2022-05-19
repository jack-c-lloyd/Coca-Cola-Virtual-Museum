<?php
	$brand = $_GET["brand"];

	try
	{
		$handle = new PDO("sqlite:./database/database.db", "user", "password", array(
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_EMULATE_PREPARES => false
		));

		$query = 'SELECT * FROM brands WHERE brand = "' . $brand . '"';
		$statement = $handle->query($query);
		$data = $statement->fetch();

		$result = null;
		
		$result['title'] = $data['title'];
		$result['description'] = $data['description'];
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