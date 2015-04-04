var varn,
    hashVariables = [],
    arrayValues = [],
    jsonValues = {};
var TOGGLE_TAB_RES = false;
var focusComponentId = null;
var focusElement = null;

var conjuntoVariables = [];
$(document).ready(function(){

    //toogle nav superior
    $("#tab-respuestas").click(function(){
        $("#panelOtros").toggleClass("hide");
        $("#panelSimbolos").toggleClass("hide");
        $("#panelAritmetica").toggleClass("hide");
        $("#panelTrigonometrica").toggleClass("hide");
        $("#panelParaRespuesta").toggleClass("hide");
        TOGGLE_TAB_RES = true;
    });

    //toogle nav superior
    $("#tab-formulacion").click(function(){
        TOGGLE_TAB_RES = false;
        $("#panelOtros").removeClass("hide");
        $("#panelSimbolos").removeClass("hide");
        $("#panelAritmetica").removeClass("hide");
        $("#panelTrigonometrica").removeClass("hide");
        $("#panelParaRespuesta").removeClass("hide");
    })

    //toogle nav superior
    $("#tab-metadatos").click(function(){
        TOGGLE_TAB_RES = false;
        $("#panelOtros").removeClass("hide");
        $("#panelSimbolos").removeClass("hide");
        $("#panelAritmetica").removeClass("hide");
        $("#panelTrigonometrica").removeClass("hide");
        $("#panelParaRespuesta").removeClass("hide");
    })
    $('#rootwizard').bootstrapWizard();
    $("#valor").rating();
    $("#valorA").rating();

    //hace foco en un input, para que lo que se escriba se asigne ahi
    $("body").on("focus",".input-res", function(){
        console.log("fsfa");
        console.log($(this).attr("id"));
        console.log($(this).val());
        focusElement = $(this);
    });
     
    //inserta el contenido de la expresion con clase card, en el caret 
    //la evaluacion de la formulacion de este esta en el archivo respuestas
    $("body").on("click", ".card", function(){
        if(TOGGLE_TAB_RES) {
            if($(this).data("id") == "var") {
                 var caret = focusElement.caret();
                console.log("el caret es ",focusElement.caret());
                focusElement.val(focusElement.val()).caret(caret).caret("#"+$(this).data('content')+"#").val();
            }else {
                var caret = focusElement.caret();
                console.log("el caret es ",focusElement.caret());
                focusElement.val(focusElement.val()).caret(caret).caret($(this).data('code')).val();
            }
            
        }
    });

    $("#varEspecifica").click(function(){
        limpiar();
        $("#formEspecifica").fadeIn();
    });
    $("#varDiscreta").click(function(){
        limpiar();
        $("#formDiscreta").fadeIn();
    });
    $("#varCategorica").click(function(){
        limpiar();
        $("#formCategorica").fadeIn();
    });
    $("#varNormal").click(function(){
        limpiar();
        $("#formNormal").fadeIn();
    });
    $("#varUniforme").click(function(){
        limpiar();
        $("#formUniforme").fadeIn();
    });
    $("#varExponencial").click(function(){
        limpiar();
        $("#formExponencial").fadeIn();
    });

    $("#ag-varEspcifica").click(function(){
        var name = $('#nameEsp').val();
        arrayValues = $('#valorEsp').val().split(",");
        if(hashVariables[name]){
            $("#err-varEspcifica").html("Error, el nombre de la variable ya se encuentra en uso");
        } else if(!validarValoresEspecifica(arrayValues)){
            $("#err-varEspcifica").html("Error, ingresaste mal los elementos, posees elementos repetidos o algunos de tus elementos no es un número");
        } else {
            varn.name = name;
            varn.type = 'especifica';
            console.log("varn", varn);
            hashVariables[varn.name] = varn;
            console.debug("hash: ", hashVariables)

            var rand = getRandomInt(0,arrayValues.length-1);
            alert(arrayValues[rand]);

            agregarvariableHTML(varn,true);
            limpiar();
            $('#valorEsp').val("");
            $('#nameEsp').val("");
            $("#err-varEspcifica").html("");
            $("#vals-varEspcifica").html("");


        }
    });
    $("#listVars").on("click", "#ag-varEspcificaEdit", function () {
        alert("Supuestamente si");
        var name = $('#nameEspEdit').val();
        arrayValues = $('#valorEspEdit').val().split(",");
        if(!validarValoresEspecifica(arrayValues)){
            $("#err-varEspcificaEdit").html("Error, ingresaste mal los elementos, posees elementos repetidos o algunos de tus elementos no es un número");
        } else {
            varn.name = name;
            varn.type = 'especifica';
            console.log("varn", varn);
            hashVariables[varn.name] = varn;
            console.debug("hash: ", hashVariables)

            var rand = getRandomInt(0,arrayValues.length-1);
            alert(arrayValues[rand]);

            $("#ag-varEspcificaEdit").parent().parent().parent().parent().remove();


            agregarvariableHTML(varn,false);
            limpiar();
            $('#valorEsp').val("");
            $('#nameEsp').val("");
            $("#err-varEspcifica").html("");
            $("#vals-varEspcifica").html("");
        }
    });


    $("#valorEsp").change(function(){
        var array = $('#valorEsp').val().split(",");
        var string = posiblesValoresCategorica(array);
        $("#vals-varEspcifica").html(string);
    });

    $("#ag-varDiscreta").click(function(){

        var name = $('#nameDis').val();
        arrayValues.splice(arrayValues.length, 0,  [$('#valorDis').val()] );
        varn.name = name;
        varn.type = 'discreta';
        agregarvariableHTML(varn);
        limpiar();

    });

    $("#ag-varCategorica").click(function(){
        var name = $('#nameCat').val();
        arrayValues = $('#valorCat').val().split(",");
        if(hashVariables[name]){
            $("#err-varCategorica").html("Error, el nombre de la variable ya se encuentra en uso");
        }
        else if(!validarValoresCategorica(arrayValues)){
            $("#err-varCategorica").html("Error, ingresas mal los elementos o posees elementos repetidos");
        }
        else {
            varn.name = name;
            varn.type = 'categorica';

            var rand = getRandomInt(0,arrayValues.length-1);
            alert(arrayValues[rand]);

            agregarvariableHTML(varn,true);
            limpiar();
            $('#valorCat').val("");
            $('#nameCat').val("");
            $("#err-varCategorica").html("");
            $("#vals-varCategorica").html("");
        }
    });

    $("#listVars").on("click", "#ag-varCategoricaEdit", function () {
        var name = $('#nameCatEdit').val();
        arrayValues = $('#valorCatEdit').val().split(",");

        if(!validarValoresCategorica(arrayValues)){
            $("#err-varCategoricaEdit").html("Error, ingresas mal los elementos o posees elementos repetidos");
        }
        else {
            varn.name = name;
            varn.type = 'categorica';

            var rand = getRandomInt(0,arrayValues.length-1);
            alert(arrayValues[rand]);

            $("#ag-varCategoricaEdit").parent().parent().parent().parent().remove();

            agregarvariableHTML(varn,false);
            limpiar();
        }
    });

    $("#valorCat").change(function(){
        var array = $('#valorCat').val().split(",");
        var string = posiblesValoresCategorica(array);
        $("#vals-varCategorica").html(string);
    });

    $("#ag-varNormal").click(function(){
        var name = $('#nameNor').val();
        var norm = $('#normalNor').val();
        var desv = $('#desviacionNor').val();
        var inc = $('#incNor').val();

        varn.name = name;
        varn.type = 'normal';
        varn.inc = inc;

        jsonValues['media'] = norm;
        jsonValues['desviacion'] = desv;

        agregarvariableHTML(varn);
        limpiar();

    });

    $("#ag-varUniforme").click(function() {
        var name = $('#nameUni').val();
        var min = $('#valueaUni').val();
        var max = $('#valuebUni').val();
        var inc = $('#incUni').val();
        saveVarUniform(name,max,min,inc,true);
    });

    $("#listVars").on("click", "#ag-varUniformeEdit", function () {
        var name = $('#nameUniEdit').val();
        var min = $('#valueaUniEdit').val();
        var max = $('#valuebUniEdit').val();
        var inc = $('#incUniEdit').val();
        saveVarUniform(name,max,min,inc,false);
    });


    $("#incUni").change(function(){
        var min = $('#valueaUni').val();
        var max = $('#valuebUni').val();
        var inc = $(this).val();
        var flag= true;

        if(!inc || inc == undefined || parseFloat(inc)==0) {
            $("#err-varUniforme").html("Error, el incremento no puede ser cero");
            flag=false;
        }
        else if (!min || min == undefined || !max || max == undefined || parseFloat(min) >= parseFloat(max)) {
            $("#err-varUniforme").html("Error, el mínimo no debe superar o ser igual al máximo");
            flag=false;
        }
        else if(parseFloat(inc)> (parseFloat(max)-parseFloat(min))){
            $("#err-varUniforme").html("Error, el incremento supera el rango entre el máximo y el mínimo");
            flag = false;
        }

        if(flag) {
            $("#err-varUniforme").html("");
            var string = posiblesValores(min, max, inc);
            string = "Posibles valores : " + string;
            $("#vals-varUniforme").html(string);
        }else{
            $("#vals-varUniforme").html("");
        }
    });

    $("#ag-varExponencial").click(function(){

        var name = $('#nameExp').val();
        var exp = $('#valueExp').val();
        var inc = $('#incExp').val();

        varn.name = name;
        varn.type = 'exponencial';
        varn.inc = inc;

        jsonValues['lamda'] = exp;

        agregarvariableHTML(varn);
        limpiar();
    });

    $("#listVars").on("click", ".deleteVar", function () {
        var nameVar = $(this).data("content");
        delete hashVariables[nameVar];
        for(var index in conjuntoVariables){
            var x = conjuntoVariables[index];
            if(x.name == nameVar){
                conjuntoVariables.splice(index,1);
                break;
            }
        }
        $(this).parent().parent().parent().parent().parent().remove();
    });

    $("#listVars").on("click", ".editVar", function () {
        if($(this).data("type").localeCompare("uniforme")==0){
            var json = $(this).data("metadatos");
            var htmlVar = '<div id="formUniformeEdit" class="panel panel-default" style="margin-top: 10px">' +
                '<div class="panel-heading" role="tab">' +
                '<span class="panel-title" data-title="">' +
                '<input id="nameUniEdit"  style="width: 20px !important" type="text" class="contenedor-variables-input" size="3" placeholder="x" value="'+$(this).data("content")+'" disabled>' +
                '<input id="valueaUniEdit" style="width: 50px !important" class="contenedor-variables-input" type="number" step="any" placeholder="min"  value="'+json.inicio+'" required>' +
                '<input id="valuebUniEdit" style="width: 50px !important" class="contenedor-variables-input" type="number" step="any" placeholder="max"  value="'+json.fin+'" required>' +
                '<input id="incUniEdit" style="width: 60px !important" class="contenedor-variables-input" type="number"  step="any" value="'+json.inc+'" placeholder="inc">' +
                '<a href="#" id="ag-varUniformeEdit">' +
                '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>' +
                '</a>' +
                '<p id="vals-varUniformeEdit"></p>' +
                '<p id="err-varUniformeEdit"></p>' +
                '<span id="outFormUniformeEdit"></span>' +
                '</span>' +
                '</div>' +
                '</div>';
            $(this).parent().parent().parent().parent().parent().html(htmlVar);
        }else if($(this).data("type").localeCompare("especifica")==0){
            var array = $(this).data("metadatos");

            var htmlVar = '<div id="formEspecificaEdit" class="panel panel-default" style="margin-top: 10px">'+
                '<div class="panel-heading" role="tab">'+
                '<span class="panel-title" data-title="">'+
                '<input id="nameEspEdit"  style="width: 20px !important" type="text" class=" contenedor-variables-input" size="3" placeholder="x" value="'+$(this).data("content")+'" disabled>'+
                '<input id="valorEspEdit" style="width: 200px !important;" placeholder="1, 5, 10, 12, 17, 25, 30, 33, 34, 45, 70"  class="contenedor-variables-input" value="'+array.toString()+'" required>'+
                '<a href="#" id="ag-varEspcificaEdit">'+
                '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'+
                '</a>'+
                '<p id="vals-varEspcificaEdit"></p>'+
                '<span id="outFormEspecificaEdit"></span>'+
                '<p id="err-varEspcificaEdit"></p>'+
                '</span>'+
                '</div>'+
                '</div>';
            $(this).parent().parent().parent().parent().parent().html(htmlVar);
        }else if($(this).data("type").localeCompare("categorica")==0){
            var array = $(this).data("metadatos");

            var htmlVar = '<div id="formCategoricaEdit" class="panel panel-default" style="margin-top: 10px">'+
                '<div class="panel-heading" role="tab]">'+
                '<span class="panel-title" data-title="">'+
                '<input id="nameCatEdit"  style="width: 20px !important" type="text" class="contenedor-variables-input" size="3" placeholder="y" value="'+$(this).data("content")+'" disabled>'+
                '<input id="valorCatEdit" type="text" style="width: 200px !important;"class="contenedor-variables-input" placeholder="manzana, pera, banano, lulo"  value="'+array.substring(1, array.length-1)+'" required>'+
                '<a href="#" id="ag-varCategoricaEdit">'+
                '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>'+
                '</a>'+
                '<p id="vals-varCategoricaEdit"></p>'+
                '<span id="outFormCategoricaEdit"></span>'+
                '<p id="err-varCategoricaEdit"></p>'+
                '</span>'+
                '</div>'+
                '</div>';
            $(this).parent().parent().parent().parent().parent().html(htmlVar);
        }
    });

    $('#endVar').click(function(){
        agregarvariableHTML(varn);

        limpiar();
    });
});


