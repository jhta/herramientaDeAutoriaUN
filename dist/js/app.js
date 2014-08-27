$(document).ready(function(){
    $('#rootwizard').bootstrapWizard();
    $("#valor").rating();
    $("#valorA").rating();
    
    function limpiar(){
        $("#formEspecifica").fadeOut("fast");
        $("#formUniforme").fadeOut("fast");
        $("#formCategorica").fadeOut("fast");
    }
    $("#varEspecifica").click(function(){
        limpiar();
        console.log("var especifca");
        $("#formEspecifica").fadeIn();
    });
    
    $("#varUniforme").click(function(){
        limpiar();
        console.log("var uniforme");
        $("#formUniforme").fadeIn();
    });
    $("#varCategorica").click(function(){
        limpiar();
        console.log("var categorica");
        $("#formCategorica").fadeIn();
    });
    //
});