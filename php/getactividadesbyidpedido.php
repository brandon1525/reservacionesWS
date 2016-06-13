<?php
	error_reporting(E_ALL);
	ini_set('display_errors','1');
	header('Content-Type: application/json');
	require 'modelo.php';
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$id_pedido = $_POST['id_pedido'];
		$retorno = Modelo::getActividadesbyIdpedido($id_pedido);
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
					'mensaje' => 'No hay pedidos con esos parámetros'
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