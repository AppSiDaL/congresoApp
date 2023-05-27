<?php
$actividades;
for ($j = 1; $j < 6; $j++) {
    $actividades[$j] = $_GET['actividad' . $j];
}

include 'config.php';
$arr=[];
for ($i = 1; $i < 6; $i++) {
    if ($actividades[$i] != "") {
        $consulta = "SELECT id,nombre,ponente,dirigido,tipo FROM actividades where id =" . '"' . $actividades[$i] . '"';
        $statement = $pdo->prepare($consulta);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $arr[$i] = $results;
    }else{
        break;
    }

}

$json = json_encode($arr);

header('Access-Control-Allow-Origin: *');
echo $json;

?>