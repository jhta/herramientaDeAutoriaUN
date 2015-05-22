var client = new $.RestClient('http://104.236.247.200:4000/api/');

function createFolder(that) {
    var $this = that;
            client.folder.create({name:$("#create-folder").val(),userid:sessionStorage.getItem('id')}).done(function (data) {
                $("#create-folder").val('');
                var val = data;
                $("#accordion").append("<div class='panel panel-default'>" +
                        "<div class='panel-heading' role='tab' id='header-"+val._id+"'>" +
                        "<span class='panel-title' data-title='"+val.name+"'>" +
                        "<a data-toggle='collapse' data-parent='#accordion' href='#body-"+val._id+"' aria-expanded='true' aria-controls='body-"+val._id+"'>" +
                        "<span class='glyphicon glyphicon-folder-open'></span>" +
                        "  "+val.name+
                        "</a>" +
                        "</span>" +
                        "<div class='pull-right'>" +
                        "<div class='btn-toolbar' role='toolbar' aria-label='...'>" +
                        "<div class='btn-group' role='group' aria-label='...'>" +
                        "<a href='#' class='editFolder' data-id='"+val._id+"'>" +
                        "<span class='glyphicon glyphicon-pencil'  aria-hidden='true'></span>" +
                        "</a>" +
                        "</div>" +
                        "<div class='btn-group' role='group' aria-label='...'>" +
                        "<a href='#' class='deleteFolder' data-id='"+val._id+"'>" +
                        "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>" +
                        "</a>" +
                        "</div>" +

                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div id='body-"+val._id+"' class='panel-collapse collapse ' role='tabpanel' aria-labelledby='headingOne'>" +
                        "<div class='panel-body'>" +
                        "<ul class='list-group'>" +
                        "<li class='list-group-item'>" +
                        "<div class='input-group'>" +
                        "<span class='input-group-btn'>" +
                        "<button class='btn btn-default addQuestion' type='button' data-id='"+val._id+"'> " +
                        "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>" +
                        "</button>" +
                        "</span>" +
                        "<input type='text' class='add-question' data-id='"+ val._id +"' placeholder='Nombre de la pregunta-> ejemplo: Casos de factorización'class='form-control inputAddQuestion'>" +
                        "</div>" + "<!-- /input-group -->"+
                        "</li>" +
                        "</ul>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                );

            }).fail(function () {
                alert("Error, inténtalo de nuevo");
            });
}

$(document).ready(function(){
    var folderactual,
        questionactual,
        stringXmlFormulacion,
        stringXmlMetadatos,
        unloadactive=true,
        messagesaved = true;

    if(sessionStorage.getItem('id')) {
        $("#nameUser").html(sessionStorage.getItem('name'));
        client.add('user');
        client.add('folder');
        client.add('question');
        client.question.add('all');

        /*
        Cargar las carpetas y las preguntas que posee cada carpeta
         */
        client.folder.read(sessionStorage.getItem('id')).done(function (data) {
            console.log(data);
            jQuery.each( data.User.folders, function( i, val ) {
                console.log(val);

                $("#accordion").append("<div class='panel panel-default'>" +
                        "<div class='panel-heading' role='tab' id='header-"+val._id+"'>" +
                        "<span class='panel-title'  data-title='"+val.name+"'>" +
                        "<a data-toggle='collapse' data-parent='#accordion' href='#body-"+val._id+"' aria-expanded='true' aria-controls='body-"+val._id+"'>" +
                        "<span class='glyphicon glyphicon-folder-open'></span>" +
                        "  "+val.name+
                        "</a>" +
                        "</span>" +
                        "<div class='pull-right'>" +
                        "<div class='btn-toolbar' role='toolbar' aria-label='...'>" +
                        "<div class='btn-group' role='group' aria-label='...'>" +
                        "<a href='#' class='editFolder' data-id='"+val._id+"'>" +
                        "<span class='glyphicon glyphicon-pencil'  aria-hidden='true'></span>" +
                        "</a>" +
                        "</div>" +
                        "<div class='btn-group' role='group' aria-label='...'>" +
                        "<a href='#' class='deleteFolder' data-id='"+val._id+"'>" +
                        "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>" +
                        "</a>" +
                        "</div>" +

                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div id='body-"+val._id+"' class='panel-collapse collapse ' role='tabpanel' aria-labelledby='headingOne'>" +
                        "<div class='panel-body'>" +
                        "<ul class='list-group'>" +
                        "<li class='list-group-item'>" +
                        "<div class='input-group'>" +
                        "<span class='input-group-btn'>" +
                        "<button class='btn btn-default addQuestion' type='button' data-id='"+val._id+"'>" +
                        "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>" +
                        "</button>" +
                        "</span>" +
                        "<input type='text' placeholder='Nombre de la pregunta-> ejemplo: Casos de factorización'class='form-control inputAddQuestion'>" +
                        "</div>" + <!-- /input-group -->
                        "</li>" +
                        "</ul>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                );
                var idFolder = val._id;
                var nameFolder = val.name;
                client.question.read("all/"+val._id).done(function (data) {
                    jQuery.each( data.Folder.questions, function( i, val ) {
                        $("#body-" + idFolder).find("ul").append(" <li id='"+ val._id+"' data-name='" + nameFolder + "' class='list-group-item'>" +
                            "<a href='#' class='LoadQuestion' data-name='"+ nameFolder +"' data-id="+ val._id+" data-title='"+ val.titulo +"'>" + val.titulo + "</a>" +
                            "<div class='pull-right'>" +
                            " <div class='btn-toolbar' role='toolbar' aria-label='...'>" +

                            "<div class='btn-group' role='group' aria-label='...'>" +
                            "<a href='#' class='editQuestion' data-id='"+ val._id+"'>" +
                            "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>" +
                            "</a>" +
                            "</div>" +
                            "<div class='btn-group' role='group' aria-label='...'>" +
                            "<a href='#' class='deleteQuestion' data-id="+ val._id+">" +
                            "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>" +
                            "</a>" +
                            "</div>" +
                            "</div>" +
                            " </div>" +
                            " </li>");
                    });
                });
                });
        }).fail(function () {
            alert("Error, inténtalo de nuevo");
        });

        $("#logout").click(function(){
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('name');
            $(location).attr('href','login.html');
        });

        /*
        Agregar una nueva carpeta
        */
        //Dando click en el boton
        $("#basic-addon1").click(function(){
            createFolder(this);
        });
        //Con enter
        $("#create-folder").keyup(function(event){
            if(event.keyCode == 13){
                createFolder(this);
            }
        });

        /*
        Eliminar una carpeta de un usuario
         */
        $("#accordion").on("click",".deleteFolder",function(){
            var ok = confirm("esta seguro que quiere borrar esta carpeta?");
            if(ok) {
                var $this= this;
                client.folder.del($(this).data('id')).done(function (data) {
                    $("#header-"+$($this).data('id')).parent().remove();
                }).fail(function () {
                    alert("Error, inténtalo de nuevo");
                });
            }

        });

        /*
        Actuliazar una carpeta
         */
        $("#accordion").on("click",".editFolder",function(){
            var title =  $("#header-"+$(this).data('id')).find(".panel-title");
            title.children().hide();
            title.append("<input id='inputEditFolder' data-id='"+$(this).data('id')+"' type='text' value='"+title.data('title')+"'>");
            $("#inputEditFolder").focus();
        });

        /*
         Se pierde el foco del input editar carpeta
         */

        $("#accordion").on("blur","#inputEditFolder",function(){
            var $this= this;
            client.folder.update($(this).data('id'),{name:$(this).val()}).done(function (data) {
                $("#header-"+$($this).data('id')).find(".panel-title").data('title',$($this).val());
                $($this).parent().children().html("<span class='glyphicon glyphicon-folder-open'></span>" +
                "  "+$($this).val()+
                "</a>");
                $($this).parent().children().show();
                $($this).remove();


            }).fail(function () {
                $($this).parent().children().show();
                $($this).remove();
                alert("Error, inténtalo de nuevo");
            });

        });

        /*
         Agregar una nueva pregunta a una carpeta
         */

        $("#accordion").on("click",".addQuestion",function(){
            addQuestion(this)
        });

        $("#accordion").on("keyup",".inputAddQuestion",function(){
            if(event.keyCode == 13) {
                $(this).parent().find(".addQuestion").trigger("click");
            }
        });


        function addQuestion($this){
            if($($this).parent().next().val()) {
                client.question.create({
                    folderid: $($this).data('id'),
                    titulo: $($this).parent().next().val(),
                    xml_pregunta: '',
                    xml_metados: ''
                }).done(function (val) {
                    $($this).parent().next().val('');
                    $("#body-" + $($this).data('id')).find("ul").append(" <li id='" + val._id + "'class='list-group-item'>" +
                    "<a href='#' class='LoadQuestion' data-id=" + val._id + " data-title='" + val.titulo + "'>" + val.titulo + "</a>" +
                    "<div class='pull-right'>" +
                    " <div class='btn-toolbar' role='toolbar' aria-label='...'>" +
                    "<div class='btn-group' role='group' aria-label='...'>" +
                    "<a href='#' class='editQuestion' data-id='" + val._id + "'>" +
                    "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>" +
                    "</a>" +
                    "</div>" +
                    "<div class='btn-group' role='group' aria-label='...'>" +
                    "<a href='#' class='deleteQuestion' data-id=" + val._id + ">" +
                    "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>" +
                    "</a>" +
                    "</div>" +
                    "</div>" +
                    " </div>" +
                    " </li>");

                    $("#accordion").find("#" + val._id).find(".LoadQuestion").trigger("click");

                }).fail(function () {
                    alert("Error, inténtalo de nuevo");
                });
            }
        }

        /*
        Eliminar una pregunta de una carpeta
         */

        $("#accordion").on("click",".deleteQuestion",function(){
            var ok = confirm("esta seguro que quiere borrar esta pregunta?");
            if(ok) {
                var $this= this;
                client.question.del($(this).data('id')).done(function (data) {
                    $("#"+$($this).data('id')).remove();
                }).fail(function () {
                    alert("Error, inténtalo de nuevo");
                });
            }
        });

        /*
         Actualizar una pregunta
         */
        $("#accordion").on("click",".editQuestion",function(){
            var title =  $("#"+$(this).data('id')+" a:first-child");
            title.text("");
            $("#"+$(this).data('id')).prepend("<input id='inputEditQuestion' data-id='"+$(this).data('id')+"' type='text' value='"+title.data('title')+"'>");
            $("#inputEditQuestion").focus();
        });

        /*
         Se pierde el foco del input editar pregunta
         */

        $("#accordion").on("blur","#inputEditQuestion",function(){
            var $this= this;

            client.question.update($(this).data('id'),{titulo:$(this).val()}).done(function (data) {
                var title =  $("#"+$($this).data('id')+" a:nth-child(2)");
                title.data('title',$($this).val());
                title.text($($this).val());
                $($this).remove();
            }).fail(function () {
                var title =  $("#"+$($this).data('id')+" a:nth-child(2)");
                title.text( title.data('title'));
                $($this).remove();
                alert("Error, inténtalo de nuevo");
            });
        });

        $("#previewer").on( "click", function( event) {
            messagesaved = false;
            $.when($( "#loadeq").trigger( "click" )).then(function(event) {
                var clientScorm = new $.RestClient('http://104.236.247.200/api/');
                clientScorm.add('scorm');
                clientScorm.scorm.create({question:stringXmlFormulacion,metadatos:stringXmlMetadatos}).done(function(){
                    $("#iframe-preview").attr("src","http://104.236.247.200/gen-scorm1.2-api/scorm-template/launch.html");
                    $('#modal-previewer').modal('show');
                }).fail(function () {
                    $("#iframe-preview").attr("src","http://104.236.247.200/gen-scorm1.2-api/scorm-template/launch.html");
                    $('#modal-previewer').modal('show');
                });
            });
        });

        function comeBack(){
            //Clean all vars, arrays, others.
            $("#carpetas").fadeIn();
            $("#rootWizard").fadeOut();
            $("#titulo-pregunta-actual").html("");
            $("#listVars").html("");
            $("#eq").html("");
            $(".panel-2").html("");
            varn = null;
            hashVariables = [];
            arrayValues = [];
            jsonValues = {};
            conjuntoVariables = [];
            eqActuallyIdRespuestaCorrecta = null;
            idEquation = -1;
            $('#content-drop-respuestas').html("");
            $('#accordion2').html("");
            respuestas = {};
            eqactuallyres = null;
            RespuestaActual = null;

        }
        //Boton volver
        $("#btnVolver").on("click", function(){
            comeBack();
        });

        $("#title-ticademia").on("click", function(){
            comeBack();
        })

        /*
         Cargar toda la información de una pregunta(xml de la pregunta)
         */
        $("#accordion").on("click",".LoadQuestion",function(){
            $("#carpetas").fadeOut();
            $("#rootWizard").fadeIn();

            questionactual =  $("#accordion").find("#"+$(this).data('id'));
            folderactual = questionactual.parent().parent().parent().parent().find(":first");
            var id =questionactual.attr('id');
            client.question.read(id).done(function (data) {
                //input de los metadatos
                if(questionactual.data('name'))
                    $("#titulo-pregunta-actual").html(questionactual.data('name')+" | "+data.titulo);
                else
                    $("#titulo-pregunta-actual").html(data.titulo);
                //Filling metadata
                $("#titulo").val(data.titulo);
                $("#autor").val($("#nameUser").html());
                xmlToObjects(data)
            }).fail(function () {
                alert("Error, inténtalo de nuevo");
            });

        });

        //Envía la petición al backend para guardar el string xml de la pregunta que actualmente se encuentre editando
        $("#loadeq").on( "guardarxml", function( event, xml,xml_metadatos) {
            if(typeof questionactual !== 'undefined'){
                var id =questionactual.attr('id');
                var $this= this;

                stringXmlFormulacion = xml;
                stringXmlMetadatos = xml_metadatos;

                client.question.update(id,{xml_pregunta:xml,xml_metados:xml_metadatos}).done(function (data) {
                    if(messagesaved) {
                        alert("Datos cargados correctamente");
                        uploadFiles();
                    }else {
                        messagesaved = true;
                    }
                }).fail(function () {
                    alert("Error, inténtalo de nuevo");
                });

            }else{
                alert("Debes seleccionar primero una pregunta para poder guardar los datos");
            }
        });

        $("#exportscorm").on( "click", function( event) {
            unloadactive = false;
            messagesaved = false;
            $.when($( "#loadeq").trigger( "click" )).then(function(event) {
                var clientScorm = new $.RestClient('http://104.236.247.200:4000/api/');
                clientScorm.add('scorm');
                clientScorm.scorm.create({question:stringXmlFormulacion,metadatos:stringXmlMetadatos}).done(function(){
                    window.location = 'http://104.236.247.200:4000/api/scorm/download';
                }).fail(function () {
                    window.location = 'http://104.236.247.200:4000/api/scorm/download';
                });
            });
        });

        //Transforma el string xml en objetos javascript y carga html correspondientes
        function xmlToObjects(xml) {
            var xmlDoc = xml.xml_metados,
                json = $.xml2json(xmlDoc);

            if (typeof json !== 'undefined')
                metadatosXmlToHtml(json);

            xmlDoc = xml.xml_pregunta;
            json = $.xml2json(xmlDoc);
            if (typeof json !== 'undefined') {
                if (typeof json.respuestas !== 'undefined')
                    respuestaXmlToHtml(json.respuestas);
                if (typeof json.variables !== 'undefined') {
                    console.log(xml);
                    console.log("xml");
                    console.log(json);
                    XMLToVar(xml.xml_pregunta);
                }
                if (typeof json.pregunta !== 'undefined')
                    formulacionXMLToHtml(json.pregunta);
                else
                    cleanFormulationVars();
            }
        }

        $(window).on("beforeunload", function() {
            if (unloadactive)
                return "Guardaste tus datos antes de salir ? , si no es así guarda tus cambios";
            else
                unloadactive = true;
        })

        }else{
        $(location).attr('href','login.html');
    }
});
