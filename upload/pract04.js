var destino,cajadatos,archivos;
function iniciar(){
    cajadatos=document.getElementById('cajadatos');
    archivos=document.getElementById('archivos');
    //archivos.addEventListener('change', subir, false);
    
    archivos.addEventListener('dragover', handleDragOver, false);
    archivos.addEventListener('drop', subir, false);

}
function subir(e){
    console.log(e);
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; 
    var output = [];
    archivos=files;
    console.log(archivos);
    for (var i = 0; i < files.length; i++) {
        console.log("archivo "+i);
        var archivo=files[i];
        var datos=new FormData();
        datos.append('archivo',archivo);
        var url="pract04.php";
        var solicitud=new XMLHttpRequest();
        var xmlupload=solicitud.upload;
        xmlupload.addEventListener('loadstart',comenzar(xmlupload,e),false);
        solicitud.open("POST", url, true);
        solicitud.send(datos);
    }
}

function comenzar(xmlupload,e){
    cajadatos.html="";
    cajadatos.innerHTML='<progress value="0" max="100">0%</progress>';
    xmlupload.addEventListener('progress',estado(xmlupload,e),false);
}
function estado(xmlupload,e){
    xmlupload.addEventListener('load',mostrar,false);
    if(e.lengthComputable){
        var por=parseInt(e.loaded/e.total*100);
        var barraprogreso=cajadatos.querySelector("progress");
        console.log(cajadatos);
        console.log(barraprogreso);
        barraprogreso.value=por;
        console.log(barraprogreso);
        barraprogreso.innerHTML=por+'%';
    }
}
function mostrar(e){
    cajadatos.html=""; 
    cajadatos.innerHTML='Terminado';
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}
window.addEventListener('load', iniciar, false);