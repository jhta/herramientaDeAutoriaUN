var idCode = 0;
var first = true,
    endFunction = false,
    inRespuesta = false;

var treeActual = new Tree();


$(function() {
    $(".card").draggable({
        appendTo: "body",
        cursor: "move",
        helper: "clone",
        revert: "invalid",
        drag: function(event,ui){
            //$("body").toggleClass("test");
            //$('.spa').toggleClass("ui-element");
        }
    });
});

$(function() {
    $("#droppable-out").droppable(funcDroppableOut);
    //$('.drop').droppable(funcDroppableDrop);
});

var funcDroppableOut = {
    tolerance: "intersect",
    accept: ".card2",
    drop: function( event, ui ) {
        var elementDrop = $(ui.draggable);

        if(elementDrop.hasClass("first")){
            rebootTree();
            
            UpdateMath("<math>" + "" + "</math>");
        }
        else{
            var elemtParent = elementDrop.parent();
            elemtParent.addClass('ultimo-e');
            var idFather = elemtParent.data("father");
            var position = elemtParent.data("pos");
            var elementFather = $('div').find('[data-id='+ idFather+']');
            //console.log(elementFather);
            
            var elementSpa = elementFather.find('.spa');
            elementSpa.addClass('drop2');
            elementSpa.droppable(funcDroppable);

            treeActual.removeNode(idFather, position);
            var jsn = treeActual.makeString();

            
            UpdateMath("<math>" + jsn + "</math>");
        }

        elementDrop.remove();            
    }
}

var funcDroppableDrop = {
    tolerance: "intersect",
    accept: ".card",
    activeClass: "ui-state-default",
    hoverClass: "drop-p",
    drop: function( event, ui ) {
        var elementDrop = $(ui.draggable).clone()
        makeTree(elementDrop, $(this));
        
        $(this).append(elementDrop);
        var jsn = treeActual.makeString();

        UpdateMath("<math>" + jsn + "</math>");

        console.log('mathml:');
        console.log(jsn);
        console.log('tree:');
        console.log(treeActual);

        if(first){
            first = false;
            elementDrop.addClass("first");
        }
    }
}

var funcDroppable = {
    tolerance: "touch",
    accept: ".card",
    activeClass: "drop-3",
    hoverClass: function(){
        if($(this).children().length < 1) {
            return "drop-2";
        }else
            return "";
    },
   drop: function (event, ui) {
        var elementDrop = $(ui.draggable).clone();
        makeTree(elementDrop, $(this));
       
       $(this).append(elementDrop);
        var jsn = treeActual.makeString();
        UpdateMath("<math>" + jsn + "</math>");
        
       console.log('mathml:');
       console.log(jsn);
       console.log('tree:');
       console.log(treeActual);
    }
};

var funcDroppableFalse = {
    tolerance: "touch",
    accept: ".naskiajs",
    activeClass: "aaa3",
    drop: function (event, ui) {}
};

