$(document).ready(function(){
	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 21.880628, lng: -102.29534790000002},
			zoom: 8
		});
	}
	iniciarWorker();
	$.ajax({
		url: "http://localhost/reservacionesWS/php/aerolineas.php",
		method: 'POST',
		dataType:'json',
		mimeType: 'application/json'
	}).done(function(json) {
		if(json.result=="true"){
			$.each(json.data,function(index, element){
				switch(element.nombre){
					case "AEROMÉXICO":
					$('#aeromexico').show();
					break;
					case "INTERJET":
					$('#interjet').show();
					break;
					case "UBER":
					$('#uber').show();
					break;
					case "MEXICANA DE AVIACIÓN":
					$('#mexicana').show();
					break;
					case "PRIVE JETS":
					$('#privejets').show();
					break;
					case "VOLARIS":
					$('#volaris').show();
					break;
				}
			});
			//localStorage.setItem("datos_horario", JSON.stringify(json.horario));
			//localStorage.setItem("horario_persona",JSON.stringify(json.clases));
			//console.log(json.clases);
			//localStorage.setItem("configuracion_persona",JSON.stringify(json.configuracion));
		}else{
			console.log("Algo salió mal");
		}
	});
	
	$(window).resize(function () {
		var h = $(window).height(),
		offsetTop = 30; // Calculate the top offset
		$('#map').css('height', (h - offsetTop));
	}).resize();
	$('#btn_mostrar_mapa').click(function(){
		$('#map').show();
		$('#btn_mostrar_mapa').hide();
	});
	$('#archivo_1').change(function(e){
		if($('#palabra_secreta').val()==""){
			$('#palabra_secreta').focus();
		}else{
			subir(e);
		}
		
	});
});
function buscar_aerolineas_origen_destino(){
	$('#aeromexico').hide();
	$('#interjet').hide();
	$('#uber').hide();
	$('#mexicana').hide();
	$('#privejets').hide();
	$('#volaris').hide();
	$.ajax({
		url: "http://localhost/reservacionesWS/php/aerolinea_origen_destino.php",
		method: 'POST',
		data: {origen: $('#text_salida').val(), destino: $('#text_llegada').val()},
		dataType:'json',
		mimeType: 'application/json'
	}).done(function(json) {
		if(json.result=="true"){
			
			$.each(json.data,function(index, element){
				switch(element.nombre){
					case "AEROMÉXICO":
					$('#aeromexico').show();
					break;
					case "INTERJET":
					$('#interjet').show();
					break;
					case "UBER":
					$('#uber').show();
					break;
					case "MEXICANA DE AVIACIÓN":
					$('#mexicana').show();
					break;
					case "PRIVE JETS":
					$('#privejets').show();
					break;
					case "VOLARIS":
					$('#volaris').show();
					break;
				}
			});
		}else{
			console.log("Algo salió mal");
		}
	});
}
function buscarHotel_destino(){
	console.log($('#text_llegada').val());
	$.ajax({
		url: "http://localhost/reservacionesWS/php/hoteles.php",
		method: 'POST',
		data: {ciudad: $('#text_llegada').val()},
		dataType:'json',
		mimeType: 'application/json'
	}).done(function(json) {
		if(json.result=="true"){
			$('#table_hoteles tbody').html('');
			$.each(json.data,function(index, element){
				$('#table_hoteles tbody').append('<tr data-id="'+element.id+'"><td><input type="radio" name="optradio"></td><td>'+element.nombre+'</td><td>'+element.ciudad+'</td><td>'+element.estrellas+'</td></tr>');
			});
		}else{
			console.log("Algo salió mal");
		}
	});
}

function iniciarWorker(){
	var w;
	if(typeof(Worker) !== "undefined") {
		if(typeof(w) == "undefined") {
			w = new Worker("js/web_worker.js");
		}
		w.onmessage = function(event) {
			$('#reloj_contador').html(event.data);
		}
	} else {
		$('#reloj_contador').html("Sorry, diria justin...");
	}
}
function subir(e){
	var files  = event.target.files;
	var output = [];
	archivos=files;
	for (var i = 0; i < files.length; i++) {
		var archivo=files[i];
		var datos=new FormData();
		datos.append('archivo',archivo);
		datos.append('carpeta',$('#palabra_secreta').val());
		/*var url="php/upload/pract04.php";
		var solicitud=new XMLHttpRequest();
		var xmlupload=solicitud.upload;
		xmlupload.addEventListener('loadstart',comenzar(xmlupload,e),false);
		solicitud.open("POST", url, true);
		solicitud.send(datos);*/
		$.ajax({
			url: 'http://localhost/reservacionesWS/upload/pract04.php',
			type: 'POST',
			data: datos,
			cache: false,
			dataType: 'html',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			success: function(data, textStatus, jqXHR){
				if(typeof data.error === 'undefined'){
					// Success so call function to process the form
					//submitForm(event, data);
				}else{
					// Handle errors here
					console.log('ERRORS: ' + data.error);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				// Handle errors here
				console.log('ERRORS: ' + textStatus);
				// STOP LOADING SPINNER
			}
		}).done(function(respuesta){
			if(respuesta=="El archivo ha sido cargado correctamente."){
				$('#archivo_1').closest('.form-group').find('.help-block').text(respuesta);
			}
		});
	}  
}
