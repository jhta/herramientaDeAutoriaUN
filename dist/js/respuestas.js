var eqactuallyres = "";
//Variables globales que permiten el almacenamiento en memoria de las respuestas que va creando el cliente
var respuestas = {};
var idRespuesta=0;
var respactual;
var eqActuallyIdRespuestaCorrecta = "";

//Cargar toda la formulación
function formulacionXMLToHtml(xml){
    console.log(xml);
    //Reiniciando variables

    var conteq = -1;
    if (typeof xml.objetos !== 'undefined') {
        if (typeof xml.objetos.json !== 'undefined') {
            treeActivos = JSON.parse(decodeURIComponent(xml.objetos.json));
        }
        if (typeof xml.objetos.html !== 'undefined') {
            html = JSON.parse(decodeURIComponent(xml.objetos.html));

        }
    }

    if (typeof xml.formulacion !== 'undefined') {
        $("#eq").html('');
        equations = {};
        for (var i=0; i<  xml.formulacion.expresion.length;i++ ) {

            if(xml.formulacion.expresion[i].tipo.localeCompare("expresion")==0){
                var preid =xml.formulacion.expresion[i].texto;
                var idEq = xml.formulacion.expresion[i].texto.substring(9, xml.formulacion.expresion[i].texto.length);
                $("#eq").append('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:#ccc; border:1px solid #999; border-radius: 5px; padding: 2px 4px;display:inline-block;" class="pre-equation" id='+preid+'><math></math></div>');
                treeActual = treeActivos[idEq];

                var jsn = makeString(treeActual);

                document.getElementById(preid).innerHTML = "<math>" + jsn + "</math>";

                MathJax.Hub.Queue(["Typeset",MathJax.Hub,preid]);
                equations[preid] = idEq;

                eqactually = preid;
                conteq++;

            }else{
                $("#eq").append(xml.formulacion.expresion[i].texto+" ");
            }
        }

        $('.panel-2').html(html[eqactually]);
        //Trigger para que la última expresión quede activa (cargado su html y sombreada de color activo)
        $("#"+eqactually).trigger( "click" );
        idEquation = conteq;
    }
}

//Carga todas las respuestas que posea la pregunta dinámicamente
function respuestaXmlToHtml(xml){
    //Reiniciando variables
    respuestas= {};
    eqActuallyIdRespuestaCorrecta = "";
    eqactuallyres = "";
    console.log(xml);
    var xmlrespuesta = xml;
    $("#accordion2").html("");
    $('#content-drop-respuestas').html("");
    var cont = 0;
    for (var res in xmlrespuesta) {
        var obres = xmlrespuesta[res];
        var treei = new Tree();
        treei.tree = obres.tree;
        treei.id= obres.id;
        treei.cifras_decimales = obres.cifras_decimales;
        if(obres.error_genuino.length==0){
            treei.error_genuino = [];
        }else{
            treei.error_genuino = obres.error_genuino;
        }

        treei.formula = obres.formula;
        treei.html = obres.html;
        treei.nombre = obres.nombre;

        console.log(treei);
        console.log(treei.makeString());
        respuestas[obres.id+""] = treei;
        cont++;
        printHtmlrespuesta(obres.id, obres.nombre,treei);
        for(var i =0; i<treei.error_genuino.length;i++){
            printHtmlerror(treei.error_genuino[i],treei.id);
        }
    }
    idRespuesta = cont;
}


