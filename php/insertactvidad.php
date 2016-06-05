<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
header('Content-Type: application/json');
require 'modelo.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $precio_adulto = $_POST['precio_adulto'];
    $precio_nino = $_POST['precio_nino'];
    $descripcion = $_POST['descripcion'];
    $ciudad = $_POST['ciudad'];
    $retorno = Modelo::insert_actividad($nombre,$precio_adulto,$precio_nino,$descripcion,$ciudad);
    if ($retorno) {
        $datos["result"] = true;
        $datos["data"] = $retorno;
        echo json_encode($datos);
    } else {
        // Código de falla
        print json_encode(
            array(
                'estado' => '2',
                'mensaje' => 'Creación fallida')
        );
    }
}