<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
require_once 'db_connect/db_connect_aerolineas.php';

class Modelo{
	function __construct(){

	}
	public static function getAerolineasDestino($destino, $fecha_s, $hora_s, $asientos_requeridos){
		try { 
			$consulta = "SELECT vuelo.id, vuelo.origen, vuelo.destino, vuelo.fecha_s, vuelo.hora_s, vuelo.fecha_ll, vuelo.hora_ll, vuelo.precio, vuelo.asientos_totales, vuelo.asientos_disponibles, aerolinea.nombre AS nombre_aerolinea FROM vuelo, aerolinea WHERE vuelo.id_aerolinea = aerolinea.id and destino = ? AND fecha_s >= ? AND hora_s >= ? AND asientos_disponibles >= ? ORDER BY fecha_s, hora_s ASC";
			$comando = Database::getInstance()->getDb()->prepare($consulta);
			//$comando->execute(array($ruta));
			$comando->execute(array($destino,$fecha_s,$hora_s,$asientos_requeridos));
			$rows = $comando->fetchAll(PDO::FETCH_ASSOC);
			if($rows){
				return $rows;
			}else{
			//echo "Esa persona no existe".mysql_error();
				return false;
			}
		} catch (PDOException $e) {
			return false;
		}
	}
	public static function getVueloAsientos($id_vuelo){
		try {
			$consulta = "SELECT id,asiento,id_vuelo FROM  pasajero WHERE id_vuelo = ? ORDER BY asiento ASC";
			$comando = Database::getInstance()->getDb()->prepare($consulta);
			$comando->execute(array($id_vuelo));
			$rows = $comando->fetchAll(PDO::FETCH_ASSOC);
			if($rows){
				return $rows;
			}else{
			//echo "Esa persona no existe".mysql_error();
				return false;
			}
		} catch (PDOException $e) {
			return $e;
		}
	}
	public static function getHotelesDestinoHabitaciones($fecha_ll,$fecha_s,$destino,$habitaciones_requeridas){
		try {
			$consulta = "SELECT *,t2.habitaciones_disponibles from travel_hoteles.hotel,(SELECT COUNT( id_hotel ) AS habitaciones_disponibles, habitacion.id_hotel FROM travel_hoteles.habitacion WHERE habitacion.id NOT IN (SELECT id_habitacion FROM travel_hoteles.habitacion_reservacion, (SELECT * FROM travel_hoteles.reservacion WHERE fecha_ll BETWEEN :fecha_ll AND :fecha_s OR fecha_s BETWEEN :fecha_ll AND :fecha_s) AS T1 WHERE habitacion_reservacion.id_reservacion=T1.id) group by id_hotel) AS t2 WHERE hotel.id=t2.id_hotel and hotel.estado=:destino and habitaciones_disponibles>=:habitaciones_requeridas";
			$comando = Database::getInstance()->getDb()->prepare($consulta);
			$comando->execute(array(':fecha_ll'=>$fecha_ll,':fecha_s'=>$fecha_s,':destino'=>$destino,':habitaciones_requeridas'=>$habitaciones_requeridas));
			$rows = $comando->fetchAll(PDO::FETCH_ASSOC);
			if($rows){
				return $rows;
			}else{
			//echo "Esa persona no existe".mysql_error();
				return false;
			}
		} catch (PDOException $e) {
			return $e;
		}
	}
}
?>