$(document).ready(function(){
    //Variables globales que permiten el almacenamiento en memoria de las respuestas que va creando el cliente
    var respuestas = {};
    var idRespuesta=0;
    var respactual;

    //Crear una nueva respuesta
    $("#crearRespuesta").click(function(){
        respactual = new Respuesta();
        respactual.id= "respuesta-"+idRespuesta;
        respactual.nombre= $("#inputNuevaRespuesta").val();
        respuestas[respactual.id+""] = respactual;

        $("#accordion2").append("<div class='panel panel-default'>"+
            "<div class='panel-heading' role='tab' >"+
            "<span class='panel-title'>"+
            "<a id='title-respuesta-"+idRespuesta+"' class='collapsed' data-toggle='collapse' data-parent='#accordion2' href='#respuesta-"+idRespuesta+"' aria-expanded='false' aria-controls='#respuesta-"+idRespuesta+"'>"+
            respactual.nombre+
            "</a>"+
            "</span>"+
            "<div class='pull-right'>"+
            "<div class='btn-toolbar' role='toolbar' aria-label='...'>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' class='editRespuesta' data-id='respuesta-"+idRespuesta+"'>"+
            "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>"+
            "</a>"+
            " </div>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' class='deleteRespuesta' data-id='respuesta-"+idRespuesta+"'>"+
            "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"+
            " </a>"+
            "</div>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<button  class='addErrorGenuino' data-id='respuesta-"+idRespuesta+"'>"+
            "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>"+
            "</button>"+
            "</div>"+
            "</div>"+
            " </div>"+
            "</div>"+
            "<div id='respuesta-"+idRespuesta+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>"+
            "<div class='panel-body'>"+
            "<ul class='list-group'>"+
            " <li class='list-group-item'>"+
            "<span class='glyphicon glyphicon-ok'></span>"+
            " <span>Respuesta correcta:</span>"+
            "<div class='pull-right'>"+
            "<div class='btn-toolbar' role='toolbar' aria-label='...'>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#'>"+
            "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>"+
            "</a>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</li>"+
            "</ul>"+
            "</div>"+
            "</div>"+
            "</div>");
        idRespuesta++;
        $("#inputNuevaRespuesta").val('');
    });

    //Agregar error genuino a una respuesta
    $("#accordion2").on("click",".addErrorGenuino",function(){
        respactual = respuestas[$(this).data("id")+""];
        var error = new Error();
        error.id=respactual.id+ "-" + respactual.error_genuino.length;
        respactual.error_genuino.push(error);
        respuestas[respactual.id+""] = respactual;

        if(!$("#"+$(this).data("id")).hasClass('in')){
            $("#"+$(this).data("id")).addClass('in');
        }
        $("#"+$(this).data("id")).find(".list-group").append(" <li class='list-group-item' id='"+error.id+"' data-respuestaid='"+respactual.id+"'>"+
            "<span class='glyphicon glyphicon-remove'></span>"+
            " <span>Error genuino:</span>"+
            "<div class='pull-right'>"+
            "<div class='btn-toolbar' role='toolbar' aria-label='...'>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' data-id='"+error.id+"'>"+
            "<span class='glyphicon glyphicon-wrench'   aria-hidden='true'></span>"+
            "</a>"+
            "</div>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' class='deleteErrorGenuino' data-id='"+error.id+"'  data-respuestaid='"+respactual.id+"'>"+
            "<span class='glyphicon glyphicon-remove'   aria-hidden='true'></span>"+
            " </a>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</li>");
    });

    //Eliminar el error genunio de su respectiva respuesta asociada
    $("#accordion2").on("click",".deleteErrorGenuino",function(){
        var $this = this;
        var res =  respuestas[$(this).data("respuestaid")+""];
        $("#"+$(this).data("id")).remove();

         $.each( res.error_genuino, function( index, value ) {
                 if (typeof value != 'undefined') {
                 if ((value.id).localeCompare($($this).data('id')) == 0) {
                     delete res.error_genuino[index]
                 }
                 ;
             }
         });

    });



        //Elimina una respuesta tanto desde la vista html como del array
    // respuestas que aloja la información de todas las respuestas creadas por el cliente
    $("#accordion2").on("click",".deleteRespuesta",function() {
        $("#"+$(this).data("id")).parent().remove();

        delete respuestas[$(this).data("id")+""];

    });

    //editar el nombre de la respuesta
    $("#accordion2").on("click",".editRespuesta",function() {
        var text = $("#title-"+$(this).data('id')).html();
        $("#title-"+$(this).data('id')).html("<input id='inputEditRespuesta' data-id='"+$(this).data('id')+"' type='text' value='"+text+"'>");
        $("#inputEditRespuesta").focus();
    });

    /*
     Se pierde el foco del input editar respuesta
     */
    $("#accordion2").on("blur","#inputEditRespuesta",function(){
        respactual = respuestas[$(this).data("id")+""];
        respactual.nombre= $(this).val();
        $(this).remove();
        $("#title-"+respactual.id).html(respactual.nombre);
        respuestas[respactual.id+""]= respactual;
    });


        function Respuesta(){
        this.id = '';
        this.nombre = '';
        this.cifras_decimales = '';
        this.formula = '';
        this.html = '';
        this.tree = '';
        this.error_genuino = [];
    }

    function Error(){
        this.id = '';
        this.name='Error genuino';
        this.cifras_decimales = '';
        this.formula = '';
        this.calificacion = '';
        this.html= '';
        this.tree = '';
        this.retroalimentacion='';
    }
});