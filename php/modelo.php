<?php
error_reporting(E_ALL);
ini_set('display_errors','1');
require 'db_connect.php';
class Modelo{
    function __construct(){
    }
    public static function getAerolineas(){
        try {
            $consulta = "SELECT * FROM aerolinea";
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            //$comando->execute(array($ruta));
            $comando->execute();
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
    public static function getAerolineas_origen_destino($origen, $destino){
        try {
            $consulta = "SELECT * FROM aerolinea INNER JOIN (select * from vuelo where origen=? and destino=?) as T1 ON aerolinea.id=T1.id_aerolinea";
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($origen,$destino));
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