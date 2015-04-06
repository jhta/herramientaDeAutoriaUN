var eqactuallyres = "";
//Variables globales que permiten el almacenamiento en memoria de las respuestas que va creando el cliente
var respuestas = {};
var idRespuesta=0;
var RespuestaActual;
var eqActuallyIdRespuestaCorrecta = "";

var _newId = null;

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
                alert(xml.formulacion.expresion[i].texto)
                $("#eq").append(xml.formulacion.expresion[i].texto+" ");
            }
        }

        $('.panel-2').html(html[eqactually]);
        //Trigger para que la última expresión quede activa (cargado su html y sombreada de color activo)
        $("#"+eqactually).trigger( "click" );
        idEquation = conteq;
    }}

function getNewGlobalId() {
    _newId = _newId + 1;
    return _newId;
}

function setNewGlobalId(id) {
    _newId = id;
}

function getIdFromResponse( idResponse ) {
    console.log(idResponse);
    var sp = idResponse.split("-");
    var newId = parseInt(sp[sp.length -1 ])
    return newId;
}
//verifica si es u solo elemento o un array
function printErrorGenuino( eg, respuestaId ) {
    if( Array.isArray(eg) )
        eg.forEach(function(e) {
            printHtmlerror(e, respuestaId);
        });
    else printHtmlerror(eg, respuestaId);
}

//Carga todas las respuestas que posea la pregunta dinámicamente
function respuestaXmlToHtml(xmlRespuestas) {
    //Reiniciando variables
    respuestas= {};
    eqActuallyIdRespuestaCorrecta = "";
    eqactuallyres = "";
    console.debug("este es el xml",xmlRespuestas.respuesta);
    $("#accordion2").html("");
    $('#content-drop-respuestas').html("");
    var cont = 0;
    if(xmlRespuestas !== undefined)
        if(Array.isArray(xmlRespuestas.respuesta)) {
            console.log("is Array");
            xmlRespuestas.respuesta.forEach(function(respuesta) {
                respuestas[respuesta.id+""] = respuesta;
                setNewGlobalId(getIdFromResponse(respuesta.id));
                printHtmlrespuesta(respuesta.id, respuesta.nombre, respuesta.formula);
                if(respuesta.error_genuino !== undefined ) {
                    console.log(respuesta.error_genuino);
                    printErrorGenuino(respuesta.error_genuino, respuesta.id);
                } 
                    
            });
        } else {
            for( var res in xmlRespuestas) {
                var respuesta = xmlRespuestas[res];
                console.log(respuesta);
                respuestas[respuesta.id+""] = respuesta;
                setNewGlobalId(getIdFromResponse(respuesta.id));
                printHtmlrespuesta(respuesta.id, respuesta.nombre, respuesta.formula);
                if(respuesta.error_genuino !== undefined )
                    respuesta.error_genuino.forEach(function(eg) {
                        printHtmlerror(eg, respuesta.id);
                    });
            }    
        }
        
    //No se esto pa que putas???
    idRespuesta = getNewGlobalId();
}

//Funcion para imprimir la respuesta en el html
function printHtmlrespuesta(idRespuesta, nombre,treei){
    console.log("entro");
    Printer.htmlAnswer(idRespuesta, nombre,treei);
}

//funcion para iprimir el error en el html
function printHtmlerror(error,idRes){
   Printer.htmlError(error,idRes);
}

//funcion para checkear que e el caracter solo sea numero y/o operacion matematica
function checkChar( c ) {
    return ( ( c >= 58  ) || ( c <= 39 ) || ( c == 44 ));
}

//funcion para esconder el input de la formula de la respuesta
function hideInput( input, label ) {
    console.debug("hide", $(input));
    $(input).addClass("hide");
    $(label).removeClass("hide");
}

function EditFormInError( error, respuesta, state ) {
   var sp = error.split("-");
    var indexError = parseInt(sp[sp.length -1 ])
    console.log(respuestas[respuesta]);
    console.log(respuestas[respuesta].error_genuino[indexError]);
    if(respuestas[respuesta].error_genuino[indexError] == undefined)
        respuestas[respuesta].error_genuino[indexError+1].formula = state;
    else
        respuestas[respuesta].error_genuino[indexError].formula = state;
}

function EditFormInRes( respuesta, state ) {
    console.log(respuesta);
    console.log(respuestas);
    console.log(respuestas[respuesta]);
    if(respuestas[respuesta] == undefined ){
        console.log("es ndefined");
        respuestas["respuesta-"+respuesta].formula = state;
    }
    else{
        console.log("no es undefined");
        respuestas[respuesta].formula = state;
    }
}

