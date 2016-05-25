$(document).ready(function(){
	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 21.880628, lng: -102.29534790000002},
			zoom: 8
		});
	}
	$.ajax({
		url: "http://localhost/reservacionesWS/php/getaerolineasdestino.php",
		method: 'POST',
		dataType:'json',
		mimeType: 'application/json'
	}).done(function(json) {
		console.log(json);
		if(json.result=="true"){

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
});
function buscar_aerolineas_origen_destino(){
	$('#aeromexico').hide();
	$('#interjet').hide();
	$('#uber').hide();
	$('#mexicana').hide();
	$('#privejets').hide();
	$('#volaris').hide();
	$.ajax({
		url: "http://brbusiness.xyz/php/aerolinea_origen_destino.php",
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
		url: "http://brbusiness.xyz/reservacionesWS/php/hoteles.php",
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


