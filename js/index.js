$(document).ready(function(){
	var asientos=0;
	var asientos2=0;
	var num=0;
	$("#btn1").click(function(){
		$.ajax({
			url : 'http://localhost/reservacionesWS/php/getaerolineasdestino.php',
			data : {destino: $("#text_llegada").val(),fecha_s: $("#fechaS").val(),hora_s: $("#horaS").val(),asientos: $("#num").val()},
			method : 'POST',
			dataType : 'json',
			mimeType: 'application/json'
		}).done(function(json){
			console.log(json);
		});
	});
	$(document).on("click", ".asiento", function() { 
		console.log(asientos);
		if(asientos2==0){
			alert("Ingresa algun asiento");
		}
		if(asientos > 0){
			$(this).removeClass("desactivo").addClass("activo");
			console.log($(".Nasiento"));
			$(".Nasiento").eq(num).val($( ".asiento" ).index( this )+1);
			console.log( "Index: " + ($( ".asiento" ).index( this )+1) );
			asientos--;
			num++;
		}
	});
	$("#btn2").click(function(){

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
		$('#map').show();
		$('#btn_mostrar_mapa').hide();
	});
});