function printHtmlrespuesta(idRespuesta, nombre,treei){
    $("#accordion2").append("<div class='panel panel-default'>" +
        "<div class='panel-heading' role='tab' >" +
        "<span class='panel-title'>" +
        "<a id='title-" + idRespuesta + "' class='collapsed' data-toggle='collapse' data-parent='#accordion2' href='#" + idRespuesta + "' aria-expanded='false' aria-controls='#" + idRespuesta + "'>" +
        nombre +
        "</a>" +
        "</span>" +
        "<div class='pull-right'>" +
        "<div class='btn-toolbar' role='toolbar' aria-label='...'>" +
        "<div class='btn-group' role='group' aria-label='...'>" +
        "<a href='#' class='editRespuesta' data-id='" + idRespuesta + "'>" +
        "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>" +
        "</a>" +
        " </div>" +
        "<div class='btn-group' role='group' aria-label='...'>" +
        "<a href='#' class='deleteRespuesta' data-id='" + idRespuesta + "'>" +
        "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>" +
        " </a>" +
        "</div>" +
        "<div class='btn-group' role='group' aria-label='...'>" +
        "<a  class='addErrorGenuino' data-id='" + idRespuesta + "'>" +
        "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>" +
        "</a>" +
        "</div>" +
        "</div>" +
        " </div>" +
        "</div>" +
        "<div id='" + idRespuesta + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>" +
        "<div class='panel-body'>" +
        "<ul class='list-group'>" +
        " <li class='list-group-item'>" +
        "<span class='glyphicon glyphicon-ok'></span>" +
        " <span>Respuesta correcta:</span>" +
        "<div class='pull-right'>" +
        "<div id='content-" + idRespuesta + "'></div>" +
        "<div class='btn-toolbar' role='toolbar' aria-label='...'>" +
        "<div class='btn-group' role='group' aria-label='...'>" +
        "<a href='#' data-id='" + idRespuesta + "' class='pre-equation-respuesta' data-tipo='correcta'>" +
        "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>" +
        "</a>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>" +
        "</ul>" +
        "</div>" +
        "</div>" +
        "</div>");
    $("#content-" + idRespuesta).html('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:#ccc; border:1px solid #888;padding: 2px 4px;display:inline-block;"  data-id="'+idRespuesta+'" id="mathjax-'+idRespuesta+'"><math></math></div>');


    document.getElementById("mathjax-" + idRespuesta).innerHTML = "<math>"+treei.makeString()+"</math>";
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "mathjax-" + idRespuesta]);
}

    function printHtmlerror(error,idRes){
        $("#"+idRes).find(".list-group").append(" <li class='list-group-item' id='"+error.id+"' data-respuestaid='"+idRes+"'>"+
            "<span class='glyphicon glyphicon-remove'></span>"+
            " <span>Error genuino:</span>"+
            "<div class='pull-right col-xs-6' style='display:table;'>"+
            "<div id='content-"+error.id+"' style='display: table-cell' class='col-xs-8'></div>"+
            "<div class='btn-toolbar col-xs-2 col-xs-offset-1 pull-right' style='display: table-cell' role='toolbar' aria-label='...'>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' data-id='"+error.id+"' class='pre-equation-respuesta' data-tipo='error' data-respuestaid='"+idRes+"'>"+
            "<span class='glyphicon glyphicon-wrench'   aria-hidden='true'></span>"+
            "</a>"+
            "</div>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' class='deleteErrorGenuino' data-id='"+error.id+"'  data-respuestaid='"+idRes+"'>"+
            "<span class='glyphicon glyphicon-remove'   aria-hidden='true'></span>"+
            " </a>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</li>");

        $("#content-"+error.id).html('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:#ccc; border:1px solid #999; border-radius: 5px; padding: 2px 4px;display:inline-block;"  data-id="'+idRes+'" id="mathjax-'+error.id+'"><math></math></div>');
        document.getElementById("mathjax-"+error.id).innerHTML = "<math><mn>2</mn><mo>+</mo><mn>6</mn></math>";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"mathjax-"+error.id]);

    }


