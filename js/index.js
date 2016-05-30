$(document).ready(function(){
	var IdHotSelc;
	var IdAct;
	$(".button-collapse").sideNav();
	$('.collapsible').collapsible({
		accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 1,
		monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
		weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
		weekdays: 'picker__weekday',
		today: 'Hoy',
		clear: 'Limpiar',
		close: 'Cerrar',
		format: 'yyyy-mm-dd'
	});

	$('.timepicker').clockpicker({
		placement: 'bottom',
		align: 'left',
		twelvehour: true,
		autoclose: true,
		donetext: "Cerrar"
	});
	
	//Botones para las secciones 
	$('#si_sec_vuelos').click(function(){
		$('#sec_vuelos_forms').show();
		$(this).closest('.tarjeta_inicio').hide();
		initMap();
	});
	$('#no_sec_vuelos').click(function(){
		$('#sec_vuelos').find('.collapsible-header').click();
		$('#sec_vuelos_forms').show();
		initMap();
		$(this).closest('.tarjeta_inicio').hide();
		if(!$('#sec_hoteles').find('.collapsible-header').hasClass('active')){
			$('#sec_hoteles').find('.collapsible-header').click();
		}
	});

	$('#si_sec_hoteles').click(function(){
		$('#sec_hoteles_forms').show();
		$(this).closest('.tarjeta_inicio').hide();
		initMap2();
		if($('#text_llegada').val()==" "){
			$('#map2').show();
		}else{
			$('#destino_hotel').focus();
			$('#destino_hotel').val($('#text_llegada').val());
			$('#map2').hide();
			$('#btn_mostrar_mapa2').html('<i class="material-icons left">place</i> Mostrar mapa');
		}
	});
	$('#no_sec_hoteles').click(function(){

		$('#sec_hoteles').find('.collapsible-header').click();
		$('#sec_hoteles_forms').show();
		initMap2();
		$(this).closest('.tarjeta_inicio').hide();
		if(!$('#sec_actividades').find('.collapsible-header').hasClass('active')){
			
			$('#sec_actividades').find('.collapsible-header').click();
		}
		
	});

	$('#si_sec_actividades').click(function(){
		$('#sec_actividades_forms').show();
		initMap3();
		$(this).closest('.tarjeta_inicio').hide();
	});
	$('#no_sec_actividades').click(function(){
		$('#sec_actividades').find('.collapsible-header').click();
		$('#sec_actividades_forms').show();
		initMap3();
		$(this).closest('.tarjeta_inicio').hide();
	});

	//Aqui acaban lo de las tarjetas 

	$("#btn_buscar_vuelo").click(function(){
		if($("#text_salida").val()==" " || $("#text_llegada").val()==" " || $("#fechaS").val()=="" || $("#horaS").val()=="" || $("#num").val()==""){
			Materialize.toast('Por favor llena todos los campos', 3000, 'rounded red');
			return false;
		}
		$('#formularios').html('');
		$('#contenedor_asientos').html('');
		$('#Aerolinea_vuelos tbody').html('');
		$('#Aerolinea_vuelos').hide();
		//$('html,body').animate({scrollTop: $("#Aerolinea_vuelos").offset().top}, 2000);
		$.ajax({
			url : 'http://localhost/reservacionesWS/php/getaerolineasdestino.php',
			data : {origen: $("#text_salida").val(), destino: $("#text_llegada").val(),fecha_s: $("#fechaS").val(),hora_s: $("#horaS").val(),asientos: $("#num").val()},
			method : 'POST',
			dataType : 'json',
			mimeType: 'application/json'
		}).done(function(json){
			if(json.result){
				$('#Aerolinea_vuelos').show();
				if(json.hasOwnProperty('mensaje')){
					Materialize.toast(json.mensaje, 3000, 'rounded red');
					return false;
				}
				$.each(json.data,function(index,value){
					// console.log(value);
					$('#Aerolinea_vuelos tbody').append('<tr class="seleccionar_vuelo">'+
						'<td>'+value.nombre_aerolinea+'</td>'+
						'<td>'+value.fecha_s+'</td>'+
						'<td>'+value.hora_s+'</td>'+
						'<td>'+value.fecha_ll+'</td>'+
						'<td>'+value.hora_ll+'</td>'+
						'<td class="tr_id">'+value.id+'</td>'+
						'<td>'+value.precio+'</td>'+
						'</tr>');
				});
			}else{
				Materialize.toast('Error en el WS', 3000, 'rounded red');
			}
		});
	});
	
	$('#next_hoteles').click(function(){
		var validate=true;
		if($("#text_salida").val()==" " || $("#text_llegada").val()==" " || $("#fechaS").val()=="" || $("#horaS").val()=="" || $("#num").val()==""){
			//console.log("erro aerta");
			Materialize.toast('Por favor llena todos los campos', 3000, 'rounded red');
			validate=false;
			return false;
		}
		$('.persona_asiento').each(function(index,value){
			if(!$(value).find('.nombre_pasajero').val()==""){
				if(!$(value).find('.apellidoP_pasajero').val()==""){
					if(!$(value).find('.apellidoM_pasajero').val()==""){
						if(!$(value).find('.asiento_pasajero').val()==""){
							if($(value).find('.radio_feme').is(':checked') || $(value).find('.radio_masc').is(':checked')){
								
							}else{
								Materialize.toast("Selecciona el sexo para la persona "+(index+1), 3000, 'rounded red');
								validate=false;
								return false;
							}
						}else{
							$(value).find('.asiento_pasajero').focus();
							Materialize.toast("Selecciona un asiento para la persona "+(index+1), 3000, 'rounded red');
							validate=false;
							return false;
						}
					}else{
						$(value).find('.apellidoM_pasajero').focus();
						Materialize.toast("Ingresa el apellido materno de la persona "+(index+1), 3000, 'rounded red');
						validate=false;
						return false;
					}
				}else{
					$(value).find('.apellidoP_pasajero').focus();
					Materialize.toast("Ingresa el apellido paterno de la persona "+(index+1), 3000, 'rounded red');
					validate=false;
					return false;
				}
			}else{
				$(value).find('.nombre_pasajero').focus();
				Materialize.toast("Ingresa el nombre de la persona "+(index+1), 3000, 'rounded red');
				validate=false;
				return false;
			}
		});
		if(validate){
			$('#sec_vuelos').find('.collapsible-header').click();
			if(!$('#sec_hoteles').find('.collapsible-header').hasClass('active')){
				$('#sec_hoteles').find('.collapsible-header').click();
			}
		}
	});

	$('#buscaHotel').click(function(){
		$.ajax({
		    url : 'http://localhost/reservacionesWS/php/gethotelesdestinohabitacion.php',
		    data : {fecha_ll: $("#fechaLlHot").val(), fecha_s: $("#fechaSalHot").val(), destino: $("#destino_hotel").val(),habitaciones_requeridas: $("#numH").val()},
		    method : 'POST',
		    dataType : 'json',
		    mimeType: 'application/json'
		}).done(function(json){
			if(json.result){
				if(json.hasOwnProperty('mensaje')){
					Materialize.toast(json.mensaje, 3000, 'rounded red');
					return false;
				}
				$("#table_hoteles tbody").html("");
				$("#table_hoteles").show();
				$.each(json.data,function(index,value){
					var starts;
					var buffet;
					var vista_mar;
					var barralibre;
					var shownocturno;
					switch(value.starts){
						case "1":
							starts='<i class="material-icons">star</i>'+'<i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i>';
						break;
						case "2":
							starts='<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star_border</i><i class="material-icons">star_border</i><i class="material-icons">star_border</i>';
						break;
						case "3":
							starts='<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star_border</i><i class="material-icons">star_border</i>';
						break;
						case "4":
							starts='<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star_border</i>';
						break;
						case "5":
							starts='<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star</i>'+'<i class="material-icons">star</i>';
						break;
					}
					if(value.vista_mar=="1"){
						vista_mar = '<i class="material-icons">done</i>';
					}else{
						vista_mar = '<i class="material-icons">clear</i>';
					}
					if(value.buffet=="1"){
						buffet = '<i class="material-icons">done</i>';
					}else{
						buffet = '<i class="material-icons">clear</i>';
					}
					if(value.barralibre=="1"){
						barralibre = '<i class="material-icons">done</i>';
					}else{
						barralibre = '<i class="material-icons">clear</i>';
					}
					if(value.shownocturno=="1"){
						shownocturno = '<i class="material-icons">done</i>';
					}else{
						shownocturno = '<i class="material-icons">clear</i>';
					}

					$("#table_hoteles tbody").append(
						'<tr class="selec_hotel" data-id_hotel="'+value.id+'">'+
						'<td>'+value.nombre+'</td>'+
						'<td>'+value.ciudad+'</td>'+
						'<td>'+value.estado+'</td>'+
						'<td>'+value.descripcion+'</td>'+
						'<td>$'+value.precioxnoche+'</td>'+
						'<td>'+starts+'</td>'+
						'<td>'+vista_mar+'</td>'+
						'<td>'+buffet+'</td>'+
						'<td>'+barralibre+'</td>'+
						'<td>'+shownocturno+'</td>'+
						'</tr>'
					);
				});
			}else{
				Materialize.toast('Error en el WS', 3000, 'rounded red');
			}
		});
	});
	$('#buscaActividad').click(function(){
		$.ajax({
			url : 'http://localhost/reservacionesWS/php/getactividadesdestino.php',
			data : {destino: $("#destino_actividad").val()},
			method : 'POST',
			dataType : 'json',
			mimeType: 'application/json'
		}).done(function(json){
			if(json.result){
				if(json.hasOwnProperty('mensaje')){
					Materialize.toast(json.mensaje, 3000, 'rounded red');
					return false;
				}
				$("#actividades tbody").html("");
				$.each(json.data,function(index,value){
					$("#actividades tbody").append(
						'<tr class="selec_actividad" data-id_actividad="'+value.id+'">'+
							'<td>'+value.nombre+'</td>'+
							'<td>'+value.ciudad+'</td>'+
							'<td>'+value.descripcion+'</td>'+
							'<td>$'+value.precio_nino+'</td>'+
							'<td>$'+value.precio_adulto+'</td>'+
						'</tr>'
					);
				});
			}else{
				Materialize.toast('Error en el WS', 3000, 'rounded red');
			}
		});
	});
	
	$('#next_actividades').click(function(){
		$('#sec_hoteles').find('.collapsible-header').click();
		if(!$('#sec_actividades').find('.collapsible-header').hasClass('active')){
			$('#sec_actividades').find('.collapsible-header').click();
			$.ajax({
				url : 'http://localhost/reservacionesWS/php/getactividadesdestino.php',
				data : {destino: $("#text_llegada").val()},
				method : 'POST',
				dataType : 'json',
				mimeType: 'application/json'
			}).done(function(json){
				if(json.result){
					$("#actividades tbody").html("");
					$.each(json.data,function(index,value){
						$("#actividades tbody").append(
							'<tr class="selec_actividad" data-id_actividad="'+value.id+'">'+
							'<td>'+value.nombre+'</td>'+
							'<td>'+value.ciudad+'</td>'+
							'<td>'+value.descripcion+'</td>'+
							'<td>$'+value.precio_nino+'</td>'+
							'<td>$'+value.precio_adulto+'</td>'+
							'</tr>'
						);
					});
				}else{
					console.log("cagaste el palo");
				}
			});
		}
	});
	
	$('#btn_mostrar_mapa').click(function(){
		if($('#map').is(":visible")){
			$(this).html('<i class="material-icons left">place</i> Mostrar mapa');
			$('#map').hide();
		}else{
			$(this).html('<i class="material-icons left">place</i> Ocultar mapa');
			$('#map').show();
		}
	});
	$('#btn_mostrar_mapa2').click(function(){
		if($('#map2').is(":visible")){
			$(this).html('<i class="material-icons left">place</i> Mostrar mapa');
			$('#map2').hide();
		}else{
			$(this).html('<i class="material-icons left">place</i> Ocultar mapa');
			$('#map2').show();
		}
	});
	$('#btn_mostrar_mapa3').click(function(){
		if($('#map3').is(":visible")){
			$(this).html('<i class="material-icons left">place</i> Mostrar mapa');
			$('#map3').hide();
		}else{
			$(this).html('<i class="material-icons left">place</i> Ocultar mapa');
			$('#map3').show();
		}
	});
});
$(document).on('click','.seleccionar_vuelo',function(){
	$('.seleccionar_vuelo').each(function(index,value){
		$(value).removeClass('red lighten-4');
	});
	$(this).addClass('red lighten-4');
	$('#contenedor_asientos').html('');
	var contenido = '<div class="col s12 m6">';
	for(var i =1; i<=72;i++){
		contenido+='<div class="col s1 asiento asiento_disponible"><i class="tiny material-icons">airline_seat_recline_normal</i><span>'+i+'</span></div>';
		if(i==12 || i==24 || i==36 || i==48 || i==60 || i==72){
			contenido+='</div>';
			if(i!=72){
				contenido+='<div class="col s12 m6">';
			}
		}
	}
	$('#contenedor_asientos').append(contenido);

	$("#formularios").html('');
	for (var i = 0; i <$("#num").val(); i++) {
		$("#formularios").append('<div class="persona_asiento">'+
			'<div class="row">'+
				'<h5 class="col s12 text-fluid">Persona '+(i+1)+'</h5>'+
				'<div class="input-field col s12 m6">'+
					'<i class="material-icons prefix">perm_identity</i>'+
					'<input placeholder="Nombres(s)" type="text" class="nombre_pasajero">'+
					'<label class="active">Nombre(s)</label>'+
				'</div>'+
				'<div class="input-field col s12 m3">'+
					'<i class="material-icons prefix">airline_seat_recline_extra</i>'+
					'<input placeholder="Número de asiento" type="text" class="asiento_pasajero">'+
					'<label class="active">Número de asiento</label>'+
				'</div>'+
				'<div class="input-field col s12 m3">'+
					'<input class="with-gap radio_feme" name="group'+i+'" type="radio" data-label_ref="Femenino"/>'+
					'<label class="active_radiobutton" style="color: #FF6781;">Femenino</label>'+
					'<input class="with-gap radio_masc" name="group'+i+'" type="radio" data-label_ref="Masculino" />'+
					'<label class="active_radiobutton" style="color: #039be5;">Masculino</label>'+
				'</div>'+
			'</div>'+
			'<div class="row">'+
				'<div class="input-field col s12 m6">'+
					'<i class="material-icons prefix">perm_identity</i>'+
					'<input placeholder="Apellido paterno" type="text" class="apellidoP_pasajero">'+
					'<label class="active">Apellido paterno</label>'+
				'</div>'+
				'<div class="input-field col s12 m6">'+
					'<i class="material-icons prefix">perm_identity</i>'+
					'<input placeholder="Apellido materno" type="text" class="apellidoM_pasajero">'+
					'<label class="active">Apellido materno</label>'+
				'</div>'+
			'</div>'+
		'</div>');
	}
	$.ajax({
		url : 'http://localhost/reservacionesWS/php/getvueloasientos.php',
		data : {id_vuelo: $(this).find('.tr_id').text()},
		method : 'POST',
		dataType : 'json',
		mimeType: 'application/json'
	}).done(function(json){
		if(json.result){
			if(json.hasOwnProperty('mensaje')){
				return false;
			}
			//console.log($(".asiento_disponible"));
			$.each(json.data,function(index,va_value){
				$(".asiento_disponible").each(function(index,a_value){
					if($(a_value).text().replace("airline_seat_recline_normal", "")==va_value.asiento){
						$(a_value).removeClass("asiento_disponible").addClass("asiento_ocupado");
					}
				});
			});
		}else{
			Materialize.toast(json.mensaje, 3000, 'rounded red');
		}
		
	});
});
$(document).on("click",".selec_hotel",function(){
	IdHotSelc= $(this).data("id_hotel");
	$('.selec_hotel').each(function(index,value){
		$(value).removeClass('red lighten-4');
	});
	$(this).addClass('red lighten-4');
});
$(document).on("click",".selec_actividad",function(){
	$(this).toggleClass('red lighten-4');
});


