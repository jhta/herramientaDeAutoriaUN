$(document).ready(function(){
    /*
     * *******************************************************************************
     * Crud general de respuestas y errores genuinos: crear, editar, eliminar, ver
     */


    //Variables globales que permiten el almacenamiento en memoria de las respuestas que va creando el cliente
    var respuestas = {};
    var idRespuesta=0;
    var respactual;
    var eqactuallyres = "";
    var eqActuallyIdRespuestaCorrecta = "";

    //Crear una nueva respuesta
    $("#crearRespuesta").click(function(){
        inRespuesta = true;
        respactual = new Respuesta();
        respactual.id= "respuesta-"+idRespuesta;
        respactual.nombre= $("#inputNuevaRespuesta").val();
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
            "<div id='content-"+respactual.id+"'></div>"+
            "<div class='btn-toolbar' role='toolbar' aria-label='...'>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' data-id='"+respactual.id+"' class='pre-equation-respuesta' data-tipo='correcta'>"+
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
        $("#content-"+respactual.id).html('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:gold; border:1px solid black;padding: 2px 4px;display:inline-block;"  data-id="'+respactual.id+'" id="mathjax-'+respactual.id+'"><math></math></div>');
        document.getElementById("mathjax-"+respactual.id).innerHTML = "<math><mn>2</mn><mo>+</mo><mn>5</mn></math>";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"mathjax-"+respactual.id]);

        guardar();

        eqActuallyIdRespuestaCorrecta = "";
        $('#content-drop-respuestas').html("");
        rebootTree2(); // reinicia el html, crea un treeactual nuevo
        respactual.html="";
        respactual.tree = treeActualRespuestas ;
        respuestas[respactual.id+""] = respactual;
        eqactuallyres = respactual.id;
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
            "<div id='content-"+error.id+"'></div>"+
            "<div class='pull-right'>"+
            "<div class='btn-toolbar' role='toolbar' aria-label='...'>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' data-id='"+error.id+"' class='pre-equation-respuesta' data-tipo='error' data-respuestaid='"+respactual.id+"'>"+
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

        $("#content-"+error.id).html('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:gold; border:1px solid black;padding: 2px 4px;display:inline-block;"  data-id="'+respactual.id+'" id="mathjax-'+error.id+'"><math></math></div>');
        document.getElementById("mathjax-"+error.id).innerHTML = "<math><mn>2</mn><mo>+</mo><mn>6</mn></math>";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"mathjax-"+error.id]);

        guardar();

        eqActuallyIdRespuestaCorrecta = respactual.id;
        $('#content-drop-respuestas').html("");
        rebootTree2(); // reinicia el html, crea un treeactual nuevo
        eqactuallyres = error.id;
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

    //Se pierde el foco del input editar respuesta
    $("#accordion2").on("blur","#inputEditRespuesta",function(){
        respactual = respuestas[$(this).data("id")+""];
        respactual.nombre= $(this).val();
        $(this).remove();
        $("#title-"+respactual.id).html(respactual.nombre);
        respuestas[respactual.id+""]= respactual;
    });


    /*
     * *******************************************************************************
     * Manipulación de las ecuaciones que se generan para las respuestas correctas y errores genuinos
     */

    (function () {
        var QUEUE = MathJax.Hub.queue;
        var math = null;
        window.UpdateMath = function (MathML) {
            QUEUE.Push(function () {
                math = MathJax.Hub.getAllJax(eqactuallyres)[0];
            });
            QUEUE.Push(["Text", math, MathML]);
        }
    })();

    $("#accordion2").on("click", ".pre-equation-respuesta", function () {
        inRespuesta = true;
         var id = $(this).data('id');
        var tipo = $(this).data('tipo');

        guardar();

        $('#content-drop-respuestas').html("");
        if (tipo.localeCompare("error") == 0) {
            console.log("Error genuino");
            console.log(respuestas);
            console.log(id);
            var respuestaid = $(this).data('respuestaid');
            eqActuallyIdRespuestaCorrecta =  respuestaid;
            var res = respuestas[respuestaid+""];
            $.each( res.error_genuino, function( index, value ) {
                if (typeof value != 'undefined')
                    if ((value.id).localeCompare(id) == 0) {
                        $('#content-drop-respuestas').html(value.html);
                        treeActualRespuestas = value.tree;
                    }
            });
        }else{
            console.log("Respuesta correcta");
            console.log(respuestas);
            console.log(id);
            eqActuallyIdRespuestaCorrecta = "";
            $('#content-drop-respuestas').html(respuestas[id+""].html);
            treeActualRespuestas = respuestas[id+""].tree;
        }
        eqactuallyres = id;



         var cont=0;
        $(".drop code,.drop div").each(function(index){
            if($(this).hasClass("ultimo-e")){
                cont++;
                $(this).droppable(funcDroppable);

            }else if($(this).hasClass("card2")){
                cont++;
                $(this).draggable({
                    appendTo: "body",
                    cursor: "move",
                    revert: "invalid"
                });
            }
        });
        if(cont==0)  $("#content-drop-respuestas").droppable(funcDroppableDrop);

    });

    function guardar(){
//------- guardar datos actuales
        if(!(eqactuallyres == "")){
            if(eqActuallyIdRespuestaCorrecta!=""){
                var res = respuestas[eqActuallyIdRespuestaCorrecta+""];
                $.each( res.error_genuino, function( index, value ) {
                    if (typeof value != 'undefined') {
                        if ((value.id).localeCompare(eqactuallyres) == 0) {
                            res.error_genuino[index].tree = treeActualRespuestas;
                            res.error_genuino[index].html = $('#content-drop-respuestas').html();
                        };
                    }
                });
            }else{
                var res = respuestas[eqactuallyres+""];
                res.tree = treeActualRespuestas;
                res.html = $('#content-drop-respuestas').html();
            }
        }
    }


    /*
     ***********************************************************************************
     * Objetos Respuesta y Error, y algunas funciones
     */

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

    //Se ejecuta cuando se crea una nueva pregunta
    function addNewRespuestaTree(){

    }
});