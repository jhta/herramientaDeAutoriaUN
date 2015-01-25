$(document).ready(function(){
    if(sessionStorage.getItem('id')) {
        $("#nameUser").html(sessionStorage.getItem('name'));
        var client = new $.RestClient('http://localhost:4000/api/');
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

                $("#accordion").prepend("<div class='panel panel-default'>" +
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
                        "<input type='text' placeholder='Nombre de la pregunta-> ejemplo: Casos de factorización'class='form-control'>" +
                        "</div>" + <!-- /input-group -->
                        "</li>" +
                        "</ul>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                );
                var idFolder = val._id;

                client.question.read("all/"+val._id).done(function (data) {
                    jQuery.each( data.Folder.questions, function( i, val ) {
                        $("#body-" + idFolder).find("ul").append(" <li id='"+ val._id+"'class='list-group-item'>" +
                            "<span data-title='"+ val.titulo +"'>" + val.titulo + "</span>" +
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

                            "<div class='btn-group' role='group' aria-label='...'>" +
                            "<a href='#' class='LoadQuestion' data-id="+ val._id+">" +
                            "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>" +
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

        /*
        Agregar una nueva carpeta
        */

        $("#basic-addon1").click(function(){
            var $this = this;
            client.folder.create({name:$(this).next().val(),userid:sessionStorage.getItem('id')}).done(function (data) {
                $($this).next().val('');
                var val = data;
                $("#accordion").prepend("<div class='panel panel-default'>" +
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
                        "<input type='text' placeholder='Nombre de la pregunta-> ejemplo: Casos de factorización'class='form-control'>" +
                        "</div>" + <!-- /input-group -->
                        "</li>" +
                        "</ul>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                );

            }).fail(function () {
                alert("Error, inténtalo de nuevo");
            });
        });

        /*
        Eliminar una carpeta de un usuario
         */
        $("#accordion").on("click",".deleteFolder",function(){
            var $this= this;
            client.folder.del($(this).data('id')).done(function (data) {
                $("#header-"+$($this).data('id')).parent().remove();
            }).fail(function () {
                alert("Error, inténtalo de nuevo");
            });
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
            var $this = this;
            client.question.create({folderid:$(this).data('id'),titulo:$(this).parent().next().val(),xml_pregunta:'',xml_metadatos:''}).done(function (val) {
                $($this).parent().next().val('');
                $("#body-" + $($this).data('id')).find("ul").append(" <li id='"+ val._id+"'class='list-group-item'>" +
                    "<span data-title='"+ val.titulo +"'>" + val.titulo + "</span>" +
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
                    "<div class='btn-group' role='group' aria-label='...'>" +
                    "<a href='#' class='LoadQuestion' data-id="+ val._id+">" +
                    "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>" +
                    "</a>" +
                    "</div>" +
                    "</div>" +
                    " </div>" +
                    " </li>");
            }).fail(function () {
                alert("Error, inténtalo de nuevo");
            });

            });

        /*
        Eliminar una pregunta de una carpeta
         */

        $("#accordion").on("click",".deleteQuestion",function(){
            var $this= this;
            client.question.del($(this).data('id')).done(function (data) {
                $("#"+$($this).data('id')).remove();
            }).fail(function () {
                alert("Error, inténtalo de nuevo");
            });
        });

        /*
         Actualizar una pregunta
         */
        $("#accordion").on("click",".editQuestion",function(){
            var title =  $("#"+$(this).data('id')+" span:first-child");
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
                var title =  $("#"+$($this).data('id')+" span:nth-child(2)");
                title.data('title',$($this).val());
                title.text($($this).val());
                $($this).remove();
            }).fail(function () {
                var title =  $("#"+$($this).data('id')+" span:nth-child(2)");
                title.text( title.data('title'));
                $($this).remove();
                alert("Error, inténtalo de nuevo");
            });

        });


        }else{
        $(location).attr('href','login.html');
    }
});