$(document).on('click','.active_radiobutton',function(){
	var element_click=$(this);
	$(this).closest('.input-field').find('input').each(function(index,value){
		if($(value).data('label_ref')==$(element_click).text()){
			$(value).click();
		}
	});
});

$(document).on("click", ".asiento_disponible", function() {
	if($('.asiento_seleccionado').length<$('#num').val() && !$(this).hasClass('asiento_seleccionado')){
		$(this).addClass('asiento_seleccionado');
		var asiento_click=$(this).text().replace("airline_seat_recline_normal", "");
		$( ".asiento_pasajero" ).each(function(index,value){
			if($(value).val()==""){
				$(value).val(asiento_click);
				$(value).closest('.input-field').find('i').addClass('active');
				return false;
			}
		});
	}
});
$(document).on('click','.asiento_seleccionado',function(){
	var asiento_click=$(this);
	$( ".asiento_pasajero" ).each(function(index,value){
		if($(value).val()==asiento_click.text().replace("airline_seat_recline_normal", "")){
			$(value).val("");
			$(value).closest('.input-field').find('i').removeClass('active');
			$(asiento_click).toggleClass('asiento_seleccionado');
			return false;
		}
	});
});


var map;
var markerS;
var markerLl;
var LineS;
var LineLl;
var linea;
var geocoder;
var infowindow;
var imageMS = 'img/Salida.png';
var imageMLl='img/Llegada.png';

