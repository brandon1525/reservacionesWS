<?php
  error_reporting(E_ALL);
    ini_set('display_errors','1');
    header('Content-Type: application/json');
    require 'modelo.php';
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $destino = $_POST['destino'];
      $fecha_s = $_POST['fecha_s'];
      $hora_s = $_POST['hora_s'];
      $asientos = $_POST['asientos'];
      $retorno = Modelo::getAerolineasDestino($destino,$fecha_s,$hora_s,$asientos);
      if ($retorno) {
        $datos["result"] = "true";
        $datos["data"] = $retorno;
        echo json_encode($datos);
      } else {
        echo json_encode(
          array(
            'result' => 'false',
            'mensaje' => 'No se obtuvo el registro de aerolienas'
          )
        );
      }
    }
?>