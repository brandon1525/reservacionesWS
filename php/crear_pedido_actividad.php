<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
header('Content-Type: application/json');
require 'modelo.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST["pedidos_actividades"])){
		$pedidos_actividades = $_POST['pedidos_actividades'];
		//print_r($pedidos_actividades);
		$actualizados=[];
		foreach ($pedidos_actividades as $pedido) {
			//print_r($pedido);
			$id_persona=Modelo::crear_pedido_actividad_responsable($pedido['persona_responsable']['nombre'],
				$pedido['persona_responsable']['apellidop'],$pedido['persona_responsable']['apellidom'],
				$pedido['persona_responsable']['sexo']);
			$hora = $pedido['hora_ll_actividad'];
			$hora = date( "H:i:s", strtotime( $hora ) );
			foreach ($pedido['actividades_seleccionadas'] as $actividad) {
				$registro = Modelo::crear_pedido_actividad_actividad_persona($id_persona,$actividad,$pedido['no_ninos'],$pedido['no_adultos'],$pedido['fecha_ll_actividad'],$hora);
				print_r($registro);
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
					'estado' => '2',
					'mensaje' => 'Creación fallida'
				)
			);
		}
	}else{
		echo "No hay nada que hacer en reservar actividad";
	}
}
?>