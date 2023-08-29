<?php

$calificacion = $_GET['calificacion'];
$id = $_GET['id'];

$consulta = "SELECT stars,calificaciones FROM actividades WHERE id='" . $id . "'";
$statement = $pdo->prepare($consulta);
$statement->execute();
$cal = $statement->fetchAll(PDO::FETCH_ASSOC);

$contador = $cal[0]['calificaciones'];
$estrellitas=$cal[0]['stars'];

$consulta = "UPDATE actividades SET stars='" . 
($calificacion+$estrellitas) . "',calificaciones='" . 
($contador + 1) . "' WHERE id = '" . $id . "';";
$statement = $pdo->prepare($consulta);
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);

$json = json_encode($results);

header('Access-Control-Allow-Origin: *');
echo $json;

?>