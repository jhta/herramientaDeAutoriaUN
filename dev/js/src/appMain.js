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
        $('#outFormEspecifica').text(name + '= ' + '[' + arrayValues  + ']');

    });

    $("#ag-varDiscreta").click(function(){
        var name = $('#nameDis').val();
        arrayValues.splice(arrayValues.length, 0,  [$('#valorDis').val()] );
        varn.name = name;

        $('#outFormDiscreta').text(name + '= ' + '[' + arrayValues  + ']');

    });

    $("#ag-varCategorica").click(function(){
        var name = $('#nameCat').val();
        arrayValues.splice(arrayValues.length, 0,  [$('#valorCat').val()] );
        varn.name = name;

        $('#outFormCategorica').text(name + '= ' + '[' + arrayValues  + ']');

    });

    $("#ag-varNormal").click(function(){
        var name = $('#nameNor').val();
        var norm = $('#normalNor').val();
        var desv = $('#desviacionNor').val();
        varn.name = name;

        jsonValues['normal'] = norm;
        jsonValues['desviacion'] = desv;
        
        $('#outFormNormal').text(name + '= ' + '[' + 'µ=' + norm + ', σ=' + desv + ']');


    });

    $("#ag-varUniforme").click(function(){
        var name = $('#nameUni').val();
        var a = $('#valueaUni').val();
        var b = $('#valuebUni').val();
        varn.name = name;

        jsonValues['a'] = a;
        jsonValues['b'] = b;
        
        $('#outFormUniforme').text(name + '= ' + '[' + 'a=' + a + ', b=' + b + ']');
    });

    $("#ag-varExponencial").click(function(){
        console.log("..");
        var name = $('#nameUni').val();
        var exp = $('#valueUni').val();
        varn.name = name;

        jsonValues['λ'] = exp;
        
        $('#outFormExponencial').text(name + '= ' + '[' + 'λ=' + exp +']');

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
    this.value = {};
    this.numb = [];
}