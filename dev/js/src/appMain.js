var varn,
    arrayValues = [];
    jsonValues = {};

var conjuntoVariables = [];
$(document).ready(function(){
    
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
        varn.type = 'espcifica';
        $('#outFormEspecifica').text(name + '= ' + '[' + arrayValues  + ']');
        $("#endVar").removeClass('hide');
    });

    $("#ag-varDiscreta").click(function(){
        console.log("NEAa");
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
        varn.name = name;
        varn.type = 'normal';

        jsonValues['media'] = norm;
        jsonValues['desviacion'] = desv;
        
        $('#outFormNormal').text(name + '= ' + '[' + 'µ=' + norm + ', σ=' + desv + ']');
        $("#endVar").removeClass('hide');

    });

    $("#ag-varUniforme").click(function(){
        var name = $('#nameUni').val();
        var a = $('#valueaUni').val();
        var b = $('#valuebUni').val();
        varn.name = name;
        varn.type = 'uniforme';

        jsonValues['inicio'] = a;
        jsonValues['fin'] = b;

        $('#outFormUniforme').text(name + '= ' + '[' + 'a=' + a + ', b=' + b + ']');
        $("#endVar").removeClass('hide');
    });

    $("#ag-varExponencial").click(function(){
        console.log("..");
        var name = $('#nameUni').val();
        var exp = $('#valueUni').val();
        varn.name = name;
        varn.type = 'exponencial';

        jsonValues['lamda'] = exp;
        
        $('#outFormExponencial').text(name + '= ' + '[' + 'λ=' + exp + ']');
        $("#endVar").removeClass('hide');

    });

    $("#endVar").click(function(){
        var htmlVar = '<div class="card view-variable" data-id="var" data-content="' + varn.name + '"';
        varn.value = jsonValues;
        varn.numb = arrayValues
        console.log(varn.value);
        


        if(varn.type == 'espcifica'){
            htmlVar = htmlVar + ' data-type="espcifica" data-metadatos="' + arrayValues[0] + '">';
        }
        else if(varn.type == 'discreta'){
            var result = '';
            for (var ii in arrayValues) {
                result = result + arrayValues[ii] +",";
            };
            htmlVar = htmlVar + ' data-type="discreta" data-metadatos="' + result + '">';

        }
        else if(varn.type == 'categorica'){
            var result = '';
            for (var ii in arrayValues) {
                result = result + arrayValues[ii] +",";
            };
            htmlVar = htmlVar + ' data-type="categorica" data-metadatos="' + result + '">';
        }
        else if(varn.type == 'normal'){
            var result = "media," + jsonValues['media'] + ",desviacion," + jsonValues['desviacion'];
            htmlVar = htmlVar + ' data-type="normal" data-metadatos="' + result + '">';
        }
        else if(varn.type == 'uniforme'){
            var result = "inicio," + jsonValues['inicio'] + ",fin," + jsonValues['fin'];
            htmlVar = htmlVar + ' data-type="uniforme" data-metadatos="' + result + '">';
        }
        else{
            var result = "lamda," + jsonValues['lamda'];
            htmlVar = htmlVar + ' data-type="exponencial" data-metadatos="' + result + '">';
        }


        $("#panel-variables").append(htmlVar + '<span class="var">' + varn.name + '</span></div>');
        conjuntoVariables.splice(conjuntoVariables.length, 0,  varn );

        $(this).addClass('hide');
    });

    $("#endVar").on('click', function(e){
        $(".view-variable").draggable({
            appendTo: "body",
            cursor: "move",
            helper: "clone",
            revert: "invalid",
        });
    })
});





function Variable(){
    this.name = '';
    this.type = '';
    this.cifras = '';
    this.value = {};
    this.numb = [];
}

function varToXML(){
    var result = '<variables>'
    if(conjuntoVariables.length > 0){
        for(var index in conjuntoVariables){
            var x = conjuntoVariables[index];
            var v;
            if(x.type == 'espcifica'){
                v = '<variable tipo=' + x.type + ' id=' + x.name + '>';
                v = v + '<valor>' + x.numb[0] + '</valor></variable>';
            }
            else if(x.type == 'discreta'){
                v = '<variable tipo=' + x.type + ' id=' + x.name + '>';
                for(var ii in x.numb){
                    v = v + '<valor>' + x.numb[ii] + '</valor>';    
                }
                v = v + '</variable>';
                
            }
            else if(x.type == 'categorica'){
                v = '<variable tipo=' + x.type + ' id=' + x.name + '>';
                for(var ii in x.numb){
                    v = v + '<valor>' + x.numb[ii] + '</valor>';    
                }
                v = v + '</variable>';
            }
            else if(x.type == 'normal'){
                v = '<variable tipo=' + x.type + ' cifras_decimales=' + x.cifras + ' id=' + x.name + '>';
                v = v + '<media>' + x.value['media'] + '</media>';
                v = v + '<desviacion>' + x.value['desviacion'] + '</desviacion></variable>';
            }
            else if(x.type == 'uniforme'){
                v = '<variable tipo=' + x.type + ' cifras_decimales=' + x.cifras + ' id=' + x.name + '>';
                v = v + '<inicio>' + x.value['inicio'] + '</fin>';
                v = v + '<fin>' + x.value['fin'] + '</fin></variable>';
            }
            else if(x.type == 'exponencial'){
                v = '<variable tipo=' + x.type + ' cifras_decimales=' + x.cifras + ' id=' + x.name + '>';
                v = v + '<lamda>' + x.value['lamda'] + '</lamda></variable>';
            }

            result = result + v;

        }
        result = result + '</variables>';
    }
}