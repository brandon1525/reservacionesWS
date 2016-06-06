<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
header('Content-Type: application/json');
require 'modelo.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST["pedido_vuelo"])){
		$pedido_vuelo = $_POST['pedido_vuelo'];
		//print_r($pedido_vuelo);
		$actualizados=[];
		foreach ($pedido_vuelo as $pedido) {
			foreach ($pedido as $pasajero) {
				//print_r($pasajero);
				$retorno = Modelo::crear_pedido_vuelo($pasajero['nombre'],$pasajero['apellidop'],$pasajero['apellidom'],$pasajero['sexo'],$pasajero['asiento'],$pasajero['id_vuelo']);
				if($retorno){
					array_push($actualizados,$retorno);
				}else {
					$actualizados=0;
				}
			}
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
	}else {
		echo "No hay nada que agregar en reservar vuelo";
	}
}
?>