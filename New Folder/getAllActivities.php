<?php
$actividades;


include 'config.php';
$consulta = "SELECT (count(*))cuenta FROM actividades";
$statement = $pdo->prepare($consulta);
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);
$arr;
$limit= ($results[0]['cuenta']);
for ($i = 0; $i < $limit; $i++) {
    $consulta = "select id,nombre,ponente,dirigido,tipo from actividades limit 1 OFFSET ".$i.";";
    $statement = $pdo->prepare($consulta);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $arr[$i+1] = $results;
}
$json = json_encode($arr);

header('Access-Control-Allow-Origin: *');
echo $json;

?>