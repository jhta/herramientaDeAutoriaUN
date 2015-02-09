var varn,
    arrayValues = [];
    jsonValues = {};

var conjuntoVariables = [];
$(document).ready(function(){

    $("#tab-respuestas").click(function(){
        $("#panelOtros").toggleClass("hide");

    });
    
    $("#tab-formulacion").click(function(){
        $("#panelOtros").removeClass("hide");
    })

    $("#tab-metadatos").click(function(){
        $("#panelOtros").removeClass("hide");
    })
    $('#rootwizard').bootstrapWizard();
    $("#valor").rating();
    $("#valorA").rating();
    
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
        arrayValues = [$('#valorEsp').val()];
        
        varn.name = name;
        varn.type = 'especifica';
        $('#outFormEspecifica').text(name + '= ' + '[' + arrayValues  + ']');
        $("#endVar").removeClass('hide');
    });

    $("#ag-varDiscreta").click(function(){
        
        var name = $('#nameDis').val();
        arrayValues.splice(arrayValues.length, 0,  [$('#valorDis').val()] );
        varn.name = name;
        varn.type = 'discreta';

        $('#outFormDiscreta').text(name + '= ' + '[' + arrayValues  + ']');
        $("#endVar").removeClass('hide');

    });

    $("#ag-varCategorica").click(function(){
        var name = $('#nameCat').val();
        arrayValues.splice(arrayValues.length, 0,  [$('#valorCat').val()] );
        varn.name = name;
        varn.type = 'categorica';

        $('#outFormCategorica').text(name + '= ' + '[' + arrayValues  + ']');
        $("#endVar").removeClass('hide');

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
        
        $('#outFormNormal').text(name + '= ' + '[' + 'µ=' + norm + ', σ=' + desv + ', inc=' + inc + ']');
        $("#endVar").removeClass('hide');

    });

    $("#ag-varUniforme").click(function(){
        var name = $('#nameUni').val();
        var a = $('#valueaUni').val();
        var b = $('#valuebUni').val();
        var inc = $('#incUni').val();

        varn.name = name;
        varn.type = 'uniforme';
        varn.inc = inc;

        jsonValues['inicio'] = a;
        jsonValues['fin'] = b;

        $('#outFormUniforme').text(name + '= ' + '[' + 'a=' + a + ', b=' + b + ', inc=' + inc + ']');
        $("#endVar").removeClass('hide');
    });

    $("#ag-varExponencial").click(function(){
      
        var name = $('#nameExp').val();
        var exp = $('#valueExp').val();
        var inc = $('#incExp').val();

        varn.name = name;
        varn.type = 'exponencial';
        varn.inc = inc;

        jsonValues['lamda'] = exp;
        
        $('#outFormExponencial').text(name + '= ' + '[' + 'λ=' + exp + ', inc=' + inc + ']');
        $("#endVar").removeClass('hide');

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
        $(this).addClass('hide');
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
});


function agregarvariableHTML(v){
    var htmlVar = '<div class="card view-variable" data-id="var" data-content="' + v.name + '"';
        v.value = jsonValues;
        v.numb = arrayValues
        

        if(v.type == 'especifica'){
            htmlVar = htmlVar + ' data-type="especifica" data-metadatos="' + arrayValues[0] + '">';
        }
        else if(v.type == 'discreta'){
            var result = '';
            for (var ii in arrayValues) {
                result = result + arrayValues[ii] +",";
            };
            htmlVar = htmlVar + ' data-type="discreta" data-metadatos="' + result + '">';

        }
        else if(v.type == 'categorica'){
            var result = '';
            for (var ii in arrayValues) {
                result = result + arrayValues[ii] +",";
            };
            htmlVar = htmlVar + ' data-type="categorica" data-metadatos="' + result + '">';
        }
        else if(v.type == 'normal'){
            var result = "media," + jsonValues['media'] + ",desviacion," + jsonValues['desviacion'] + ",inc," + v.inc;
            htmlVar = htmlVar + ' data-type="normal" data-metadatos="' + result + '">';
            
        }
        else if(v.type == 'uniforme'){
            var result = "inicio," + jsonValues['inicio'] + ",fin," + jsonValues['fin'] + ",inc," + v.inc;
            htmlVar = htmlVar + ' data-type="uniforme" data-metadatos="' + result + '">';
        }
        else{
            var result = "lamda," + jsonValues['lamda'];
            htmlVar = htmlVar + ' data-type="exponencial" data-metadatos="' + result + ",inc," + v.inc + '">';
        }


        $("#panel-variables").append(htmlVar + '<span class="var">' + v.name + '</span></div>');
        $('.view-variable').draggable({
             appendTo: "body",
            cursor: "move",
            helper: "clone",
            revert: "invalid"
        })
        conjuntoVariables.splice(conjuntoVariables.length, 0,  v );

}
