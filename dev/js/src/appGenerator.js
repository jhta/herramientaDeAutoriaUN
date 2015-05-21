var idCode = 0;
var first = true,
    endFunction = false,
    inRespuesta = false;

var treeActual = new Tree();

$(document).ready(function(){
    $(".image-card").children().hide();
});


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
    $("#div-iner").droppable(funcDroppableOut);
    //$('.drop').droppable(funcDroppableDrop);
});

var funcDroppableOut = {
    tolerance: "intersect",
    accept: ".card2",
    out: function( event, ui ) {
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

            elemtParent.addClass('drop2');
            elemtParent.droppable(funcDroppable);

            removeNode(treeActual, idFather, position);
            var jsn = makeString(treeActual);
            
            UpdateMath("<math>" + jsn + "</math>");
        }
        elementDrop.remove();            
    }
}
//Object dropable ...
var funcDroppableDrop = {
    tolerance: "intersect",
    accept: ".card",
    activeClass: "ui-state-default",
    hoverClass: "drop-p",
    drop: function( event, ui ) {
        var elementDrop = $(ui.draggable).clone()
        elementDrop.removeClass("image-card");
        elementDrop.children().show();
        makeTree(elementDrop, $(this));
        $(this).append(elementDrop);
        var jsn = makeString(treeActual);
        UpdateMath("<math>" + jsn + "</math>");
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
        elementDrop.removeClass("image-card");
        elementDrop.children().show();
        
        makeTree(elementDrop, $(this));
       
       $(this).append(elementDrop);
        var jsn = makeString(treeActual);
        UpdateMath("<math>" + jsn + "</math>");
        
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
        else if(typeVar == 'discreta' || typeVar == 'categorica'){
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
            var mm = metaVar;
            tree.meta['inicio'] = mm.inicio;
            tree.meta['fin'] = mm.fin;
            tree.meta['inc'] = mm.inc;
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
            child.attr("data-pos", i);
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