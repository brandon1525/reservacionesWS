<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
header('Content-Type: application/json');
require 'modelo.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$retorno = Modelo::crear_pedido();
	if ($retorno) {
		$datos["result"] = true;
		$datos["data"] = $retorno;
		echo json_encode($datos);
	} else {
		// Código de falla
		print json_encode(
			array(
					'result' => false,
					'mensaje' => 'Creación fallida'
			)
		);
	}	
}
?>