function makeTree(elementDrop, uu){
    uu.droppable(funcDroppableFalse); //cambia la apariencia.
    var idData = elementDrop.data("id"),
        idElement = ++idCode,
        tree = new Tree(),
        position,
        idFather;

    uu.removeClass('ultimo-e');
    
    if(uu.data('id')){
        idFather = uu.data('father');
        position = uu.data('pos');
    }else{
        position = 0;
        idFather = 0;
    }
    
    elementDrop.addClass("card2");
    elementDrop.removeClass("card");
    elementDrop.draggable({
        appendTo: "body",
        cursor: "move",
        revert: "invalid",
        greedy: true
    });
    elementDrop.attr('data-id', idElement);
    tree.id = idElement;
    
    if(idData == "var"){
        var typeVar = elementDrop.data('type'),
            contentVar = elementDrop.data("content"),
            metaVar = elementDrop.data("metadatos");

        tree.tag = '<mn>' + contentVar + '</mn>';

        //metadatos;
        tree.meta['type'] = typeVar;
        tree.meta['id'] = contentVar;

        if(typeVar == 'espcifica'){
            tree.meta['value'] = metaVar;
        }
        else if(typeVar == 'discreta' || 'categorica'){
            var mm = metaVar.split(',');

            for (var ii in mm) {
                tree.meta['value'+ii] = mm[ii];
            };
        }
        else if(typeVar == 'normal'){
            var mm = metaVar.split(',');
            tree.meta['media'] = mm[1];
            tree.meta['desviacion'] = mm[3];
            tree.meta['inc'] = mm[5];
        }
        else if(typeVar == 'uniforme'){
            var mm = metaVar.split(',');
            tree.meta['inicio'] = mm[1];
            tree.meta['fin'] = mm[3];
            tree.meta['inc'] = mm[5];
        }
        else{
            var mm = metaVar.split(',');
            tree.meta['lamda'] = mm[1];
            tree.meta['inc'] = mm[3];
        }        
    }
    else if(idData == "cons"){
        //poner metadatos;
        tree.tag = '<mn>' + elementDrop.data("content") + '</mn>';
    }
    else if(idData == "llaves" || idData == "parentesis" || idData == "corchetes" || idData == "factorial"){
        var child = elementDrop.find('code:nth-child(1)');
        child.attr('data-id', ++idCode);
        child.attr('data-pos', 0);
        child.attr('data-father', idElement);
        child.addClass('ultimo-e');
        
        if (idData == 'llaves'){
            tree.opentag = '<mrow><mtext>{</mtext>';
            tree.closetag = '<mtext>}</mtext></mrow>';
        }
        else if (idData == 'parentesis'){
            tree.opentag = '<mrow><mtext>(</mtext>';
            tree.closetag = '<mtext>)</mtext></mrow>';
        }
        else if(idData == 'corchetes'){
            tree.opentag = '<mrow><mtext>[</mtext>';
            tree.closetag = '<mtext>]</mtext></mrow>';
        }
        else{
            tree.opentag = '<mrow><mtext>(</mtext>';
            tree.tag = '';
            tree.closetag = '<mtext>)!</mtext></mrow>';
        }
        tree.setChildren(['<mi>□</mi>']);        
    }
    else if(idData == "trig"){
        var child = elementDrop.find('code:nth-child(1)');
        child.attr('data-id', ++idCode);
        child.attr('data-pos', 0);
        child.attr('data-father', idElement);
        child.addClass('ultimo-e');

        tree.opentag = '<mrow><mi>' + elementDrop.data('content') + '</mi><mtext>(</mtext>';
        tree.closetag = '<mtext>)</mtext></mrow>';
        tree.setChildren(['<mi>□</mi>']);
    }
    else if(idData == "raiz"){
        var child = elementDrop.find('code:nth-child(1)');
        child.attr('data-id', ++idCode);
        child.attr('data-pos', 0);
        child.attr('data-father', idElement);
        child.addClass('ultimo-e');

        tree.opentag = '<mrow><msqrt><mtext>(</mtext>';
        tree.closetag = '</msqrt><mtext>)</mtext></mrow>';
        tree.setChildren(['<mi>□</mi>']);
    }
    else if(idData == "raiz-n"){
        var child1 = elementDrop.find("code:nth-child(1)");
        child1.attr('data-id', ++idCode);
        child1.attr('data-pos', 1);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find("code:nth-child(3)");
        child2.attr('data-id', ++idCode);
        child2.attr('data-pos', 0);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');
        
        tree.opentag = '<mrow><mroot>';
        tree.closetag = '</mroot></mrow>';
        tree.setChildren(['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "expo" || idData == "expo-base"){
        var child1 = elementDrop.find("code:nth-child(1)");
        child1.attr('data-id', ++idCode);
        child1.attr('data-pos', 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find("code:nth-child(2)");
        child2.attr('data-id', ++idCode);
        child2.attr('data-pos', 1);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');
        
        if(idData == 'expo'){
            tree.opentag = '<mrow><msup>';
            tree.closetag = '</msup></mrow>';    
        }else{
            tree.opentag = '<mrow><msub>';
            tree.closetag = '</msub></mrow>';  
        }
        tree.setChildren(['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "log"){
        var child1 = elementDrop.find("code:nth-child(1)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find("code:nth-child(2)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 1);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        tree.opentag = '<mrow><mi>' + elementDrop.data('content') + '</mi><msub>';
        tree.closetag = '</msub></mrow>';
        tree.setChildren(['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "suma" || idData == "resta" || idData == "mult" || idData == "igual"){
        var child1 = elementDrop.find("code:nth-child(1)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find("code:nth-child(2)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 2);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        tree.opentag = '<mrow><mtext>(</mtext>';
        tree.closetag = '<mtext>)</mtext></mrow>';
        tree.setChildren(['<mrow><mi>□</mi></mrow>', '<mo>' + elementDrop.data('content') + '</mo>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "funcionf"){
        var child1 = elementDrop.find("code:nth-child(1)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find("code:nth-child(2)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 2);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        tree.opentag = '<mrow><mtext>f(</mtext>';
        tree.closetag = '</mrow>';
        tree.setChildren(['<mrow><mi>□</mi></mrow>', '<mo>)=</mo>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "combinatoria"){
        var child1 = elementDrop.find("div:nth-child(2)").find("div:nth-child(1)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');

        var child2 = elementDrop.find("div:nth-child(2)").find("div:nth-child(2)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 1);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        tree.opentag = "<mrow><mtext>(</mtext><mfrac linethickness='0em'>";
        tree.closetag = '</mfrac><mtext>)</mtext></mrow>';
        tree.setChildren(['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "division"){
        var child1 = elementDrop.find("div:nth-child(2)").find("div:nth-child(1)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');

        var child2 = elementDrop.find("div:nth-child(2)").find("div:nth-child(3)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 1);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        tree.opentag = "<mrow><mtext>(</mtext><mfrac linethickness='1px'>";
        tree.closetag = '</mfrac><mtext>)</mtext></mrow>';
        tree.setChildren(['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "sumatoria" || idData == "integral" || idData == "multiplicatoria"){
        var child1 = elementDrop.find("div:nth-child(3)").find("div:nth-child(2)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');

        var child2 = elementDrop.find("div:nth-child(3)").find("div:nth-child(1)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 1);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        var child3 = elementDrop.find("code");
        child3.attr("data-id", ++idCode);
        child3.attr("data-pos", 3);
        child3.attr('data-father', idElement);
        child3.addClass('ultimo-e');

        var simbolo;
        if(idData == "sumatoria")
            simbolo = '<mo>&#x2211;</mo>';
        else if(idData == "integral")
            simbolo = '<mo>&#x222B;</mo>';
        else if(idData == "multiplicatoria")
            simbolo = '<mo>&#x220F;</mo>';

        tree.opentag = "<mrow><munderover>" + simbolo;
        tree.closetag = '</mrow>';
        tree.setChildren(['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>', '</munderover>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "func-2" || idData == "func-3" || idData == "func-4" || idData == "func-5"){
        var num = idData.substring(idData.lastIndexOf('-') + 1);
        var vec = [];

        for(var i = 0; i < num; i++){
            var text = "code:nth-child("+(i+1)+")";
            var child = elementDrop.find(text);
            
            child.attr("data-id", ++idCode);
            child.attr("data-pos", 0);
            child.attr('data-father', idElement);
            child.addClass('ultimo-e');

            vec[i] = '<mrow><mi>□</mi></mrow>';
        }

        tree.opentag = '<mrow><mtext>(</mtext>';
        tree.closetag = '<mtext>)</mtext></mrow>';
        tree.setChildren(vec);
    }

    treeActual.addNode(idFather, tree, position);
    
    
    var elementSpa = elementDrop.find('.spa');
    elementSpa.addClass('drop2');
    elementSpa.droppable(funcDroppable);    
}

(function () {
    var QUEUE = MathJax.Hub.queue;
    var math = null;
    QUEUE.Push(function () {
        math = MathJax.Hub.getAllJax("previsualizar")[0];
    });
    window.UpdateMath = function (MathML) {
        QUEUE.Push(["Text", math, MathML]);
    }
})();

function Tree(){
    this.id = '';
    this.tag = '';
    this.opentag = '';
    this.closetag = '';
    this.children = [];
    this.meta = {};
    
};

Tree.prototype.init = function(id, tag, opentag, closetag, children){
    this.id = id;
    this.tag = tag;
    this.opentag = opentag;
    this.closetag = closetag;
    this.children = children;
}
    
Tree.prototype.setChildren = function(child){
    this.children = child;
}

Tree.prototype.setChildrenPos = function(pos, children){
    console.log('children');
    console.log(children);
    this.children.splice(pos, 1, children);
}

Tree.prototype.makeString = function(){
    var r = makeStringRec(this);
    return r;
}

function makeStringRec(tree){
    var result = '';
    if(tree instanceof Tree){
        if(tree.opentag)
            result = tree.opentag;
        if(tree.tag)
            result = result + tree.tag;

        if(tree.children)
            if(tree.children.length > 0){
                for(var index in tree.children){
                    var node = tree.children[index];
                    result = result + makeStringRec(node);
                }
            }
        if(tree.closetag)
            result = result + tree.closetag;
    }
    else{
        for(var index in tree){
            result = result + tree[index];    
        }
        
    }
        
    
    return result;
}

Tree.prototype.addNode = function(idFather, data, pos){
    endFunction = false;
    if(this.children.length == 0){
        this.children = [data];
    }else{
        addNodeRec(this, idFather, function(node, err){
            if(err)
                console.log(err);
            else{
                node.setChildrenPos(pos, data);
            }
        });
    }
}

function addNodeRec(tree, idFather, callback){
    if(tree.id === idFather){
        endFunction = true;
        callback(tree);
    }
    else{
        if(!endFunction)
            if(tree.children)
                if(tree.children.length > 0){
                    for(var index in tree.children){
                        var node = tree.children[index];
                        addNodeRec(node, idFather, callback);
                    }
                }
                else
                    callback(null, 'no se encontro el id')
            else
                callback(null, 'no se encontraron hijos')
    }
}

Tree.prototype.removeNode = function(idFather, pos){
    endFunction = false;
    removeNodeRec(this, idFather, function(resp, err){
        if(err)
            console.log(err);
        else{
            resp.children[pos] = '<mi>□</mi>'
        }
            
    });
}

function removeNodeRec(tree, idFather, callback){
    if(tree instanceof Tree){
        if(tree.id == idFather){
            endFunction = true;
            callback(tree);
        }
        else{
            if(!endFunction)
                if(tree.children)
                    if(tree.children.length > 0){
                        for(var index in tree.children){
                        var node = tree.children[index];
                        addNodeRec(node, idFather, callback);
                    }
                    }
                    else{
                        callback(null, 'no se encontro el id')
                    }
                else
                    callback(null, 'no se encontraron hijos');
        }
    }
}

function rebootTree(){
    first = true;
    $(".drop").droppable(funcDroppableDrop);
    treeActual = new Tree();
    treeActual.id = 0;

}


(function () {
        var QUEUE = MathJax.Hub.queue;
        var math = null;
        window.UpdateMath = function (MathML) {
            QUEUE.Push(function () {
                if(inRespuesta)
                    math = MathJax.Hub.getAllJax(eqactuallyres)[0];
                else
                    math = MathJax.Hub.getAllJax(eqactually)[0];

            });
            QUEUE.Push(["Text", math, MathML]);
        }
    })();

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
        console.log("..");
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
            var result = "media," + jsonValues['media'] + ",desviacion," + jsonValues['desviacion'] + ",inc," + varn.inc;
            htmlVar = htmlVar + ' data-type="normal" data-metadatos="' + result + '">';
        }
        else if(varn.type == 'uniforme'){
            var result = "inicio," + jsonValues['inicio'] + ",fin," + jsonValues['fin'] + ",inc," + varn.inc;
            htmlVar = htmlVar + ' data-type="uniforme" data-metadatos="' + result + '">';
        }
        else{
            var result = "lamda," + jsonValues['lamda'];
            htmlVar = htmlVar + ' data-type="exponencial" data-metadatos="' + result + ",inc," + varn.inc + '">';
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
            revert: "invalid"
        });
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
    var result = '';
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
        return result;
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
