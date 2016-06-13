<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
require_once 'db_connect/db_connect_aerolineas.php';

class Modelo{
	function __construct(){

	}
	public static function getAerolineasDestino($origen, $destino, $fecha_s, $hora_s, $asientos_requeridos){
		try { 
			$consulta = "SELECT t2.*,aerolinea.nombre as nombre_aerolinea FROM aerolinea,(SELECT vuelo.*, IFNULL(t1.asientos_disponibles,'72') as asientos_disponibles FROM vuelo LEFT JOIN (SELECT id_vuelo, (72-COUNT( id_vuelo )) AS asientos_disponibles FROM pasajero GROUP BY id_vuelo) as t1 ON id = t1.id_vuelo WHERE vuelo.destino = :destino and vuelo.origen = :origen AND vuelo.fecha_s > :fecha_s OR (vuelo.fecha_s= :fecha_s AND vuelo.hora_s >= :hora_s ) and t1.asientos_disponibles>=:asientos_requeridos ORDER BY vuelo.fecha_s, vuelo.hora_s ASC) as t2 where t2.id_aerolinea=aerolinea.id";
			$comando = Database::getInstance()->getDb()->prepare($consulta);
			$comando->execute(array(':origen'=>$origen,':destino'=>$destino,':fecha_s'=>$fecha_s,':hora_s'=>$hora_s,':asientos_requeridos'=>$asientos_requeridos));
			$rows = $comando->fetchAll(PDO::FETCH_ASSOC);
			return $rows;
		} catch (PDOException $e) {
			return $e;
		}
	}
	public static function getVueloAsientos($id_vuelo){
		try {
			$consulta = "SELECT id,asiento,id_vuelo FROM  pasajero WHERE id_vuelo = ? ORDER BY asiento ASC";
			$comando = Database::getInstance()->getDb()->prepare($consulta);
			$comando->execute(array($id_vuelo));
			$rows = $comando->fetchAll(PDO::FETCH_ASSOC);
			return $rows;
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
			return $rows;
		} catch (PDOException $e) {
			return $e;
		}
	}
	public static function getActividadesDestino($destino){
		try {
			$consulta = "SELECT * FROM  travel_actividades.actividad WHERE ciudad =  ?";
			$comando = Database::getInstance()->getDb()->prepare($consulta);
			$comando->execute(array($destino));
			$rows = $comando->fetchAll(PDO::FETCH_ASSOC);
			return $rows;
		
		} catch (PDOException $e) {
			return $e;
		}
	}
	public static function getHabitacionesHotel($fecha_ll,$fecha_s,$id_hotel){
		try {
			$consulta = "SELECT * FROM travel_hoteles.habitacion WHERE habitacion.id NOT IN (SELECT id_habitacion FROM travel_hoteles.habitacion_reservacion, (SELECT * FROM travel_hoteles.reservacion WHERE fecha_ll BETWEEN :fecha_ll AND :fecha_s OR fecha_s BETWEEN :fecha_ll AND :fecha_s) AS T1 WHERE habitacion_reservacion.id_reservacion=T1.id) and id_hotel=:id_hotel";
			$comando = Database::getInstance()->getDb()->prepare($consulta);
			$comando->execute(array(':fecha_ll'=>$fecha_ll,':fecha_s'=>$fecha_s,':id_hotel'=>$id_hotel));
			$rows = $comando->fetchAll(PDO::FETCH_ASSOC);
			return $rows;
		
		} catch (PDOException $e) {
			return $e;
		}
	}
	public static function insert_actividad($nombre,$precio_adulto,$precio_nino,$descripcion,$ciudad)
	{
	// Sentencia INSERT
		$comando = "INSERT INTO travel_actividades.actividad ( " .
			"nombre," .
			" precio_adulto," .
			" precio_nino," .
			" descripcion," .
			" ciudad)" .
			" VALUES( ?,?,?,?,?)";
	// Preparar la sentencia
		$sentencia = Database::getInstance()->getDb()->prepare($comando);
		$sentencia->execute(
			array(
				$nombre,
				$precio_adulto,
				$precio_nino,
				$descripcion,
				$ciudad
				)
			);
		$lastId = Database::getInstance()->getDb()->lastInsertId();
		return $lastId;
	}

	public static function crear_pedido()
	{
	// Sentencia INSERT
		$comando = "INSERT INTO `travel_pedidos`.`pedido` (`id`, `date_pedido`) VALUES (NULL, CURRENT_TIMESTAMP)";
	// Preparar la sentencia
		$sentencia = Database::getInstance()->getDb()->prepare($comando);
		$sentencia->execute();
		$lastId = Database::getInstance()->getDb()->lastInsertId();
		return $lastId;
	}