function editRetroAlimentation( error, respuesta, state) {
    var sp = error.split("-");
    var indexError = parseInt(sp[sp.length -1 ])
    console.log(respuestas[respuesta].error_genuino[indexError]);
    respuestas[respuesta].error_genuino[indexError].retro_alimentacion = state;
}

function validateExpresion( expresion ) {
    var str= expresion.split("#");
    console.log(str);
    var newExpresion = str.map(function(item, index){
        return index % 2 == 0? item:1;
    });
    newExpresion = newExpresion.join().replace(/,/gi, "");
    console.log(newExpresion);
    return newExpresion;
}


function showExpresion( expresion ) {
    return expresion.split("#").join().replace(/,/gi, "");
}

$(document).ready(function(){
    /*
     * *******************************************************************************
     * Crud general de respuestas y errores genuinos: crear, editar, eliminar, ver
     */
    //Cuando se presione enter se debe guardar la funcion
    $(document).on("keypress",".input-res",function(event) {
        if(event.which == 13) {
            var state = "";
            var flag = false;
            try {
                var expresion = validateExpresion($(this).val());
                console.log(expresion);
                state = math.eval(expresion);
            } catch(err) {
                state = "error de formulacion";
                flag = true;
            }
            
            if(!flag) {
                if($(this).data("tipo")){
                    console.log("si tiene ipo", $(this).data("tipo"));
                    EditFormInRes( $(this).data("respuesta"), state);
                } else {
                    EditFormInError( $(this).data("error"),  $(this).data("respuesta"), state);
                }
               console.log($("#p-"+$(this).attr("id")));
               $("#p-"+$(this).attr("id")).text($(this).val());
               hideInput("#"+$(this).attr("id"),  "#p-"+$(this).attr("id") );
            }else {
                alert(state);
            }
            event.preventDefault();
        }else if( checkChar( event.which ) ){
            return false;
        }
    });

    $(document).on("keypress",".input-text",function(event) {
        if(event.which == 13) {
            console.log("el texto este");
            editRetroAlimentation($(this).data("error"),  $(this).data("respuesta"), $(this).val());
           $("#p-"+$(this).attr("id")).text($(this).val());
           hideInput("#"+$(this).attr("id"),  "#p-"+$(this).attr("id") );
            event.preventDefault();
        }
    });



    //Funcion para mostrar el input de las respuestas
    $("#accordion2").on("click", ".pre-equation-respuesta", function () {
        var id = $(this).data('id');
        var tipo = $(this).data('tipo');
        console.log("llavecita");
        $("#error-"+id).removeClass("hide");
        console.log(tipo);
        if(tipo == "correcta") {
            console.log("es correcta", id);
            console.log( $("#correct-"+id));
            $("#correct-"+id).removeClass("hide");
        }
    });

    $("#accordion2").on("click", ".retro-alimentacion", function () {
        var id = $(this).data('id');
        console.log("la A grandota");
        $("#text-"+id).removeClass("hide");
        
    });


    //Crea una respuesta
    $("#crearRespuesta").click(function(){
        inRespuesta = true;
        RespuestaActual = new Respuesta();
        var idNewRespuesta = getNewGlobalId();
        RespuestaActual.id = "respuesta-" + idNewRespuesta;
        RespuestaActual.nombre = $("#inputNuevaRespuesta").val();
        RespuestaActual.formula = "";
        Printer.createHtmlAnswer( idNewRespuesta, RespuestaActual );
        
        $("#inputNuevaRespuesta").val('');
        console.log(respuestas);
        
        ////??? que monda es esto????? 
        eqActuallyIdRespuestaCorrecta = "";
        $('#content-drop-respuestas').html("");
        respuestas[RespuestaActual.id+""] = RespuestaActual;
        console.log(respuestas);
        ///¿¿¿ Y esto????
        eqactuallyres = RespuestaActual.id;
    });

    //Agregar error genuino a una respuesta
    $("#accordion2").on("click",".addErrorGenuino", function() {
        inRespuesta = true;
        RespuestaActual = respuestas[$(this).data("id")+""];
        console.log(RespuestaActual)
        console.log(respuestas);
        var error = new Error();
        console.log("se supone que esto es un error", error);
        if(Array.isArray( RespuestaActual.error_genuino )) {
            error.id = RespuestaActual.id+ "-" + RespuestaActual.error_genuino.length;
            RespuestaActual.error_genuino.push(error);
            
        }else {
            error.id = RespuestaActual.id+ "-" + 0;
            var aux = RespuestaActual.error_genuino;
            RespuestaActual.error_genuino = [];
            RespuestaActual.error_genuino.push(aux);
            RespuestaActual.error_genuino.push(error);
        }

        respuestas[RespuestaActual.id+""] = RespuestaActual;
        if(!$("#"+$(this).data("id")).hasClass('in')) {
            $("#"+$(this).data("id")).addClass('in');
        }
        Printer.addErrorToAnswer( $(this).data("id"), error, RespuestaActual );
        
        eqActuallyIdRespuestaCorrecta = RespuestaActual.id;
        $('#content-drop-respuestas').html("");
        eqactuallyres = error.id;
    });

    //Eliminar el error genunio de su respectiva respuesta asociada
    $("#accordion2").on("click",".deleteErrorGenuino",function(){
        var ok = confirm("esta seguro que quiere eliminar esto?");
        if(ok) {
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
        }
        
    });

    //Elimina una respuesta tanto desde la vista html como del array
    // respuestas que aloja la información de todas las respuestas creadas por el cliente
    $("#accordion2").on("click",".deleteRespuesta",function() {
        var ok = confirm("esta seguro que quiere eliminar esto?");
        if(ok) {
            $("#"+$(this).data("id")).parent().remove();
            delete respuestas[$(this).data("id")+""];    
        }
        
    });

    //editar el nombre de la respuesta
    $("#accordion2").on("click",".editRespuesta",function() {
        var text = $("#title-"+$(this).data('id')).html();
        $("#title-"+$(this).data('id')).html("<input id='inputEditRespuesta' data-id='"+$(this).data('id')+"' type='text' value='"+text+"'>");
        $("#inputEditRespuesta").focus();
    });

    //Se pierde el foco del input editar respuesta
    $("#accordion2").on("blur","#inputEditRespuesta",function(){
        RespuestaActual = respuestas[$(this).data("id")+""];
        RespuestaActual.nombre= $(this).val();
        $(this).remove();
        $("#title-"+RespuestaActual.id).html(RespuestaActual.nombre);
        respuestas[RespuestaActual.id+""]= RespuestaActual;
    });

    /*
     ***********************************************************************************
     * Objetos Respuesta y Error, y algunas funciones
     */

    function Respuesta(){
        this.id = '';
        this.nombre = '';
        this.cifras_decimales = '';
        this.formula = '';
        this.error_genuino = [];
    }

    function Error(){
        this.id = '';
        this.nombre='Error genuino';
        this.cifras_decimales = '';
        this.formula = '';
        this.retro_alimentacion='';
    }

/*
     ***********************************************************************************
     * Funcion generadora del XML apartir de los datos obtenidos
     */
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
            xw.writeAttributeString( "formula", res.formula);
            var errores = res.error_genuino;
            if(res.error_genuino !== undefined ){
                if(Array.isArray( res.error_genuino )) {
                    res.error_genuino.forEach(function( error ) {
                        xw.writeStartElement('error_genuino');
                        xw.writeAttributeString( "id", error.id );
                        xw.writeAttributeString( "respuesta_id", error.id );
                        xw.writeAttributeString( "formula", error.formula );
                        xw.writeAttributeString( "cifras_decimales", "0.2" );
                        if(error.retro_alimentacion != undefined && error.retro_alimentacion != null)
                            xw.writeAttributeString( "retro_alimentacion", error.retro_alimentacion );
                        xw.writeEndElement();
                    });
                } else {
                   for(var e=0;e<errores.length;e++){
                       var egen= errores[e];
                       xw.writeStartElement('error_genuino');
                       xw.writeAttributeString( "id", egen.id );
                       xw.writeAttributeString( "respuesta_id", res.id );
                       xw.writeAttributeString( "formula", egen.formula );
                       xw.writeAttributeString( "cifras_decimales", "0.2" );
                       if(egen.retro_alimentacion != undefined && error.retro_alimentacion != null)
                            xw.writeAttributeString( "retro_alimentacion", egen.retro_alimentacion );
                       xw.writeEndElement();
                   } 
                }
            }
            
            xw.writeEndElement();
        }
        xw.writeEndElement();
        
        xw.writeEndElement();
        xw.writeEndDocument();


        var xml = xw.flush();
        console.debug("El puto html ressultante D: D:", xml);
        var xml_metadatos = getXmlMetadatos();

        $( "#loadeq").trigger( "guardarxml", [ xml,xml_metadatos ] );

    });

});