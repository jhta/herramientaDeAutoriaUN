var varn,
    hashVariables = [],
    arrayValues = [],
    jsonValues = {};
var TOGGLE_TAB_RES = false;
var focusComponentId = null;

var conjuntoVariables = [];
$(document).ready(function(){

    $("#tab-respuestas").click(function(){
        $("#panelOtros").toggleClass("hide");
        TOGGLE_TAB_RES = true;

    });

    $("#tab-formulacion").click(function(){
        TOGGLE_TAB_RES = false;
        $("#panelOtros").removeClass("hide");
    })

    $("#tab-metadatos").click(function(){
        TOGGLE_TAB_RES = false;
        $("#panelOtros").removeClass("hide");
    })
    $('#rootwizard').bootstrapWizard();
    $("#valor").rating();
    $("#valorA").rating();

    $(".input-res").on("focus", function(){
        console.log("fsfa");
        focusComponentId = $(this).parent(".list-group-item ").data("respuestaid");
        console.log(focusComponentId);
        //focusComponent = $(this);
        //list-group-item 
    });
    $("body").on("click", ".card", function(){
        if(TOGGLE_TAB_RES) console.log($(this).data("code"));
    });
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
    /*$("#varChi").click(function(){
     limpiar();
     $("#formChi").fadeIn();
     });*/


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

            agregarvariableHTML(varn);
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

            agregarvariableHTML(varn);
            limpiar();
            $('#valorCat').val("");
            $('#nameCat').val("");
            $("#err-varCategorica").html("");
            $("#vals-varCategorica").html("");



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
        flag=true;

        if (parseFloat(min) > parseFloat(max)) {
            $("#err-varUniforme").html("Error, el mínimo no debe superar el máximo");
            flag=false;
        }
        else if(parseFloat(inc)>= (parseFloat(max)-parseFloat(min))){
            $("#err-varUniforme").html("Error, el incremento supera el rango entre el máximo y el mínimo");
            flag = false;
        }



        if(flag){
            if(hashVariables[name]){
                $("#err-varUniforme").html("Error, el nombre de la variable ya se encuentra en uso");
            }else {
                varn.name = name;
                varn.type = 'uniforme';
                varn.inc = inc;

                jsonValues['inicio'] = min;
                jsonValues['fin'] = max;

                agregarvariableHTML(varn);
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
                 */
                alert(rand);
            }
        }
    });

    $("#incUni").change(function(){
        var min = $('#valueaUni').val();
        var max = $('#valuebUni').val();
        var inc = $('#incUni').val();
        var string = posiblesValores(min,max,inc);
        string = "Posibles valores : "+string;
        $("#vals-varUniforme").html(string);
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

    /* $("#endVar").on('click', function(e){
     agregarvariableHTML(varn);
     $(".view-variable").draggable({
     appendTo: "body",
     cursor: "move",
     helper: "clone",
     revert: "invalid"
     });
     $(this).addClass('hide');
     limpiar();
     })*/

    $('#endVar').click(function(){
        agregarvariableHTML(varn);

        limpiar();
    })

});


function Variable(){
    this.name = '';
    this.type = '';
    this.inc = '';
    this.value = {};
    this.numb = [];
}

function varToXML(){
    var result = '<variables>';
    if(conjuntoVariables.length > 0){
        for(var index in conjuntoVariables){
            var x = conjuntoVariables[index];
            var v;
            if(x.type == 'especifica'){
                v = '<variable tipo="' + x.type + '" id="' + x.name + '">';
                v = v + '<valor>' + x.numb[0] + '</valor></variable>';
            }
            else if(x.type == 'discreta'){
                v = '<variable tipo="' + x.type + '" id="' + x.name + '">';
                for(var ii in x.numb){
                    v = v + '<valor>' + x.numb[ii] + '</valor>';
                }
                v = v + '</variable>';

            }
            else if(x.type == 'categorica'){
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
        return result + '</variables>';
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
                v.type = varia.tipo;
                v.name = varia.id;

                if(type == 'especifica'){
                    v.numb = [varia.children[0].textContent]
                }
                else if(type == 'discreta' || type == 'categorica'){ //arrayValues.splice(arrayValues.length, 0,  [$('#valorDis').val()] );
                    var childrenss = varia.children;
                    for (var jj in childrenss) {
                        if(childrenss[jj].textContent)
                            v.numb.splice(v.numb.length, 0, childrenss[jj].textContent);
                    };
                }
                else if(type == 'normal'){
                    var childrenss = varia.children;
                    v.inc = childrenss[0].textContent;
                    v.value['media'] = childrenss[1].textContent;
                    v.value['desviacion'] = childrenss[2].textContent;

                }else if(type == 'uniforme'){
                    var childrenss = varia.children;
                    v.inc = childrenss[0].textContent;
                    v.value['inicio'] = childrenss[1].textContent;
                    v.value['fin'] = childrenss[2].textContent;

                }
                else if(type == 'exponencial'){
                    var childrenss = varia.children;
                    v.inc = childrenss[0].textContent;
                    v.value['lamda'] = childrenss[1].textContent;
                }

                agregarvariableHTML(v);
            }

        }
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

    $("#panel-variables").on("mouseover", ".view-variable", function () {
        $("#infoVariables").html("<b>Tipo</b>: "+$(this).data("type")+ " <b>Datos</b>: "+$(this).data("metadatos"));
    });
    $("#panel-variables").on("mouseout", ".view-variable", function () {
        $("#infoVariables").html("");
    });
});



function agregarvariableHTML(v){
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
        "<a href='#' class='editFolder'>"+
        "<span class='glyphicon glyphicon-pencil'  aria-hidden='true'></span>"+
        "</a>"+
        "</div>"+
        "<div class='btn-group' role='group' aria-label='...'>"+
        "<a href='#' class='deleteFolder' '>"+
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
    conjuntoVariables.splice(conjuntoVariables.length, 0,  v );

}
