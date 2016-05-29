<?php
	error_reporting(E_ALL);
	ini_set('display_errors','1');
	header('Content-Type: application/json');
	require 'modelo.php';
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$origen = $_POST['origen'];
		$destino = $_POST['destino'];
		$fecha_s = $_POST['fecha_s'];
		$hora_s = $_POST['hora_s'];
		$hora_s = date( "H:i:s", strtotime( $hora_s ) );
		$asientos = $_POST['asientos'];
		$retorno = Modelo::getAerolineasDestino($origen,$destino,$fecha_s,$hora_s,$asientos);
		//echo json_encode($retorno);
		if(array_key_exists('errorInfo',$retorno)){
			echo json_encode(
				array(
					'result' => false,
					'mensaje' => 'Error en la base de datos'
				)
			);
		}else if ($retorno) {
			$datos["result"] = true;
			$datos["data"] = $retorno;
			echo json_encode($datos);
		} else if(empty($retorno)){
			echo json_encode(
				array(
					'result' => true,
					'mensaje' => 'No hay vuelos disponibles con esos parámetros'
				)
			);
		}else{
			echo json_encode(
				array(
					'result' => false,
					'mensaje' => 'Neta no se que paso'
				)
			);
		}
	}
?>