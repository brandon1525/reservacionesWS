<?php 
//Datos del archivo 
$nombre_archivo = $_FILES['archivo']['name']; 
$tipo_archivo = $_FILES['archivo']['type']; 
$tamano_archivo = $_FILES['archivo']['size']; 
$carpeta  = $_POST['carpeta'];
$destino="carga/".$nombre_archivo;

$destino2="carga/".$carpeta."/".$nombre_archivo;
$estructura = 'carga/'.$carpeta;

// Para crear una estructura anidada se debe especificar
// el parámetro $recursive en mkdir().

if(!mkdir($estructura, 0777, true)) {
    die('Fallo al crear las carpetas...');
}

//Se comprueba si las características del archivo son las adecuadas
if  (!((strpos($tipo_archivo,  "jpg")  ||  strpos($tipo_archivo,  "jpeg") ||  strpos($tipo_archivo,  "png")))) { 
	echo  "La  extensión  o  el  tamaño  del  archivo  no  es  correcta.  <br>Se  permiten 
	archivos .gif o .jpg<br>Se permiten archivos de 100 Kb máximo."; 
}else{ 
	if (move_uploaded_file($_FILES['archivo']['tmp_name'], $destino)){
		if(chmod($estructura, 0777)){
			if (copy($destino, $destino2)) {
				echo "El archivo ha sido cargado correctamente."; 
			}else{
				echo "Error en la copia 2 del archivo."; 
			}
		}
		
		//echo "El archivo ha sido cargado correctamente."; 
	}else{
		echo "Error en la carga del archivo."; 
	}
} 
?>