function Variable(){
    this.name = '';
    this.type = '';
    this.inc = '';
    this.value = {};
    this.numb = [];
}

function varToXML(){
    var result = '';
    if(conjuntoVariables.length > 0){
        for(var index in conjuntoVariables){
            var x = conjuntoVariables[index];
            var v;

            if(x.type == 'discreta'){
                v = '<variable tipo="' + x.type + '" id="' + x.name + '">';
                for(var ii in x.numb){
                    v = v + '<valor>' + x.numb[ii] + '</valor>';
                }
                v = v + '</variable>';

            }
            else if(x.type == 'categorica' || x.type == 'especifica'){
                v = '<variable tipo="' + x.type + '" id="' + x.name + '">';
                for(var ii in x.numb){
                    v = v + '<valor>' + x.numb[ii] + '</valor>';
                }
                v = v + '</variable>';
            }
            else if(x.type == 'normal'){
                v = '<variable tipo="' + x.type + '" id="' + x.name + '">';
                v = v + '<cifras_decimales>' + x.inc + '</cifras_decimales>'
                v = v + '<media>' + x.value['media'] + '</media>';
                v = v + '<desviacion>' + x.value['desviacion'] + '</desviacion></variable>';
            }
            else if(x.type == 'uniforme'){
                v = '<variable tipo="' + x.type + '" id="' + x.name + '">';
                v = v + '<cifras_decimales>' + x.inc + '</cifras_decimales>'
                v = v + '<inicio>' + x.value['inicio'] + '</inicio>';
                v = v + '<fin>' + x.value['fin'] + '</fin></variable>';
            }
            else if(x.type == 'exponencial'){
                v = '<variable tipo="' + x.type + '" id="' + x.name + '">';
                v = v + '<cifras_decimales>' + x.inc + '</cifras_decimales>'
                v = v + '<lamda>' + x.value['lamda'] + '</lamda></variable>';
            }

            result = result + v;

        }
        return result ;
    }
}

