$(document).ready(function(){
    /* Eventos javascript que se ejecutan con ciertas acciones
    en el formulario de los metadatos*/
    $('#ccabecera').on('change', function() {
  $("#cespecificos").empty();
  if(this.value=="Matemáticas"){
       $('#group-ccespecificos').show();
        $("#cespecificos").append($("<option>").attr("value", "Álgebra").text("Álgebra"));
        $("#cespecificos").append($("<option>").attr("value", "Análisis y análisis funcional").text("Análisis y análisis funcional"));
        $("#cespecificos").append($("<option>").attr("value", "Ciencia de los ordenadores ").text("Ciencia de los ordenadores "));
        $("#cespecificos").append($("<option>").attr("value", "Geometría").text("Geometría"));
        $("#cespecificos").append($("<option>").attr("value", "Teoría de números").text("Teoría de números"));
        $("#cespecificos").append($("<option>").attr("value", "Análisis numérico").text("Análisis numérico"));
        $("#cespecificos").append($("<option>").attr("value", "Investigación operativa").text("Investigación operativa"));
        $("#cespecificos").append($("<option>").attr("value", "Probabilidad").text("Probabilidad"));
        $("#cespecificos").append($("<option>").attr("value", "Estadística").text("Estadística"));
        $("#cespecificos").append($("<option>").attr("value", " Topología").text(" Topología"));
        $("#cespecificos").append($("<option>").attr("value", "Otras especialidades matemáticas").text("Otras especialidades matemáticas"));
  }
   else if(this.value=="Lógica"){
       $('#group-ccespecificos').show();
        $("#cespecificos").append($("<option>").attr("value", "Aplicaciones de la lógica").text("Aplicaciones de la lógica"));
        $("#cespecificos").append($("<option>").attr("value", " Lógica deductiva").text(" Lógica deductiva"));
        $("#cespecificos").append($("<option>").attr("value", "Lógica general").text("Lógica general"));
        $("#cespecificos").append($("<option>").attr("value", "Lógica inductiva").text("Lógica inductiva"));
        $("#cespecificos").append($("<option>").attr("value", "Metodología").text("Metodología"));
        $("#cespecificos").append($("<option>").attr("value", "Otras especialidades relativas a la lógica").text("Otras especialidades relativas a la lógica"));
  }
    
   if(this.value=="--"){
       $('#group-ccespecificos').hide();
       $('.mostrar').hide();
  }else{
       $('.mostrar').show();
        
  }
});

});