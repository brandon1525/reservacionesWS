<?php
  error_reporting(E_ALL);
    ini_set('display_errors','1');
    header('Content-Type: application/json');
    require 'modelo.php';
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
      $id_vuelo = $_POST['id_vuelo'];
      $retorno = Modelo::getVueloAsientos($id_vuelo);
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