function XMLToVar(entrada){
    conjuntoVariables = []; //vaceo las variables
    $('#panel-variables').text(''); //limpio los elementos variables.
    var parseXml;

    if (window.DOMParser) {
        parseXml = function(xmlStr) {
            return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
        };

    } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
        parseXml = function(xmlStr) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
        };
    } else {
        parseXml = function() { return null; }
    }

    var doc = parseXml(entrada);


    if(entrada != ""){

        var elementos = doc.getElementsByTagName('variables')[0].childNodes;
        for(var ii =0; ii < elementos.length; ii++){
            var v = new Variable();
            var varia = elementos[ii];

            if(varia.attributes){

                var type = varia.attributes[0].value;
                v.type =  varia.attributes[0].value;
                v.name = varia.id;

                if(type == 'especifica' || type == 'categorica'){ //arrayValues.splice(arrayValues.length, 0,  [$('#valorDis').val()] );
                    var childrenss = varia.children;
                    for (var jj in childrenss) {
                        if(childrenss[jj].textContent)
                            v.numb.splice(v.numb.length, 0, childrenss[jj].textContent);
                    };

                    arrayValues = v.numb;
                }else if(type == 'normal'){
                    var childrenss = varia.children;
                    v.inc = childrenss[0].textContent;
                    v.value['media'] = childrenss[1].textContent;
                    v.value['desviacion'] = childrenss[2].textContent;

                }else if(type == 'uniforme'){
                    var childrenss = varia.children;
                    v.inc = childrenss[0].textContent;
                    v.value['inicio'] = childrenss[1].textContent;
                    v.value['fin'] = childrenss[2].textContent;

                    jsonValues['inicio'] = v.value.inicio ;
                    jsonValues['fin'] = v.value.fin ;

                }else if(type == 'exponencial'){
                    var childrenss = varia.children;
                    v.inc = childrenss[0].textContent;
                    v.value['lamda'] = childrenss[1].textContent;
                }

                agregarvariableHTML(v,true);
            }

        }
        limpiar();
    }
}