var map2;
var markerDestinohotel;
var geocoder2;
var infowindow2;
var imageHD='img/Llegada.png';

var map3;
var markerDestinoactividades;
var geocoder3;
var infowindow3;
var imageAD='img/Llegada.png';

function initMap() {
	var myLatLng = {lat: 23.4598087, lng: -100.3507389};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		center: myLatLng,
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	markerS = new google.maps.Marker({
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		position: {lat: 21.864865607746523, lng: -102.28433265000001},
		icon: imageMS
	});
	markerLl = new google.maps.Marker({
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		position:{lat: 21.24719896448074, lng: -105.11636390000001},
		icon:imageMLl
	});
	geocoder = new google.maps.Geocoder;
	infowindow = new google.maps.InfoWindow;
	markerLl.addListener('click', toggleBounceLl);
	markerLl.addListener('dragend', obtenerInfoLl);
	markerS.addListener('click', toggleBounceS);
	markerS.addListener('dragend', obtenerInfoS);
}
function toggleBounceS() {
	if (markerS.getAnimation() !== null) {
		markerS.setAnimation(null);
	} else {
		markerS.setAnimation(google.maps.Animation.BOUNCE);
	}
}
function toggleBounceLl() {
	if (markerLl.getAnimation() !== null) {
		markerLl.setAnimation(null);
	} else {
		markerLl.setAnimation(google.maps.Animation.BOUNCE);
	}
}
function obtenerInfoS(){
	var lat = this.getPosition().lat();
	//console.log(lat);
	var lng = this.getPosition().lng();
	//console.log(lng);
	var latlng = {lat: lat, lng: lng}
	geocoder.geocode({'location': latlng}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				$.each(results,function(index,element){
					if(element.types[0]=="administrative_area_level_1"){
						$('#text_salida').val(element.address_components[0].long_name);
						if($('#text_salida').val()!="" && $('#text_llegada').val()!="" && $('#text_salida').val()!=" " && $('#text_llegada').val()!=" "){
							$('#map').hide();
							$('#btn_mostrar_mapa').html('<i class="material-icons left">place</i> Mostrar mapa');
						}
					}
				});
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}

function obtenerInfoLl(){
	var lat = this.getPosition().lat();
	//console.log(lat);
	var lng = this.getPosition().lng();
	//console.log(lng);
	var latlng = {lat: lat, lng: lng};
	geocoder.geocode({'location': latlng}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				$.each(results,function(index,element){
					if(element.types[0]=="administrative_area_level_1"){
						$('#text_llegada').val(element.address_components[0].long_name);
						if($('#text_salida').val()!="" && $('#text_llegada').val()!="" && $('#text_salida').val()!=" " && $('#text_llegada').val()!=" "){
							$('#map').hide();
							$('#btn_mostrar_mapa').html('<i class="material-icons left">place</i> Mostrar mapa');
						}
					}
				});
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}

function initMap2() {
	var myLatLng = {lat: 23.4598087, lng: -100.3507389};
	map2 = new google.maps.Map(document.getElementById('map2'), {
		zoom: 6,
		center: myLatLng,
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	markerDestinohotel= new google.maps.Marker({
		map: map2,
		draggable: true,
		animation: google.maps.Animation.DROP,
		position: {lat: 21.864865607746523, lng: -102.28433265000001},
		icon: imageHD
	});
	geocoder2 = new google.maps.Geocoder;
	infowindow2 = new google.maps.InfoWindow;
	markerDestinohotel.addListener('click', toggleBounceHD);
	markerDestinohotel.addListener('dragend', obtenerInfoDestino);
}
function toggleBounceHD() {
	if (markerDestinohotel.getAnimation() !== null) {
		markerDestinohotel.setAnimation(null);
	} else {
		markerDestinohotel.setAnimation(google.maps.Animation.BOUNCE);
	}
}
function obtenerInfoDestino(){
	var lat = this.getPosition().lat();
	//console.log(lat);
	var lng = this.getPosition().lng();
	//console.log(lng);
	var latlng = {lat: lat, lng: lng};
	geocoder2.geocode({'location': latlng}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				$.each(results,function(index,element){
					if(element.types[0]=="administrative_area_level_1"){
						$('#destino_hotel').focus();
						$('#destino_hotel').val(element.address_components[0].long_name);
						if($('#destino_hotel').val()!=""){
							$('#map2').hide();
							$('#btn_mostrar_mapa2').html('<i class="material-icons left">place</i> Mostrar mapa');
						}
					}
				});
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}

function initMap3() {
	var myLatLng = {lat: 23.4598087, lng: -100.3507389};
	map3 = new google.maps.Map(document.getElementById('map3'), {
		zoom: 6,
		center: myLatLng,
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	markerDestinoactividades= new google.maps.Marker({
		map: map3,
		draggable: true,
		animation: google.maps.Animation.DROP,
		position: {lat: 21.864865607746523, lng: -102.28433265000001},
		icon: imageAD
	});
	geocoder3 = new google.maps.Geocoder;
	infowindow3 = new google.maps.InfoWindow;
	markerDestinoactividades.addListener('click', toggleBounceAD);
	markerDestinoactividades.addListener('dragend', obtenerInfoADestino);
}
function toggleBounceAD() {
	if (markerDestinoactividades.getAnimation() !== null) {
		markerDestinoactividades.setAnimation(null);
	} else {
		markerDestinoactividades.setAnimation(google.maps.Animation.BOUNCE);
	}
}
function obtenerInfoADestino(){
	var lat = this.getPosition().lat();
	//console.log(lat);
	var lng = this.getPosition().lng();
	//console.log(lng);
	var latlng = {lat: lat, lng: lng};
	geocoder3.geocode({'location': latlng}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[1]) {
				$.each(results,function(index,element){
					if(element.types[0]=="administrative_area_level_1"){
						$('#destino_actividad').focus();
						$('#destino_actividad').val(element.address_components[0].long_name);
						if($('#destino_actividad').val()!=" "){
							$('#map3').hide();
							$('#btn_mostrar_mapa3').html('<i class="material-icons left">place</i> Mostrar mapa');
						}
					}
				});
			} else {
				window.alert('No results found');
			}
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}


$(window).resize(function () {
	var h = $(window).height(),
	offsetTop = 30; // Calculate the top offset
	$('#map').css('height', (h - offsetTop));
	$('#map2').css('height', (h - offsetTop));
	$('#map3').css('height', (h - offsetTop));
}).resize();