	public static function crear_pedido_vuelo($nombre,$apellidop,$apellidom,$sexo,$asiento,$id_vuelo,$id_pedido)
	{
	// Sentencia INSERT
		$comando = "INSERT INTO travel_aerolineas.pasajero ( " .
			"nombre," .
			" apellidop," .
			" apellidom," .
			" sexo," .
			" asiento,".
			" id_vuelo,".
			" id_pedido)" .
			" VALUES(?,?,?,?,?,?,?)";
	// Preparar la sentencia
		$sentencia = Database::getInstance()->getDb()->prepare($comando);
		$sentencia->execute(array($nombre,$apellidop,$apellidom,$sexo,$asiento,$id_vuelo,$id_pedido));
		$lastId = Database::getInstance()->getDb()->lastInsertId();
		return $lastId;
	}
	public static function crear_pedido_hotel_reservacion($fecha_ll,$fecha_s)
	{
	// Sentencia INSERT
		$comando = "INSERT INTO travel_hoteles.reservacion ( " .
			"fecha_ll," .
			" fecha_s)" .
			" VALUES(?,?)";
	// Preparar la sentencia
		$sentencia = Database::getInstance()->getDb()->prepare($comando);
		$sentencia->execute(array($fecha_ll,$fecha_s));
		$lastId = Database::getInstance()->getDb()->lastInsertId();
		return $lastId;
	}
	public static function crear_pedido_hotel_responsable($nombre,$apellidop,$apellidom,$sexo)
	{
	// Sentencia INSERT
		$comando = "INSERT INTO travel_hoteles.responsable ( " .
			"nombre," .
			" apellidop," .
			" apellidom," .
			" sexo)" .
			" VALUES(?,?,?,?)";
	// Preparar la sentencia
		$sentencia = Database::getInstance()->getDb()->prepare($comando);
		$sentencia->execute(array($nombre,$apellidop,$apellidom,$sexo));
		$lastId = Database::getInstance()->getDb()->lastInsertId();
		return $lastId;
	}
	public static function crear_pedido_hotel_habitacion_reservacion($id_habitacion,$id_hotel,$id_reservacion,$id_responsable,$id_pedido)
	{
	// Sentencia INSERT
		$comando = "INSERT INTO travel_hoteles.habitacion_reservacion ( " .
			"id_habitacion," .
			" id_hotel," .
			" id_reservacion," .
			" id_responsable," .
			" id_pedido)" .
			" VALUES(?,?,?,?,?)";
	// Preparar la sentencia
		$sentencia = Database::getInstance()->getDb()->prepare($comando);
		$sentencia->execute(array($id_habitacion,$id_hotel,$id_reservacion,$id_responsable,$id_pedido));
		$lastId = Database::getInstance()->getDb()->lastInsertId();
		return $lastId;
	}
	public static function crear_pedido_actividad_responsable($nombre,$apellidop,$apellidom,$sexo)
	{
	// Sentencia INSERT
		$comando = "INSERT INTO travel_actividades.persona ( " .
			"nombre," .
			" apellidop," .
			" apellidom," .
			" sexo)" .
			" VALUES(?,?,?,?)";
	// Preparar la sentencia
		$sentencia = Database::getInstance()->getDb()->prepare($comando);
		$sentencia->execute(array($nombre,$apellidop,$apellidom,$sexo));
		$lastId = Database::getInstance()->getDb()->lastInsertId();
		return $lastId;
	}
	public static function crear_pedido_actividad_actividad_persona($id_persona,$id_actividad,$no_ninos,$no_adultos,$fecha,$hora,$id_pedido)
	{
	// Sentencia INSERT
		$comando = "INSERT INTO travel_actividades.persona_actividad ( " .
			"id_persona," .
			" id_actividad," .
			" no_ninos," .
			" no_adultos," .
			" fecha," .
			" hora,".
			" id_pedido)" .
			" VALUES(?,?,?,?,?,?,?)";
	// Preparar la sentencia
		$sentencia = Database::getInstance()->getDb()->prepare($comando);
		$sentencia->execute(array($id_persona,$id_actividad,$no_ninos,$no_adultos,$fecha,$hora,$id_pedido));
		$lastId = Database::getInstance()->getDb()->lastInsertId();
		return $lastId;
	}
}
?>