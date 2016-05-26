<?php
	error_reporting(E_ALL);
	ini_set('display_errors','1');
	header('Content-Type: application/json');
	require 'modelo.php';
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$destino = $_POST['destino'];
		$habitaciones_requeridas = $_POST['habitaciones_requeridas'];
		$fecha_ll = $_POST['fecha_ll'];
		$fecha_s = $_POST['fecha_s'];
		$retorno = Modelo::getHotelesDestinoHabitaciones($fecha_ll,$fecha_s,$destino,$habitaciones_requeridas);
		if ($retorno) {
			$datos["result"] = "true";
			$datos["data"] = $retorno;
			echo json_encode($datos);
		} else {
			echo json_encode(
				array(
					'result' => 'false',
					'mensaje' => 'No se obtuvo el registro de hoteles para esos parametros'
				)
			);
		}
	}
?>