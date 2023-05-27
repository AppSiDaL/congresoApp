<?php

$id=$_GET['id'];


include 'config.php';
$consulta="SELECT llave FROM actividades where id=".'"'.$id.'"';
$statement = $pdo->prepare($consulta);
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);

$json = json_encode($results);

header('Access-Control-Allow-Origin: *');
echo $json;

?>
