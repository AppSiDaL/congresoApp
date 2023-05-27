<?php

$numeroControl = $_GET['numeroControl'];
$nombre = $_GET['nombre'];
$apellidoPaterno = $_GET['apellidoPaterno'];
$apellidoMaterno = $_GET['apellidoMaterno'];
$carrera = $_GET['carrera'];
$grupo = $_GET['grupo'];
$usuario = $_GET['usuario'];
$contraseña = $_GET['contraseña'];


include ('config.php');
$consulta = "SELECT id FROM alumnos WHERE id='" . $numeroControl . "'";
$statement = $pdo->prepare($consulta);
$statement->execute();
$validar = $statement->fetchAll(PDO::FETCH_ASSOC);

if ($validar == null) {
    $consulta = "INSERT INTO alumnos VALUES ('" . $numeroControl . "',
    '" . $nombre . "','" . $apellidoPaterno . "','" . $apellidoMaterno . "','" . $carrera . "',
    '" . $grupo . "','" . $usuario . "','" . $contraseña . "','','','','','');";
    $statement = $pdo->prepare($consulta);
    $statement->execute();
    $validar = $statement->fetchAll(PDO::FETCH_ASSOC);
}


$json = json_encode($validar);

header('Access-Control-Allow-Origin: *');
echo $json;

?>