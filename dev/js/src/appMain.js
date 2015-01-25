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

    });

    $("#ag-varDiscreta").click(function(){
        var name = $('#nameDis').val();
        arrayValues.splice(arrayValues.length, 0,  [$('#valorDis').val()] );
        varn.name = name;
        varn.type = 'discreta';

        $('#outFormDiscreta').text(name + '= ' + '[' + arrayValues  + ']');

    });

    $("#ag-varCategorica").click(function(){
        var name = $('#nameCat').val();
        arrayValues.splice(arrayValues.length, 0,  [$('#valorCat').val()] );
        varn.name = name;
        varn.type = 'categorica';

        $('#outFormCategorica').text(name + '= ' + '[' + arrayValues  + ']');

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
    });

    $("#ag-varExponencial").click(function(){
        console.log("..");
        var name = $('#nameUni').val();
        var exp = $('#valueUni').val();
        varn.name = name;
        varn.type = 'exponencial';

        jsonValues['lamda'] = exp;
        
        $('#outFormExponencial').text(name + '= ' + '[' + 'λ=' + exp +']');
        $("#endVar").show();

    });

    $("#endVar").click(function(){

        console.log("..a");
        varn.value = jsonValues;
        varn.numb = arrayValues

        conjuntoVariables.splice(conjuntoVariables.length, 0,  varn );

    });


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
        for(int index in conjuntoVariables){
            var x = conjuntoVariables[index];
            var v;
            if(x.type == 'espcifica'){
                v = '<variable tipo=' + x.type + ' id=' + x.name + '>';
                v = v + '<valor>' + x.numb[0] + '</valor></variable>';
            }
            else if(x.type == 'discreta'){
                v = '<variable tipo=' + x.type + ' id=' + x.name + '>';
                for(int ii in x.numb){
                    v = v + '<valor>' + x.numb[ii] + '</valor>';    
                }
                v = v + '</variable>';
                
            }
            else if(x.type == 'categorica'){
                v = '<variable tipo=' + x.type ' id=' + x.name + '>';
                for(int ii in x.numb){
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