function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    {
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

$(document).ready(function(){
    var elem = document.getElementById('eq');//This is the element that you want to move the caret to the end of
    setEndOfContenteditable(elem);
});



function agregarvariableHTML(v,isnew){
    var metadatos,tipo;
    v.value = jsonValues;
    v.numb = arrayValues

    hashVariables[v.name] = v;
    console.log("agregada");
    console.debug(JSON.stringify(hashVariables));
    if(v.type == 'especifica'){
        var result = '[ ';
        for (var i = 0; i < arrayValues.length; i++) {

            if(!isEmpty(arrayValues[i].trim())) {
                if(i<(arrayValues.length-1)) {
                    result = result + arrayValues[i].trim() + " , ";
                }else{
                    result = result + arrayValues[i].trim() ;
                }
            }else if(i==(arrayValues.length-1)){
                result = result.substring(0, result.length-2);
            }
        }
        result= result + ' ]';
        tipo = "especifica";
        metadatos = result;
    }
    else if(v.type == 'discreta'){
        var result = '';
        for (var ii in arrayValues) {
            result = result + arrayValues[ii] +",";
        };
        htmlVar = htmlVar + ' data-type="discreta" data-metadatos="' + result + '">';

    }
    else if(v.type == 'categorica'){
        var result = '[ ';
        for (var i = 0; i < arrayValues.length; i++) {
            if(!isEmpty(arrayValues[i].trim())) {
                if(i<(arrayValues.length-1)) {
                    result = result + arrayValues[i].trim() + " , ";
                }else{
                    result = result + arrayValues[i].trim() ;
                }
            }else if(i==(arrayValues.length-1)){
                result = result.substring(0, result.length-2);
            }
        }
        result= result + ' ]';

        tipo = "categorica";
        metadatos = result;
    }
    else if(v.type == 'normal'){
        var result = "media," + jsonValues['media'] + ",desviacion," + jsonValues['desviacion'] + ",inc," + v.inc;
        htmlVar = htmlVar + ' data-type="normal" data-metadatos="' + result + '">';

    }
    else if(v.type == 'uniforme'){
        var array = {};
        array.inicio = jsonValues['inicio'];
        array.fin = jsonValues['fin'];
        array.inc= v.inc;
        var result = JSON.stringify(array)//"inicio: " + jsonValues['inicio'] + " fin: " + jsonValues['fin'] + " inc: " + v.inc;
        tipo = "uniforme";
        metadatos = result;
    }
    else{
        var result = "lamda," + jsonValues['lamda'];
        htmlVar = htmlVar + ' data-type="exponencial" data-metadatos="' + result + ",inc," + v.inc + '">';
    }

    var htmlVar = "<div  class='panel panel-default' style='margin-top: 10px'>"+
        "<div class='panel-heading' role='tab' id=''>"+
        "<span class='panel-title'>" +
        "<div class='card view-variable' data-id='var' data-content='" + v.name + "'  data-type='"+tipo+"' data-metadatos='"+metadatos+"'> <span class='var'>" + v.name + "</span></div>"+
        "</span>" +
        "<div class='pull-right hide-tools'>"+
        "<div class='btn-toolbar' role='toolbar' aria-label='...'>"+
        "<div class='btn-group' role='group' aria-label='...'>"+
        "<a href='#' class='editVar' data-metadatos='"+metadatos+"'  data-type='"+tipo+"' data-content='" + v.name + "'>"+
        "<span class='glyphicon glyphicon-pencil'  aria-hidden='true'></span>"+
        "</a>"+
        "</div>"+
        "<div class='btn-group' role='group' aria-label='...'>"+
        "<a href='#' class='deleteVar' data-content='" + v.name + "'>"+
        "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"+
        "</a>"+
        "</div>"+
        "</div>"+
        "</div>"+
        "</div>"+
        "</div>";

    $("#listVars").append(htmlVar);
    $('.view-variable').draggable({
        appendTo: "body",
        cursor: "move",
        helper: "clone",
        revert: "invalid"
    })

    if(!isnew) {
        for(var index in conjuntoVariables){
            var x = conjuntoVariables[index];
            if(x.name == v.name){
                conjuntoVariables[index]= v;
                break;
            }
        }
    }else{
        conjuntoVariables.splice(conjuntoVariables.length, 0, v);

    }

}
function saveVarUniform(name,max,min,inc,isnew){
    var rand = getRandomArbitrary(parseFloat(min),parseFloat(max));
    //alert(rand);
    rand = RoundInc(parseFloat(rand),parseFloat(inc),parseFloat(min),parseFloat(max));
    // rand=  rand + parseFloat(min);
    /* if(rand> parseFloat(max)) {
     alert("Es mayor");
     rand -= parseFloat(inc);
     }
     */
    alert(rand);
    /*
    flag=true;


    if(parseFloat(inc)==0) {
        if(isnew)
            $("#err-varUniforme").html("Error, el incremento no puede ser cero");
        else
            $("#err-varUniformeEdit").html("Error, el incremento no puede ser cero");


        flag=false;
    }
    else if (parseFloat(min) >= parseFloat(max)) {
        if(isnew)
            $("#err-varUniforme").html("Error, el mínimo no debe superar o ser igual al máximo");
        else
            $("#err-varUniformeEdit").html("Error, el mínimo no debe superar o ser igual al máximo");

        flag=false;
    }
    else if(parseFloat(inc)>= (parseFloat(max)-parseFloat(min))){
        if(isnew)
            $("#err-varUniforme").html("Error, el incremento supera el rango entre el máximo y el mínimo");
        else
            $("#err-varUniformeEdit").html("Error, el incremento supera el rango entre el máximo y el mínimo");

        flag = false;
    }

    if(flag){
        if(isnew && hashVariables[name]){
            if(isnew)
                $("#err-varUniforme").html("Error, el nombre de la variable ya se encuentra en uso");
            else
                $("#err-varUniformeEdit").html("Error, el nombre de la variable ya se encuentra en uso");

        }else {
            varn.name = name;
            varn.type = 'uniforme';
            varn.inc = inc;

            jsonValues['inicio'] = min;
            jsonValues['fin'] = max;

            if(!isnew)
                $("#ag-varUniformeEdit").parent().parent().parent().parent().remove();

            agregarvariableHTML(varn,isnew);

            limpiar();
            $('#nameUni').val("");
            $('#valueaUni').val("");
            $('#valuebUni').val("");
            $('#incUni').val("");
            $("#err-varUniforme").html("");
            $("#vals-varUniforme").html("");

            var rand = getRandomArbitrary(parseFloat(min),parseFloat(max));
            //alert(rand);
            rand = RoundInc(parseFloat(rand),parseFloat(inc));
            // rand=  rand + parseFloat(min);
            /* if(rand> parseFloat(max)) {
             alert("Es mayor");
             rand -= parseFloat(inc);
             }

           // alert(rand);

        }
    }*/
}
function limpiar(){
    varn = new Variable();
    arrayValues = [];
    jsonValues = {};
    $("#formEspecifica").fadeOut("fast");
    $("#formDiscreta").fadeOut("fast");
    $("#formCategorica").fadeOut("fast");
    $("#formNormal").fadeOut("fast");
    $("#formUniforme").fadeOut("fast");
    $("#formExponencial").fadeOut("fast");
    //$("#formChi").fadeOut("fast");

    $('#outFormEspecifica').text('');
    $('#outFormDiscreta').text('');
    $('#outFormCategorica').text('');
    $('#outFormNormal').text('');
    $('#outFormUniforme').text('');
    $('#outFormExponencial').text('');
}