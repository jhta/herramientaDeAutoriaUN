$(document).ready(function(){
    console.log("sisas");
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
    
$(".card").draggable({
    appendTo: "body",
    cursor: "move",//como se ve el cursor cuando lo muevo
    helper: 'clone',//que pasa cuando lo muevo, se clona
    revert: "invalid"//no se puede devolver
});


//Elemento que contiene inicialmente los .card
$("#launchPad").droppable({
    tolerance: "intersect",//agarra desde que el elemento se intercepte
    accept: ".card", //acepta eestos elementos (los .class)
    activeClass: "ui-state-default",//clase cuando esta activo
    hoverClass: "ui-state-hover",//clase cuando se lo pongo encima
    drop: function(event, ui) {
        $("#launchPad").append($(ui.draggable));//evento para agregar, donde ui es elemento que agrege encima de launcpad
    }
});



// $(".stackDrop1").droppable({
//     tolerance: "intersect",
//     accept: ".card",
//     activeClass: "ui-state-default",
//     hoverClass: "ui-state-hover",
//     drop: function(event, ui) {        
//         $(this).append($(ui.draggable));
//     }
// });


// $(".drop").droppable({
//     tolerance: "intersect",
//     accept: ".card",
//     activeClass: "ui-state-default",
//     hoverClass: "drop-p",
//     drop: function(event, ui) {   
//         if ($(this).is(':empty')){
//             console.log($(this).attr('title') + $(ui.draggable).attr("id"));
//             $(this).append($(ui.draggable));
//             //$(this).droppable('disable');
//             //desabilito la opcion de drop
//             $(ui.draggable).find(".spa").addClass('drop2');
//             //encuentro el .spa y le agrego la clase drop2
//             $(ui.draggable).find(".spa").droppable('enable'); 
//             //habilito el drop para este .spa (lo rojito en las formulas)
//             console.log($(this).attr('class'));
//         }else{
//             console.log("estamos es chimbiando");
//         }    
//     }
// });
/*$(".spa").droppable({
    tolerance: "intersect",
    accept: ".card",
    activeClass: "drop-3",
    hoverClass: "drop-2",
    drop: function(event, ui) {   
        if($(this).is(":empty")){
       $(this).append($(ui.draggable));
        //$(this).droppable('disable');
        console.log($(this).attr('class'));
        }else{
            console.log("paila");
        }
    }
});


$(".stackDrop2").droppable({
    tolerance: "intersect",
    accept: ".card",
    activeClass: "ui-state-default",
    hoverClass: "ui-state-hover",
    drop: function(event, ui) {        
        $(this).append($(ui.draggable));
    }
});*/
    //
});