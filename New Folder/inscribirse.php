<?php
$id = $_GET['id'];
$globalId = $_GET['globalId'];
$arr = null;

include 'config.php';
for ($i = 1; $i < 6; $i++) {
    $consulta = "SELECT actividad" . $i . " FROM alumnos where id=" . '"' . $globalId . '"';
    $statement = $pdo->prepare($consulta);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($results[0]["actividad" . $i] != "") {
        $arr[$i] = $results;
    }
}
if ($arr == null) {
    $consulta = "UPDATE alumnos SET actividad" . 1 . " = '" . $id . "' WHERE alumnos.id = '" . $globalId . "';";
    $statement = $pdo->prepare($consulta);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
} else {
    if (count($arr) < 5) {
        $pdo = new PDO('mysql:host=localhost;dbname=congreso', 'root', '');
        $consulta = "UPDATE alumnos SET actividad" . (count($arr) + 1) . " = '" . $id . "' WHERE alumnos.id = '" . $globalId . "';";
        $statement = $pdo->prepare($consulta);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    } else {
        $results = "err";
    }
}



$json = json_encode($results);

header('Access-Control-Allow-Origin: *');
echo $json;

?>