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

            removeNode(treeActual, idFather, position);
            var jsn = makeString(treeActual);

            
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
        var jsn = makeString(treeActual);

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
        var jsn = makeString(treeActual);
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

        if(typeVar == 'especifica'){
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
        var child = elementDrop.find('.code:nth-of-type(1)');
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
        setChildren(tree,['<mi>□</mi>']);
    }
    else if(idData == "trig"){
        var child = elementDrop.find('.code:nth-of-type(1)');
        child.attr('data-id', ++idCode);
        child.attr('data-pos', 0);
        child.attr('data-father', idElement);
        child.addClass('ultimo-e');

        tree.opentag = '<mrow><mi>' + elementDrop.data('content') + '</mi><mtext>(</mtext>';
        tree.closetag = '<mtext>)</mtext></mrow>';
        setChildren(tree,['<mi>□</mi>']);
    }
    else if(idData == "raiz"){
        var child = elementDrop.find('.code:nth-of-type(1)');
        child.attr('data-id', ++idCode);
        child.attr('data-pos', 0);
        child.attr('data-father', idElement);
        child.addClass('ultimo-e');

        tree.opentag = '<mrow><msqrt><mtext>(</mtext>';
        tree.closetag = '</msqrt><mtext>)</mtext></mrow>';
        setChildren(tree,['<mi>□</mi>']);
    }
    else if(idData == "raiz-n"){
        var child1 = elementDrop.find(".code:nth-of-type(1)");
        child1.attr('data-id', ++idCode);
        child1.attr('data-pos', 1);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find(".code:nth-of-type(2)");
        child2.attr('data-id', ++idCode);
        child2.attr('data-pos', 0);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');
        
        tree.opentag = '<mrow><mroot>';
        tree.closetag = '</mroot></mrow>';
        setChildren(tree,['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "expo" || idData == "expo-base"){
        var child1 = elementDrop.find(".code:nth-of-type(1)");
        child1.attr('data-id', ++idCode);
        child1.attr('data-pos', 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find(".code:nth-of-type(2)");
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
        setChildren(tree,['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "log"){
        var child1 = elementDrop.find(".code:nth-of-type(1)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find(".code:nth-of-type(2)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 1);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        tree.opentag = '<mrow><mi>' + elementDrop.data('content') + '</mi><msub>';
        tree.closetag = '</msub></mrow>';
        setChildren(tree,['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "suma" || idData == "resta" || idData == "mult" || idData == "igual"){
        var child1 = elementDrop.find(".code:nth-of-type(1)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find(".code:nth-of-type(2)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 2);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        tree.opentag = '<mrow><mtext>(</mtext>';
        tree.closetag = '<mtext>)</mtext></mrow>';
        setChildren(tree,['<mrow><mi>□</mi></mrow>', '<mo>' + elementDrop.data('content') + '</mo>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "funcionf"){
        var child1 = elementDrop.find(".code:nth-of-type(1)");
        child1.attr("data-id", ++idCode);
        child1.attr("data-pos", 0);
        child1.attr('data-father', idElement);
        child1.addClass('ultimo-e');
        
        var child2 = elementDrop.find(".code:nth-of-type(2)");
        child2.attr("data-id", ++idCode);
        child2.attr("data-pos", 2);
        child2.attr('data-father', idElement);
        child2.addClass('ultimo-e');

        tree.opentag = '<mrow><mtext>f(</mtext>';
        tree.closetag = '</mrow>';
        setChildren(tree,['<mrow><mi>□</mi></mrow>', '<mo>)=</mo>', '<mrow><mi>□</mi></mrow>']);
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
        setChildren(tree,['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
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
        setChildren(tree,['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>']);
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

        var child3 = elementDrop.find(".code");
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
        setChildren(tree,['<mrow><mi>□</mi></mrow>', '<mrow><mi>□</mi></mrow>', '</munderover>', '<mrow><mi>□</mi></mrow>']);
    }
    else if(idData == "func-2" || idData == "func-3" || idData == "func-4" || idData == "func-5"){
        var num = idData.substring(idData.lastIndexOf('-') + 1);
        var vec = [];

        for(var i = 0; i < num; i++){
            var text = ".code:nth-of-type("+(i+1)+")";
            var child = elementDrop.find(text);
            
            child.attr("data-id", ++idCode);
            child.attr("data-pos", 0);
            child.attr('data-father', idElement);
            child.addClass('ultimo-e');

            vec[i] = '<mrow><mi>□</mi></mrow>';
        }

        tree.opentag = '<mrow><mtext>(</mtext>';
        tree.closetag = '<mtext>)</mtext></mrow>';
        setChildren(tree,vec);
    }

    addNode(treeActual,idFather, tree, position);
    
    
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

function init(tree, id, tag, opentag, closetag, children){
    tree.id = id;
    tree.tag = tag;
    tree.opentag = opentag;
    tree.closetag = closetag;
    tree.children = children;
}

function setChildren(tree, child){
    tree.children = child;
}

function setChildrenPos(tree, pos, children){
    console.log('children');
    console.log(children);
    tree.children.splice(pos, 1, children);
}

function makeString(tree){
    var r = makeStringRec(tree);
    return r;
}

function addNode(tree, idFather, data, pos){
    endFunction = false;
    if(tree.children.length == 0){
        tree.children = [data];
    }else{
        addNodeRec(tree, idFather, function(node, err){
            if(err)
                console.log(err);
            else{
                setChildrenPos(node, pos, data);
            }
        });
    }
}

function removeNode(tree, idFather, pos){
    endFunction = false;
    removeNodeRec(tree, idFather, function(resp, err){
        if(err)
            console.log(err);
        else{
            resp.children[pos] = '<mi>□</mi>'
        }
    });
}

/*
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
}*/

function makeStringRec(tree){
    var result = '';
    if(tree instanceof Tree || tree instanceof Object){
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

/*

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
}*/

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

/*
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
*/

function removeNodeRec(tree, idFather, callback){
    if(tree instanceof Tree || tree instanceof Object){
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

function addnewinput(objec){
    var elementDrop = $("#baseInput").clone();
    elementDrop.show();
    elementDrop.find(".var").html($(objec).val());
    elementDrop.removeAttr('id');
    makeTree(elementDrop, $(objec).parent());
     var padre=  $(objec).parent();
    $(objec).remove();
    padre.append(elementDrop);

    var jsn = makeString(treeActual);
    UpdateMath("<math>" + jsn + "</math>");


}

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
        TOGGLE_TAB_RES = true;
    });

    //toogle nav superior
    $("#tab-formulacion").click(function(){
        TOGGLE_TAB_RES = false;
        $("#panelOtros").removeClass("hide");
    })

    //toogle nav superior
    $("#tab-metadatos").click(function(){
        TOGGLE_TAB_RES = false;
        $("#panelOtros").removeClass("hide");
    })
    $('#rootwizard').bootstrapWizard();
    $("#valor").rating();
    $("#valorA").rating();

     $("body").on("focus",".input-res", function(){
        console.log("fsfa");
        console.log($(this).attr("id"));
        console.log($(this).val());
        focusElement = $(this);
    });
     
     $("body").on("click", ".card", function(){
        if(TOGGLE_TAB_RES) {
            if($(this).data("id") == "var") {
                 var caret = focusElement.caret();
                console.log("el caret es ",focusElement.caret());
                focusElement.val(focusElement.val()).caret(caret).caret($(this).data('content')).val();
            }else {
                console.log($(this).data("code"));
                console.log(focusElement);
                console.log(focusElement.caret());
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

        }
    }
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