$(document).ready(function(){
    /*
     * *******************************************************************************
     * Crud general de respuestas y errores genuinos: crear, editar, eliminar, ver
     */

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
            "<a  class='addErrorGenuino' data-id='respuesta-"+idRespuesta+"'>"+
            "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>"+
            "</a>"+
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
            "<div class='pull-right col-xs-6' style='display: table;'>"+
            "<div id='content-"+respactual.id+"' class='col-xs-8' style='display: table-cell'></div>"+
            "<div class='btn-toolbar col-xs-2 pull-right' role='toolbar' aria-label='...'  style='display: table-cell' >"+
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
        $("#content-"+respactual.id).html('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:#ccc; border:1px solid #888;padding: 2px 4px;display:inline-block;"  data-id="'+respactual.id+'" id="mathjax-'+respactual.id+'"><math></math></div>');

        document.getElementById("mathjax-"+respactual.id).innerHTML = "<math><mn>2</mn><mo>+</mo><mn>5</mn></math>";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"mathjax-"+respactual.id]);

        guardar();

        eqActuallyIdRespuestaCorrecta = "";
        $('#content-drop-respuestas').html("");
        rebootTree(); // reinicia el html, crea un treeactual nuevo
        respactual.html="";
        respactual.tree = treeActual ;
        respuestas[respactual.id+""] = respactual;
        console.log(respuestas);
        eqactuallyres = respactual.id;
    });

    //Agregar error genuino a una respuesta
    $("#accordion2").on("click",".addErrorGenuino",function(){
        inRespuesta = true;
        respactual = respuestas[$(this).data("id")+""];
        var error = new Error();
        console.log(respactual);
        error.id=respactual.id+ "-" + respactual.error_genuino.length;
        respactual.error_genuino.push(error);
        respuestas[respactual.id+""] = respactual;

        if(!$("#"+$(this).data("id")).hasClass('in')){
            $("#"+$(this).data("id")).addClass('in');
        }
        $("#"+$(this).data("id")).find(".list-group").append(" <li class='list-group-item' id='"+error.id+"' data-respuestaid='"+respactual.id+"'>"+
            "<span class='glyphicon glyphicon-remove'></span>"+
            " <span>Error genuino:</span>"+
            "<div class='pull-right col-xs-6' style='display:table;'>"+
            "<div id='content-"+error.id+"' style='display: table-cell' class='col-xs-8'></div>"+
            "<div class='btn-toolbar col-xs-2 col-xs-offset-1 pull-right' style='display: table-cell' role='toolbar' aria-label='...'>"+
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

        $("#content-"+error.id).html('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:#ccc; border:1px solid #999; border-radius: 5px; padding: 2px 4px;display:inline-block;"  data-id="'+respactual.id+'" id="mathjax-'+error.id+'"><math></math></div>');
        document.getElementById("mathjax-"+error.id).innerHTML = "<math><mn>2</mn><mo>+</mo><mn>6</mn></math>";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,"mathjax-"+error.id]);

        guardar();

        eqActuallyIdRespuestaCorrecta = respactual.id;
        $('#content-drop-respuestas').html("");
        rebootTree(); // reinicia el html, crea un treeactual nuevo
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



    $("#accordion2").on("click", ".pre-equation-respuesta", function () {
        var id = $(this).data('id');
        var tipo = $(this).data('tipo');

        guardar();

        $('#content-drop-respuestas').html("");
        if (tipo.localeCompare("error") == 0) {

            var respuestaid = $(this).data('respuestaid');
            eqActuallyIdRespuestaCorrecta =  respuestaid;
            var res = respuestas[respuestaid+""];
            $.each( res.error_genuino, function( index, value ) {
                if (typeof value != 'undefined')
                    if ((value.id).localeCompare(id) == 0) {
                        $('#content-drop-respuestas').html(value.html);
                        treeActual = value.tree;
                    }
            });
        }else{

            eqActuallyIdRespuestaCorrecta = "";
            $('#content-drop-respuestas').html(respuestas[id+""].html);
            treeActual = respuestas[id+""].tree;
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
                            res.error_genuino[index].tree = treeActual;
                            res.error_genuino[index].html = $('#content-drop-respuestas').html();
                        };
                    }
                });
            }else{
                var res = respuestas[eqactuallyres+""];
                res.tree = treeActual;
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
        this.nombre='Error genuino';
        this.cifras_decimales = '';
        this.formula = '';
        this.calificacion = '';
        this.html= '';
        this.tree = '';
        this.retroalimentacion='';
    }

    $("#loadeq").click(function(){
        var resp = JSON.stringify(respuestas);

        var xw = new XMLWriter('UTF-8');
        xw.formatting = 'indented';//add indentation and newlines
        xw.indentChar = ' ';//indent with spaces
        xw.indentation = 2;//add 2 spaces per level
        xw.writeStartDocument();
        xw.writeStartElement('xml');

        xw.writeStartElement('variables');

        var variables = varToXML();
        xw.writeString(variables);
        xw.writeEndElement();




        /****************************************
         * XML de las ecuaciones
         */

        var array = [];
        var idEquations = [];
        var bools = [];

        //Esto se hace, porque no se tiene la certeza de que la última ecuacion
        // que se ha creado ya esten guardados sus datos en los json globables
        treeActivos[equations[eqactually]] = treeActual;
        html[eqactually+""] = $('.drop').html();
        var i=0;
        var objecto = $("#eq").html();
        $("#eq").children().each (function() {

            idEquations.push($(this).attr('id'));
            $(this).html("<123456789>");
        })
        var texto = $("#eq").text();

        while(texto.length>0){
            var n = texto.indexOf("<123456789>");
            if(n==-1){
                str = texto.replace(/\s+/g, '');
                if(str.length>0) {
                    array.push(texto);
                    bools.push(false);
                }
                texto="";
            }else{

                var res = texto.substring(0, n);
                str = res.replace(/\s+/g, '');
                if(str.length>0) {
                    array.push(res);
                    bools.push(false);
                }
                array.push(idEquations[i]);
                bools.push(true);
                i++;
                if( texto.substring(n+10, texto.length).length>1) {
                    texto = texto.substring(n + 11, texto.length);
                }else{
                    texto="";
                }
            }

        }

        $("#eq").html(objecto);
        $("#eq").children().each (function() {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub, $(this).attr('id')]);
        })

        xw.writeStartElement('pregunta');
        xw.writeStartElement('formulacion');
        for(var i=0;i<array.length;i++){
            if(bools[i]){
                xw.writeStartElement('expresion');
                xw.writeAttributeString( "tipo", "expresion" );
                xw.writeAttributeString( "texto", array[i] );
                xw.writeEndElement();
            }else{
                xw.writeStartElement('expresion');
                xw.writeAttributeString( "tipo", "texto" );
                xw.writeAttributeString( "texto", array[i] );
                xw.writeEndElement();
            }
        }

        xw.writeEndElement();
        xw.writeStartElement('objetos');
        xw.writeElementString('json',  encodeURIComponent(JSON.stringify(treeActivos)));

        xw.writeElementString('html', encodeURIComponent(JSON.stringify(html)));
        xw.writeEndElement();
        xw.writeEndElement();

        /***************************************************
         * XML de las respuestas
         */

        var resp = JSON.stringify(respuestas);
        var x2js = new X2JS();
        var resp = x2js.json2xml_str(respuestas);

        xw.writeStartElement('respuestas');

        for(var element in respuestas)
        {
            var res = respuestas[element];
            console.log(res);
            console.log(respuestas[element]);
            xw.writeStartElement('respuesta');
            xw.writeAttributeString( "nombre", res.nombre );
            xw.writeAttributeString( "id", res.id);
            xw.writeAttributeString( "cifras_decimales", "0.2" );
            xw.writeAttributeString( "formula", "" );
            var errores = res.error_genuino;
            for(var e=0;e<errores.length;e++){
                var egen= errores[e];
                xw.writeStartElement('error_genuino');
                xw.writeAttributeString( "id", egen.id );
                xw.writeAttributeString( "formula", egen.nombre );
                xw.writeAttributeString( "cifras_decimales", "0.2" );
                xw.writeAttributeString( "calificacion", "0" );
                xw.writeAttributeString( "retroalimentacion", "Error" );
                xw.writeEndElement();
            }
            xw.writeEndElement();
        }
        xw.writeEndElement();
        xw.writeStartElement('objetos_respuestas');
        xw.writeString(resp);
        xw.writeEndElement();

        xw.writeEndElement();
        xw.writeEndDocument();


        var xml = xw.flush();
        console.log(xw.flush());
        //Este evento que llama el trigger se encuentra en restfulleditor.js al final
        $( "#loadeq").trigger( "guardarxml", [ xml ] );
    });




});