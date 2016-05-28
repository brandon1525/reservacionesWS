$(document).ready(function(){
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

	var asientos=0;
	var asientos2=0;
	var num=0;
	var IdHotSelc;
	var IdAct;
	$("#btn1").click(function(){

		if($("#text_salida").val()=="" || $("#text_llegada").val()=="" || $("#fechaS").val()=="" || $("#horaS").val()=="" || $("#num").val()==""){
			console.log("erro aerta");
			return false;
		}
		$('html,body').animate({scrollTop: $("#Aerolinea_vuelos").offset().top}, 2000);
		$.ajax({
			url : 'http://localhost/reservacionesWS/php/getaerolineasdestino.php',
			data : {origen: $("#text_salida").val(), destino: $("#text_llegada").val(),fecha_s: $("#fechaS").val(),hora_s: $("#horaS").val(),asientos: $("#num").val()},
			method : 'POST',
			dataType : 'json',
			mimeType: 'application/json'
		}).done(function(json){
			if(json.result){
				$('#Aerolinea_vuelos tbody').html('');
				$.each(json.data,function(index,value){
					console.log(value);
					$('#Aerolinea_vuelos tbody').append('<tr class="seleccionar_vuelo">'+
						'<td>'+value.nombre_aerolinea+'</td>'+
						'<td>'+value.fecha_s+'</td>'+
						'<td>'+value.hora_s+'</td>'+
						'<td>'+value.fecha_ll+'</td>'+
						'<td>'+value.hora_ll+'</td>'+
						'<td class="tr_id">'+value.id+'</td>'+
						'<td>'+value.precio+'</td>'+
						'</tr>');
				})
				
			}else{
				console.log("error alerta");
			}
		});
	});
	$(document).on("click","#btn3",function(){
		console.log("Simon entre al 3");
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
			}else
			{
				console.log("cagaste el palo");
			}
		    
		});
	});
	$(document).on("click",".selec_actividad",function(){
				IdAct= $(this).data("id_actividad");
		console.log(IdAct);
	});

	$(document).on("click","#btn2", function(){

		console.log("Simon");
		$.ajax({
		    url : 'http://localhost/reservacionesWS/php/gethotelesdestinohabitacion.php',
		    data : {fecha_ll: $("#fechaLlHot").val(), fecha_s: $("#fechaSalHot").val(), destino: $("#text_llegada").val(),habitaciones_requeridas: $("#numH").val()},
		    method : 'POST',
		    dataType : 'json',
		    mimeType: 'application/json'
		}).done(function(json){
			if(json.result){
				$("#table_hoteles tbody").html("");
				$.each(json.data,function(index,value){
					var starts;
					var buffet;
					var vista_mar;
					var barralibre;
					var shownocturno;

					console.log(value.nombre);
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
				})
			}else{
				console.log("error alerta");
			}
    
		});
	});


	$(document).on("click", ".asiento", function() { 
		//console.log(asientos);
		if(asientos2==0){
			alert("Ingresa algun asiento");
		}
		if(asientos > 0){
			$(this).removeClass("desactivo").addClass("activo");
			//console.log(num);
			$(".Nasiento").eq(num).val($( ".asiento" ).index( this )+1);
			//console.log( "Index: " + ($( ".asiento" ).index( this )+1) );
			asientos--;
			num++;
		}
	});
	$(document).on('click','.seleccionar_vuelo',function(){
		//console.log($(this).find('.tr_id').text());
		$('#contenedor_asientos').html('');
		var contenido = '<div class="col s12 m6">';
		for(var i =1; i<=72;i++){
			contenido+='<div class="col s1 asiento_disponible"><i class="tiny material-icons">airline_seat_recline_normal</i><span>'+i+'</span></div>';
			if(i==12 || i==24 || i==36 || i==48 || i==60 || i==72){
				contenido+='</div>';
				if(i!=72){
					contenido+='<div class="col s12 m6">';
				}
				
				
			}
		}
		$('#contenedor_asientos').append(contenido);

		//$(".asiento").removeClass("activo").addClass("desactivo");
	    $("#formularios").html('');

	    asientos = $("#num").val();
	    asientos2 = $("#num").val();
	    for (var i = 0; i <asientos; i++) {
	      	$("#formularios").append('<div class="persona_asiento">'+
									'<div class="row">'+
										'<h5 class="col s12 text-fluid">Persona '+(i+1)+'</h5>'+
										'<div class="input-field col s12 m6">'+
											'<i class="material-icons prefix">perm_identity</i>'+
											'<input placeholder="Nombres(s)" type="text" class="nombre_pasajero">'+
											'<label class="active">Nombre(s)</label>'+
										'</div>'+
										'<div class="input-field col s6 m3">'+
											'<i class="material-icons prefix">airline_seat_recline_extra</i>'+
											'<input placeholder="Número de asiento" type="text" class="asiento_pasajero">'+
											'<label class="active">Número de asiento</label>'+
										'</div>'+
										'<div class="input-field col s6 m3">'+
											'<input class="with-gap" name="group1" type="radio" data-label_ref="Femenino"/>'+
											'<label class="active_radiobutton" style="color: #FF6781;">Femenino</label>'+
											'<input class="with-gap" name="group1" type="radio" data-label_ref="Masculino" />'+
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
	    $(document).on('click','.active_radiobutton',function(){
	    	var element_click=$(this);
	    	$(this).closest('.input-field').find('input').each(function(index,value){
	    		if($(value).data('label_ref')==$(element_click).text()){
	    			$(value).click();
	    		}
	    	});
	    });
	    $("#formularios").append('<div class="form-group"><button type="submit" id="btn2" class="btn btn-default" >Reservar hotel</button><button type="submit" id="btn3" class="btn btn-default" >continuar sin hotel</button></div>');
	    $('html,body').animate({scrollTop: $("#fondo-avion").offset().top}, 2000);
		$.ajax({
			url : 'http://localhost/reservacionesWS/php/getvueloasientos.php',
			data : {id_vuelo: $(this).find('.tr_id').text()},
			method : 'POST',
			dataType : 'json',
			mimeType: 'application/json'
		}).done(function(json){
				$.each(json.data,function(index,value){
					$(".asiento").eq((value.asiento) - 1).removeClass("desactivo").addClass("activo");
					//console.log(value.asiento);
				})

		});
		//console.log($(this).find('.tr_id').text());
	});
	$("#btn2").click(function(){
		console.log("Simon");
		$.ajax({
		    url : 'http://localhost/reservacionesWS/php/gethotelesdestinohabitacion.php',
		    data : {fecha_ll: 2016-05-26, fecha_s: 2016-05-30, destino: $("#text_llegada").val(),habitaciones_requeridas: $("#num").val()},
		    method : 'POST',
		    dataType : 'json',
		    mimeType: 'application/json'
		}).done(function(json){
			if(json.result){
				$("#table_hoteles tbody").html("");
				$.each(json.data,function(index,value){
					//console.log(value.nombre);
					$("#table_hoteles tbody").append(
						'<tr class="selec_hotel">'+
						'<td>'+value.nombre+'</td>'+
						'<td>'+value.ciudad+'</td>'+
						'<td>'+value.estado+'</td>'+
						'<td>'+value.descripcion+'</td>'+
						'<td>'+value.starts+'</td>'+
						'<td>'+value.vista_mar+'</td>'+
						'<td>'+value.buffet+'</td>'+
						'<td>'+value.barralibre+'</td>'+
						'<td>'+value.shownocturno+'</td>'+
						'</tr>'
						);
				})
			}else{
				console.log("error alerta");
			}
		});
	});	
	$(document).on("click",".selec_hotel",function(){
		IdHotSelc= $(this).data("id_hotel");
		console.log(IdHotSelc);
	});
	var map;
	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 21.880628, lng: -102.29534790000002},
			zoom: 8
		});
	}
	$(window).resize(function () {
		var h = $(window).height(),
		offsetTop = 30; // Calculate the top offset
		$('#map').css('height', (h - offsetTop));
	}).resize();
	$('#btn_mostrar_mapa').click(function(){
		if($('#map').is(":visible")){
			$(this).html('<i class="material-icons left">place</i> Mostrar mapa');
			$('#map').hide();
		}else{
			$(this).html('<i class="material-icons left">place</i> Ocultar mapa');
			$('#map').show();
		}
		
		//$('#btn_mostrar_mapa').hide();
	});
});


