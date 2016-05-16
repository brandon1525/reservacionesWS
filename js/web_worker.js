var d;

function mostrarHora(){
	d = new Date();
	postMessage('Fecha: '+
		d.getDate()+
		'/'+
		(d.getMonth()+1)+
		'/'+d.getFullYear()+
		'<br>'+d.getHours()+':'+
		d.getMinutes()+':'+
		d.getSeconds());
    setTimeout("mostrarHora()",1000);
}
mostrarHora();

