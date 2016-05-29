<?php
	error_reporting(E_ALL);
	ini_set('display_errors','1');
	header('Content-Type: application/json');
	require 'modelo.php';
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$id_vuelo = $_POST['id_vuelo'];
		$retorno = Modelo::getVueloAsientos($id_vuelo);
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
					'mensaje' => 'Todos los asientos estan disponibles'
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