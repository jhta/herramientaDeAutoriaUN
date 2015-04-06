

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

    file_json=json;
    $.each(file_json, function( key, val ) {
        $("#ccabecera").append($("<option>").attr("value", key).text(key));

    });;
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

                $.each(file_json[this.value]["especificos"], function (key, val) {
                    $("#cespecificos").append($("<option>").attr("value", val["nombre"]).text(val["nombre"]));

                });

                $('.mostrar').show();
                eleccion = file_json[this.value]["codigo"];
                $("#codigo").text("Codigo: " + eleccion);
                $("#descripcion").text("Descripcion: " + this.value);

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

                $.each(file_json[$('#ccabecera').val()]["especificos"], function (key, val) {
                    if (val["nombre"] == $('#cespecificos').val()) {
                        eleccion = val["codigo"];
                        $.each(val["subitems"], function (key2, val2) {

                            $("#subitems").append($("<option>").attr("value", val2["nombre"]).text(val2["nombre"]));
                        });
                    }

                });

                $("#codigo").text("Codigo: " + eleccion);
                $("#descripcion").text("Descripcion: " + $('#ccabecera').val() + " - " + $('#cespecificos').val());

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
});

function getXmlMetadatos(){

    var xw = new XMLWriter('UTF-8');
    xw.formatting = 'indented';//add indentation and newlines
    xw.indentChar = ' ';//indent with spaces
    xw.indentation = 2;//add 2 spaces per level
    xw.writeStartDocument();
    xw.writeStartElement('xml');

    xw.writeElementString('title', $("#titulo").val());
    xw.writeElementString('language', $("#lenguaje").val() || "");

    xw.writeElementString('description', $("#meta-descripcion").val() || "");
    xw.writeElementString('keyword', $("#keyword").val() || "");

    var newdate;

    if(!$("#fecha").val()){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
        if(month/ 10 < 1) month = "0"+month;
        var day = dateObj.getUTCDate();
        if(day/ 10 < 1) day = "0"+day;

    var year = dateObj.getUTCFullYear();
    newdate = year + "-" + month + "-" + day ;
    }

    xw.writeElementString('date', $("#fecha").val() || newdate);

    xw.writeElementString('autor', $("#autor").val());
    xw.writeElementString('format', 'SCORM1.2');
    xw.writeElementString('resource', 'exercise');
    xw.writeElementString('context', $("#contexto").val() || "");

    xw.writeElementString('cost', 'No');
    xw.writeElementString('copyright', 'CC BY-NC-ND 4.0');
    xw.writeElementString('classification','UNESCO');

    if($("#codigo").text()) {

        xw.writeElementString('code', $("#codigo").text());
        xw.writeElementString('description-classification', $("#descripcion").text());
        xw.writeElementString('ccabecera', $("#ccabecera").val() );
        xw.writeElementString('cespecificos', $("#cespecificos").val());
        xw.writeElementString('subitems', $("#subitems").val());
    }

    xw.writeEndElement();
    xw.writeEndDocument();

    var xml = xw.flush();
    return xml;
}

function metadatosXmlToHtml(json){
    $("#lenguaje").val(json.language);
    $("#meta-descripcion").val(json.description);
    $("#keyword").val(json.keyword);
    $("#fecha").val(json.date);
    console.log("Mira esta fechaaaaaa");
    console.log(json.date);
    $("#contexto").val(json.context);
    $("#autor").val(json.autor || $("#autor").val() );

    if(json.cccabecera && json.cccabecera!=="--"){
        $("#codigo").text(json.code);
        $("#descripcion").text(json.description_classification);
        $("#ccabecera").val(json.ccabecera);
        $( "#ccabecera" ).trigger( "change" );

        if(json.cespecificos && json.cespecificos!=="--"){
            $("#cespecificos").val(json.cespecificos);
            $('#cespecificos').trigger( "change" );

            if(json.subitems && json.subitems!=="--"){
                alert(json.subitems);
                $('#subitems').trigger( "change" );
                $("#subitems").val(json.subitems);
            }
        }
    }
}