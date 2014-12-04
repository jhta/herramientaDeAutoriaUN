$(document).ready(function(){
   
    
    //Metadatos
     /* Eventos javascript que se ejecutan con ciertas acciones
    en el formulario de los metadatos*/
   var file_json;
   var eleccion;
   /* Esta función  obtiene un JSON el cual contiene el contenido de 
   la clasificación según la Nomenclatura Internacional de la Unesco
   y lo carga en el primer select
   */
    $.getJSON( "dist/js/tipos.json", function( data ) {
  file_json=data;
  $.each( data, function( key, val ) {
   $("#ccabecera").append($("<option>").attr("value", key).text(key));
    
  });
    });
   /*
   Esta función se encarga de actualizar el select cespecificos cuando
   la persona elige  una de las opciones disponibles del select ccabecera
   con el fin de mostrar dichos datos en este select cespecificos correspondientes a 
   ccabecera
   */
    $('#ccabecera').on('change', function() {
    
   if(this.value=="--"){
       $('#group-ccespecificos').hide();
       $('.mostrar').hide();
       eleccion="";
  }else{
      $("#cespecificos").empty();
  $("#cespecificos").append($("<option>").attr("value", "--").text("--"));
   $('#group-ccespecificos').show();
   
   $.each( file_json[this.value]["especificos"], function( key, val ) {
   $("#cespecificos").append($("<option>").attr("value", val["nombre"]).text(val["nombre"]));

   });
       $('.mostrar').show();
        eleccion= file_json[this.value]["codigo"];
   $("#codigo").text("Codigo: "+eleccion);
   $("#descripcion").text("Descripcion: "+this.value);
        
  }
});
/*
   Esta función se encarga de actualizar el select subitems cuando
   la persona elige  una de las opciones disponibles del select cespecificos
   con el fin de mostrar dichos datos en este select subitems correspondientes a 
   cespecificos
   */
 $('#cespecificos').on('change', function() {
    
 
   if($('#cespecificos').val()=="--"){
       $('#group-subitems').hide();
       
       eleccion= file_json[$('#ccabecera').val()]["codigo"];
   $("#codigo").text("Codigo: "+eleccion);
   $("#descripcion").text("Descripcion: "+$('#ccabecera').val());
  }else{
    $("#subitems").empty();
  $("#subitems").append($("<option>").attr("value", "--").text("--"));
  
   $('#group-subitems').show();
   $.each( file_json[$('#ccabecera').val()]["especificos"], function( key, val ) {
       if( val["nombre"]==$('#cespecificos').val()){
           eleccion= val["codigo"];
            $.each( val["subitems"], function( key2, val2 ) {
            
              $("#subitems").append($("<option>").attr("value", val2["nombre"]).text(val2["nombre"]));
            });
       }

   });
   $("#codigo").text("Codigo: "+eleccion);
   $("#descripcion").text("Descripcion: "+$('#ccabecera').val()+" - "+$('#cespecificos').val());
  }
});
/*
   Esta funcion se encarga de actualizar la variable "eleccion"
   la cual se usa para mostrar al usuario la informacion de la 
   clasificación elegida, como el código y el nombre de esta. Para este caso
   verifica si se cambió el select subitems que es el de más profundidad, teniendo
   en cuenta si se elegió "--" el cual devuelve elección al select que lo precede o
   en caso contrario al código y nombre que le pertenece.
   */
$('#subitems').on('change', function() {
    
   if($('#subitems').val()=="--"){
      
  $.each( file_json[$('#ccabecera').val()]["especificos"], function( key, val ) {
       if( val["nombre"]==$('#cespecificos').val()){
           eleccion= val["codigo"];
       }
   });
   $("#codigo").text("Codigo: "+eleccion);
   $("#descripcion").text("Descripcion: "+$('#ccabecera').val()+" - "+$('#cespecificos').val());
  }else{
    $.each( file_json[$('#ccabecera').val()]["especificos"], function( key, val ) {
       if( val["nombre"]==$('#cespecificos').val()){
          
            $.each( val["subitems"], function( key2, val2 ) {
             if( val2["nombre"]==$('#subitems').val()){
                  eleccion= val2["codigo"];
             }
            });
       }
   });
   $("#codigo").text("Codigo: "+eleccion);
   $("#descripcion").text("Descripcion: "+$('#ccabecera').val()+" - "+$('#cespecificos').val()+" - "+$('#subitems').val());
  
 
  }
});

    //
});