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
			//print_r($pedido);
			$id_reservacion=Modelo::crear_pedido_hotel_reservacion($pedido['fecha_ll'],$pedido['fecha_s']);
			$id_responsable=Modelo::crear_pedido_hotel_responsable($pedido['persona_responsable']['nombre'],
				$pedido['persona_responsable']['apellidop'],$pedido['persona_responsable']['apellidom'],
				$pedido['persona_responsable']['sexo']);
			$habitaciones_disponibles=Modelo::getHabitacionesHotel($pedido['fecha_ll'],$pedido['fecha_s'],$pedido['id_hotel']);
			for ($i=0; $i < $pedido['numero_habitaciones']; $i++) {
				/*echo "le corresponde la habitacion: ".$habitaciones_disponibles[$i]['numero_fisico_habitacion']." con el id ".
				$habitaciones_disponibles[$i]['id']."\n";*/
				$registro = Modelo::crear_pedido_hotel_habitacion_reservacion($habitaciones_disponibles[$i]['id'],$pedido['id_hotel'],$id_reservacion,$id_responsable);
				if($registro){
					array_push($actualizados,$registro);
				}else {
					unset($actualizados);
					$actualizados = array();
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
					'result' => false,
					'mensaje' => 'Creación fallida'
				)
			);
		}
	}else{
		echo "No hay nada que hacer en reservar hotel";
	}
}
?>