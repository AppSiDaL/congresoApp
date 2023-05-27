<?php

$username=$_GET['usuario'];
$password=$_GET['password'];


include 'config.php';
$consulta="SELECT * FROM alumnos where usuario=".'"'.$username.'" and password ='.'"'.$password.'"';
$statement = $pdo->prepare($consulta);
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);

$json = json_encode($results);

header('Access-Control-Allow-Origin: *');
echo $json;

?>
