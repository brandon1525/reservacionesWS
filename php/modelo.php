<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
require 'db_connect/db_connect_aerolineas.php';
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
            return false;
        }
    }
    public static function getHotelesDestino($ciudad){
        try {
            $consulta = "SELECT * FROM reservaciones.hotel where ciudad=?";
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($ciudad));
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
    
}
?>