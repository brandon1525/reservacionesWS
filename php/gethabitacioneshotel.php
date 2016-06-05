<?php
	error_reporting(E_ALL);
	ini_set('display_errors','1');
	header('Content-Type: application/json');
	require 'modelo.php';
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$id_hotel = $_POST['id_hotel'];
		$fecha_ll = $_POST['fecha_ll'];
		$fecha_s = $_POST['fecha_s'];
		$retorno = Modelo::getHabitacionesHotel($fecha_ll,$fecha_s,$id_hotel);
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
					'mensaje' => 'No hay habitaciones disponibles con esos parámetros'
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