<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
header('Content-Type: application/json');
require 'modelo.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST["pedido_hotel"])){
		$pedido_hotel = $_POST['pedido_hotel'];
		//print_r($pedido_vuelo);
		$actualizados=[];
		foreach ($pedido_hotel as $pedido) {
			print_r($pedido);
			$id_reservacion=Modelo::crear_pedido_hotel_reservacion($pedido['fecha_ll'],$pedido['fecha_s']);
			$id_responsable=Modelo::
		}
		//$retorno = Modelo::crear_pedido_vuelo();
		if (count($actualizados)>0) {
			$datos["result"] = true;
			$datos["data"] = $actualizados;
			echo json_encode($datos);
		} else {
		// Código de falla
			print json_encode(
				array(
					'estado' => '2',
					'mensaje' => 'Creación fallida'
				)
			);
		}
	}else{
		echo "No hay nada que hacer en reservar hotel";
	}
}
?>