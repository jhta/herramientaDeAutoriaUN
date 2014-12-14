


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
    $("#droppable-out").droppable({
        tolerance: "intersect",
        accept: ".card2",
        drop: function( event, ui ) {
            var elementDrop = $(ui.draggable);

            var father = elementDrop.parent().data("id");
            
            if (elementDrop.data("id") == "var" || elementDrop.data("id") == "cons") {
                var stringvar = "";
                addvar(father, objson, stringvar);            
            } else {
                var nodo = removeNode(father, objson, []);
                
            }
            mathml = "";
            stringmathml(objson);
            UpdateMath("<math>" + mathml + "</math>");
            
            
            elementDrop.remove();
            if(elementDrop.hasClass("first")){
                $(".drop").droppable("enable");
                first = true;
                UpdateMath("<math>" + "" + "</math>");
            }
        }
    });

});

$(function() {
    
    $(".drop").droppable({
        tolerance: "intersect",
        accept: ".card",
        activeClass: "ui-state-default",
        hoverClass: "drop-p",
        drop: function( event, ui ) {
            var elementDrop = $(ui.draggable).clone();
            var idData = elementDrop.data("id");
            
            elementDrop.addClass("card2");
            elementDrop.removeClass("card");
            
            elementDrop.draggable({
                appendTo: "body",
                cursor: "move",
                revert: "invalid",
                greedy: true
            });
            
            if(idData == "var"){
                //elementDrop.css("padding", "0 6px");
                elementDrop.css("border", "0px");
            }
            else if(idData == "cons"){
                
            }
            else if(idData == "llaves" || idData == "parentesis" || idData == "corchetes" || idData == "factorial"){
                elementDrop.attr('data-id', ++id);
                elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
                
                objson["id"] = idData;        
                objson["children"] = [];
                
                if (idData == "llaves") 
                    objson["etiqueta"] = "<mtext>{</mtext>";
                else if (idData == "parentesis" ) 
                    objson["etiqueta"] = "<mtext>(</mtext>";
                else if(idData == "factorial"){
                    objson["etiqueta"] = "<mtext>(</mtext>";
                    banderafactorial = true;
                }
                else 
                    objson["etiqueta"] = "<mtext>[</mtext>";
                
                
                //Funcion para general el JSON
                makeJsonGroup(elementDrop);
                
                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);
                
            }
            else if(idData == "sumatoria" || idData == "integral" || idData == "multiplicatoria"){
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                elementDrop.attr('data-id', ++id);
                elementDrop.find("div:nth-child(2)").find("div:nth-child(1)").attr('data-id', ++id);
                elementDrop.find("div:nth-child(2)").find("div:nth-child(2)").attr('data-id', ++id);
                elementDrop.find("code").attr('data-id', ++id);
                
                //Funcion para general el JSON
                makeJsonSummation(elementDrop,false);
                
                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);
                
            
            }else if(idData == "trig") {
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");

                elementDrop.attr('data-id', $(this).data("id"));
                elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
                //Funcion para general el JSON
                makeJsonOneParameter(idData, elementDrop, false);

                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);

            }
            else if(idData == "raiz") {
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");

                elementDrop.attr('data-id', $(this).data("id"));
                elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
                //Funcion para general el JSON
                makeJsonRaiz(idData, elementDrop, false);

                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);

            }
            else if(idData == "raiz-n") {
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");

                elementDrop.attr('data-id', $(this).data("id"));
                elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
                elementDrop.find("code:nth-child(3)").attr('data-id', ++id);

                //Funcion para general el JSON
                makeJsonNRaiz(idData, elementDrop, false);

                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);

            }
            else if(idData == "expo" || idData == "expo-base") {
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                elementDrop.data("data-id", $(this).data("id"));
                elementDrop.find("code:nth-child(1)").attr("data-id", ++id);
                elementDrop.find("code:nth-child(2)").attr("data-id", ++id);
                
                makeJsonExpo(idData, elementDrop, false);
                
                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);
            }
            else if(idData == "log") {
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");

                elementDrop.data("data-id", $(this).data("id"));
                elementDrop.find("code:nth-child(1)").attr("data-id", ++id);
                elementDrop.find("code:nth-child(2)").attr("data-id", ++id);
                //Funcion para general el JSON
                makeJsonLog(idData, elementDrop, false);

                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);

            }
            else if(idData == "combinatoria") {
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");

                
                elementDrop.attr('data-id', ++id);
                elementDrop.find("div:nth-child(2)").find("div:nth-child(1)").attr('data-id', ++id);
                elementDrop.find("div:nth-child(2)").find("div:nth-child(2)").attr('data-id', ++id);

                
                //Funcion para general el JSON
                makeJsonCombi(idData, elementDrop, false);

                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);

            }
            
            else if(idData == "funcionf") {
                banderafuncionf = true;
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");

                
                elementDrop.attr('data-id', ++id);
                elementDrop.find("code:nth-child(1)").attr("data-id", ++id);
                elementDrop.find("code:nth-child(2)").attr("data-id", ++id);

                
                //Funcion para general el JSON
                makeJsonFuncionf(idData, elementDrop, false);

                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);

            }
            else if(idData == "func-2" || idData == "func-3" || idData == "func-4" || idData == "func-5"){
                banderafuncionfn = true;
                var num = idData.substring( idData.lastIndexOf('-') + 1);
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");
                elementDrop.attr('data-id', ++id);
                
                for(var i = 0; i < num; i++){
                    var text = "code:nth-child("+(i+1)+")";
                    elementDrop.find(text).attr("data-id", ++id);
                }
                
                /*if(num == 2){
                    makeJsonFuncionf2(idData, elementDrop, false);
                }
                else if(num == 3){
                    makeJsonFuncionf3(idData, elementDrop, false);
                }
                else if(num == 4){
                    makeJsonFuncionf4(idData, elementDrop, false);
                }
                else{
                    makeJsonFuncionf5(idData, elementDrop, false);
                }*/
                
                makeJsonFuncionfn(idData, elementDrop, num, false);
                
                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);
            }
            else if(idData == "division") {
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");

                
                elementDrop.attr('data-id', ++id);
                elementDrop.find("div:nth-child(2)").find("div:nth-child(1)").attr('data-id', ++id);
                elementDrop.find("div:nth-child(2)").find("div:nth-child(2)").attr('data-id', ++id);

                
                //Funcion para general el JSON
                makeJsonDivsion(idData, elementDrop, false);

                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);

            }
            else{
                elementDrop.data("data-id", ++id);
                elementDrop.find("code:nth-child(1)").attr("data-id", ++id);
                elementDrop.find("code:nth-child(2)").attr("data-id", ++id);
                
                
                objson["id"] = idData;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                //Funcion para general el JSON
                makeJsonOther(idData, elementDrop, false);                
                
                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);
                
            }
            

                if($(this).children().length < 1){
                    $(this).append(elementDrop);
                    $(this).css("padding","0px 0px 0px 6px");
                }
            mathml = "";
            stringmathml(objson);
            UpdateMath("<math>" + mathml + "</math>");

            console.log(JSON.stringify(objson));
            console.log(mathml);
            if(first){
                $(this).droppable("disable");
                first = false;
                elementDrop.addClass("first");
            }
        }
    });
});

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

        var idData = elementDrop.data("id");
        
        elementDrop.addClass("card2");
        elementDrop.removeClass("card");

        elementDrop.draggable({
                appendTo: "body",
                cursor: "move",
                revert: "invalid",
                greedy: true
            });
        
        if($(this).children().length < 1){
            $(this).append(elementDrop);

            //$(this).css("padding","0px 0px 0px 6px");
           
            //$(this).css("border", "none");
            if(idData == "sumatoria" || idData == "integral" || idData == "multiplicatoria")
                 $(this).css("display", "flex");
            else
                 $(this).css("display", "block");
            
        }
        
        if(idData == "var"){
            //elementDrop.css("padding", "0 6px");
            elementDrop.css("border", "0px");
            var stringvar = "<mn>" + elementDrop.data("content") + "</mn>";
            addvar(elementDrop.parent().data("id"), objson, stringvar);
        }
        else if(idData == "cons"){
            //elementDrop.css("padding", "0 0 0 6px");
            elementDrop.css("border", "0px");
            var stringvar = "<mi>" + elementDrop.data("content") + "</mi>";
            addvar(elementDrop.parent().data("id"), objson, stringvar);
                        
        }
        else if(idData == "llaves" || idData == "parentesis" || idData == "corchetes"|| idData == "factorial"){
            //elementDrop.css("padding", "0");
            elementDrop.css("border", "0px");
            
            elementDrop.attr('data-id', $(this).data("id"));
            elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
            
            
            var data = [];
            var item = {};
            
            item["id"] = elementDrop.find("code:nth-child(1)").data("id");
            if (idData == "llaves")
                item["etiqueta"] = "<mtext>{</mtext>";
            else  if (idData == "parentesis" || idData == "factorial")
                item["etiqueta"] = "<mtext>(</mtext>";
            else  if(idData == "corchetes")
                item["etiqueta"] = "<mtext>[</mtext>";
           else if(idData == "factorial")
                item["etiqueta"] = "<mtext>(</mtext>";
                
            
            item["children"] = [];
            data.push(item);
            
            var nodo = addNode(elementDrop.parent().data("id"), objson, data);
            
            makeJsonGroup(elementDrop);
            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);
            
            
        }
       else if(idData == "sumatoria" || idData == "integral" || idData == "multiplicatoria"){
            //elementDrop.css("padding", "0");
            elementDrop.css("border", "0px");
            elementDrop.css("display", "flex !important");
            elementDrop.attr('data-id', ++id);
            elementDrop.find("div:nth-child(3)").find("div:nth-child(1)").attr('data-id', ++id);
            elementDrop.find("div:nth-child(3)").find("div:nth-child(2)").attr('data-id', ++id);
            elementDrop.find("code").attr('data-id', ++id);

            //Funcion para general el JSON
            makeJsonSummation(elementDrop,true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);
        
        }
       else if(idData == "expo" || idData == "expo-base") {
            elementDrop.css("border", "0px");
            elementDrop.css("display", "flex !important");
            
            elementDrop.attr('data-id', ++id);
            elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
            elementDrop.find("code:nth-child(2)").attr('data-id', ++id);

            //Funcion para general el JSON
            makeJsonExpo(idData, elementDrop,true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);
            }
       
       else if(idData == "trig") {
            elementDrop.css("padding", "0");
            elementDrop.css("border", "0px");

            elementDrop.attr('data-id', $(this).data("id"));
            elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
            //Funcion para general el JSON
            makeJsonOneParameter(idData, elementDrop, true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);

        } 
       else if(idData == "log") {
            elementDrop.css("border", "0px");
            elementDrop.css("display", "flex !important");
            
            elementDrop.attr('data-id', ++id);
            elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
            elementDrop.find("code:nth-child(2)").attr('data-id', ++id);

            //Funcion para general el JSON
            makeJsonLog(idData, elementDrop,true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);
            }
       
       else if(idData == "combinatoria") {
            elementDrop.css("border", "0px");
            elementDrop.css("display", "flex !important");
            
            elementDrop.attr('data-id', ++id);
            elementDrop.find("div:nth-child(2)").find("div:nth-child(1)").attr('data-id', ++id);
            elementDrop.find("div:nth-child(2)").find("div:nth-child(2)").attr('data-id', ++id);

            //Funcion para general el JSON
            makeJsonCombi(idData, elementDrop,true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);
            }
       
       else if(idData == "funcionf") {
           banderafuncionf = true;
            elementDrop.css("border", "0px");
            elementDrop.css("display", "flex !important");
            
            elementDrop.attr('data-id', ++id);
            elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
            elementDrop.find("code:nth-child(2)").attr('data-id', ++id);

            //Funcion para general el JSON
            makeJsonFuncionf(idData, elementDrop,true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);
        }
       else if(idData == "func-2" || idData == "func-3" || idData == "func-4" || idData == "func-5"){
           banderafuncionfn = true;
           var num = idData.substring( idData.lastIndexOf('-') + 1);
                objson["id"] = ++id;
                objson["etiqueta"] = "";
                objson["children"] = [];
                
                elementDrop.css("padding", "0");
                elementDrop.css("border", "0px");
                elementDrop.attr('data-id', ++id);
                
                for(var i = 0; i < num; i++){
                    var text = "code:nth-child("+(i+1)+")";
                    elementDrop.find(text).attr("data-id", ++id);
                }
                
                /*if(num == 2){
                    makeJsonFuncionf2(idData, elementDrop, true);
                }
                else if(num == 3){
                    makeJsonFuncionf3(idData, elementDrop, true);
                }
                else if(num == 4){
                    makeJsonFuncionf4(idData, elementDrop, true);
                }
                else{
                    makeJsonFuncionf5(idData, elementDrop, true);
                }*/
           
                makeJsonFuncionfn(idData, elementDrop, num, true);
                
                var elementSpa = elementDrop.find(".spa");
                elementSpa.addClass("drop2");
                elementSpa.droppable(funcDroppable);
       }
       
       else if(idData == "division") {
            elementDrop.css("border", "0px");
            elementDrop.css("display", "flex !important");
            
            elementDrop.attr('data-id', ++id);
            elementDrop.find("div:nth-child(2)").find("div:nth-child(1)").attr('data-id', ++id);
            elementDrop.find("div:nth-child(2)").find("div:nth-child(2)").attr('data-id', ++id);

            //Funcion para general el JSON
            makeJsonDivsion(idData, elementDrop,true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);
            }
       
       else if(idData == "raiz-n") {


            elementDrop.css("padding", "0");
            elementDrop.css("border", "0px");

            elementDrop.attr('data-id', $(this).data("id"));
            elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
            elementDrop.find("code:nth-child(3)").attr('data-id', ++id);

            //Funcion para general el JSON
            makeJsonNRaiz(idData, elementDrop, true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);

        }
        else{
            //elementDrop.css("padding", "0");
            elementDrop.css("border", "0px");
            
            elementDrop.attr('data-id', $(this).data("id"));
            elementDrop.find("code:nth-child(1)").attr('data-id', ++id);
            elementDrop.find("code:nth-child(2)").attr('data-id', ++id);
            
            
            //Funcion para general el JSON
            makeJsonOther(idData, elementDrop, true);

            var elementSpa = elementDrop.find(".spa");
            elementSpa.addClass("drop2");
            elementSpa.droppable(funcDroppable);
            
        }
        mathml = "";
        stringmathml(objson);
        UpdateMath("<math>" + mathml + "</math>");
        console.log(JSON.stringify(objson));
        console.log(mathml);
        
    }
};

function makeJsonOther(idData, element, nodo){
    var item = {};
    var data = [];
    
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "operador";
    
    if (idData == "suma") {
        item["etiqueta"] = "<mo>+<\/mo>";
    } else if (idData == "resta") {
        item["etiqueta"] = "<mo>-<\/mo>";
    } else if (idData == "mult") {
        item["etiqueta"] = "<mo>*<\/mo>";
    } else 
        item["etiqueta"] = "<mo>=<\/mo>";
    
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = element.find("code:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}

function makeJsonRaiz(idData, element, nodo) {
    var item = {};
    var data = [];
    

    item["id"] = idData;
    item["etiqueta"] =  "<msqrt> " ;
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);

}

function makeJsonNRaiz(idData, element, nodo) {
    var item = {};
    var data = [];


    item["id"] = idData;
    item["etiqueta"] =  "<mroot> " ;
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = element.find("code:nth-child(3)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo){
        data.push(item);
        //alert(data);
        //console.log(JSON.stringify(objson));
        //console.log("Antes de ");
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);

}

function makeJsonCombi(idData, element, nodo){
    var item = {};
    var data = [];
    
    item["id"] = idData;
    item["etiqueta"] =  "<mo>(</mo> <mfrac linethickness='0em'>";
    
    
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = element.find("div:nth-child(2)").find("div:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("div:nth-child(2)").find("div:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    
    
    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}

function makeJsonFuncionf(idData, element, nodo){
    var item = {};
    var data = [];
    
    item["id"] = idData;
    item["etiqueta"] =  "<mi>f</mi><mtext>(</mtext>";
    
    
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext><mo>=<\/mo>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    
    
    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}

/*function makeJsonFuncionf2(idData, element, nodo){
    var item = {};
    var data = [];
    
    item["id"] = idData;
    item["etiqueta"] =  "<mtext>(</mtext>";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mtext>(</mtext><mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    
    
    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}*/

/*function makeJsonFuncionf3(idData, element, nodo){
    var item = {};
    var data = [];
    
    item["id"] = idData;
    item["etiqueta"] =  "<mtext>(</mtext>";
    
    
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(3)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    
    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}*/

/*function makeJsonFuncionf4(idData, element, nodo){
    var item = {};
    var data = [];
    
    item["id"] = idData;
    item["etiqueta"] =  "<mtext>(</mtext>";
    
    
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(3)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(4)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];
    
    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}*/

/*function makeJsonFuncionf5(idData, element, nodo){
    var item = {};
    var data = [];
    
    item["id"] = idData;
    item["etiqueta"] =  "<mtext>(</mtext>";
    
    
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(3)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(4)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("code:nth-child(5)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow><mtext>)</mtext>";
    item["children"] = [];

    
    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}*/

function makeJsonFuncionfn(idData, element, num, nodo){
    var item = {};
    var data = [];
    
    for(var i = 0; i < num; i++){
        var text = "code:nth-child("+(i+1)+")";
        
        item = {};
        item["id"] = "row";
        item["etiqueta"] = "<mrow>";
        item["children"] = [];
        
        if(nodo)
            data.push(item);
        else
            objson.children.push(item);
        
        
        
        item = {};
        item["id"] = element.find(text).data("id");
        item["etiqueta"] = "";
        item["children"] = [];
        
        if(nodo)
            data.push(item);
        else
            objson.children.push(item);
        
        item = {};
            item["id"] = "row";
            item["etiqueta"] = "</mrow>";
            item["children"] = [];
        
        if(i == num-1){
            

            if(nodo){
                data.push(item);
                var isNodo = addNode(element.parent().data("id"), objson, data);
            }
            else
                objson.children.push(item);
        }
        else{
        

            if(nodo)
                data.push(item);
            else
                objson.children.push(item);
        }
        
        
    }
    
}

function makeJsonDivsion(idData, element, nodo){
    var item = {};
    var data = [];
    
    item["id"] = idData;
    item["etiqueta"] =  "<mo>(</mo> <mfrac linethickness='1px'>";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = element.find("div:nth-child(2)").find("div:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    
    if(nodo)
        data.push(item);
    else
        objson.children.push(item);
    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    
    item = {};
    item["id"] = element.find("div:nth-child(2)").find("div:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    
    
    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}

function makeJsonExpo(idData, element, nodo) {
    var item = {};
    var data = [];


    item["id"] = idData;
    if(idData == "expo")
        item["etiqueta"] =  "<msup>";
    else
        item["etiqueta"] =  "<msub>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    //---------------- mrow2
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = element.find("code:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);
    
}

function makeJsonLog(idData, element, nodo){
    var item = {};
    var data = [];
    

    item["id"] = "log";
    item["etiqueta"] =  "<mi>" + element.data("content") + "</mi> <msub>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    //---------------- mrow2
    item = {};
    item["id"] = "row";
    item["etiqueta"] = "<mrow>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = element.find("code:nth-child(2)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = "row";
    item["etiqueta"] = "</mrow>";
    item["children"] = [];

    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);

}

function makeJsonOneParameter(idData, element, nodo) {
    var item = {};
    var data = [];
    

    item["id"] = "trig";
    item["etiqueta"] =  "<mi>" + element.data("content") + "</mi>";
    item["children"] = [];

    if(nodo)
        data.push(item);
    else
        objson.children.push(item);

    item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];

    if(nodo){
        data.push(item);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }
    else
        objson.children.push(item);

}

function makeJsonGroup(element){
    var item = {};
    item["id"] = element.find("code:nth-child(1)").data("id");
    item["etiqueta"] = "";
    item["children"] = [];
    objson.children.push(item);
}

function makeJsonSummation(element,nodo){

    var item = {};
    var item2 = {};
    var data = [];
    item["id"] = element.data("id");
    var idData = element.data("id");
    if(idData == "sumatoria" ){
        item["etiqueta"] = "<munderover><mo>&sum;</mo>";
    }else if(idData == "integral"){
        item["etiqueta"] = "<munderover><mo>&int;</mo>";
    }else if(idData == "multiplicatoria"){
        item["etiqueta"] = "<munderover><mo>&#928;</mo>";
    }

    item["children"] = [];


    item2["id"] = element.find("div:nth-child(3)").find("div:nth-child(2)").data("id");
    item2["etiqueta"] = "<mtext></mtext>";
    item2["children"] = [];

    item.children.push(item2);

    item2 = {};
    item2["id"] = element.find("div:nth-child(3)").find("div:nth-child(1)").data("id");
    item2["etiqueta"] = "<mtext></mtext>";
    item2["children"] = [];

    item.children.push(item2);


    item2 = {};
    item2["id"] = element.find("code").data("id");
    item2["etiqueta"] = "";
    item2["children"] = [];

    if(nodo) {
        data.push(item);
        data.push(item2);
        var isNodo = addNode(element.parent().data("id"), objson, data);
    }else {
        objson.children.push(item);
        objson.children.push(item2);
    }

    
}

function findNode(id, currentNode) {
    if (id == currentNode.id) {
        return currentNode;
    } else {
        var result;
        for (var index in currentNode.children) {
            var node = currentNode.children[index];

            if (node.id == id) return node;
            findNode(id, node);
        }
    }
}

//Agrega un nuevo elemento al json, sus parámetros el id del padre donde debe ser agrego, el json o ellugar donde se encuentre el json(debido a que es una función recursiva) y el array que contiene los datos que deben ser agregados
function addNode(id, currentNode, data) {
    if (id == currentNode.id) {
        currentNode.children = data;
        //currentNode.etiqueta = "";
        return currentNode;
    } else {
        var result;
        for (var index in currentNode.children) {
            var node = currentNode.children[index];

            if (node.id == id) {
                node.children = data;
                //node.etiqueta = "";
                return node;
            }
            addNode(id, node, data);
        }
    }
}

function addnewinput(object,type){

    var elementDrop = $("#base").clone();
    var idData = elementDrop.data("id");
    elementDrop.addClass("card2");
    elementDrop.removeClass("card");

    elementDrop.draggable({
        appendTo: "body",
        cursor: "move",
        revert: "invalid",
        greedy: true
    });

    elementDrop.attr('data-content',object.value);
    elementDrop.attr('data-id',type);

    $(object).parent().append(elementDrop);
    $(object).parent().css("display", "block");
    elementDrop.children().html(object.value);

    elementDrop.css("border", "0px");
    var stringvar = "<mtext>" + object.value + "</mtext>";
    var id=$(object).parent().data("id");
    $(object).remove();
    addvar( id, objson, stringvar);

    /*
    if(type == "var"){
        elementDrop.css("border", "0px");
        var stringvar = "<mn>" + object.value + "</mn>";
        var id=$(object).parent().data("id");
        $(object).remove();
        addvar( id, objson, stringvar);
    }
    else if(type== "cons"){
        console.log("Entro al segundo if");
        elementDrop.css("border", "0px");
        var stringvar = "<mi>" + object.value + "</mi>";
        var id=$(object).parent().data("id");
        $(object).remove();
        addvar( id, objson, stringvar);
    }
    */
    mathml = "";
    stringmathml(objson);
    UpdateMath("<math>" + mathml + "</math>");
    console.log(JSON.stringify(objson));
    console.log(mathml);
}

function removeNode(id, currentNode, data) {

    if (id == currentNode.id) {
        currentNode.children = data;
        //currentNode.etiqueta = "";
        return currentNode;
    } else {
        var result;
        for (var index in currentNode.children) {
            var node = currentNode.children[index];

            if (node.id == id) {
                node.children = data;
                //node.etiqueta = "";
                return node;
            }
            addNode(id, node, data);
        }
    }
}

function addvar(id, currentNode, datavar) {

    if (id == currentNode.id) {
        //currentNode.children=data;
        currentNode.etiqueta = datavar;
        return currentNode;
    } else {
        var result;
        for (var index in currentNode.children) {
            var node = currentNode.children[index];

            if (node.id == id) {
                //node.children=data;
                node.etiqueta = datavar;
                return node;
            }
            addvar(id, node, datavar);
        }
    }
}

//Lee todo el json, obteniendo solo las etiquetas que necesita para obtener sólo codigo mathml leíble por el previsualizador.
function stringmathml(currentNode) {
    var result;
    var bandera=false;
    mathml = mathml + currentNode.etiqueta;
    var banderaraiz=false;
    var banderanraiz=false;
    var banderanExpoL=false;
    var banderanExpoU=false;
    var banderanCombi=false;
    if (currentNode.children.length > 0) {
        
        for (var index in currentNode.children) {


            var node = currentNode.children[index];
            if(node.etiqueta.indexOf("<msqrt>") >= 0){
                banderaraiz=true;
            }
            if(node.etiqueta.indexOf("<mroot>") >= 0){
                banderanraiz=true;
            }
            if(node.etiqueta.indexOf("<msup>") >= 0){
                banderanExpoU=true;
            }
            
            if(node.etiqueta.indexOf("<msub>") >= 0){
                banderanExpoL=true;
            }
            if(node.etiqueta.indexOf("linethickness") >= 0){
                banderanCombi=true;
                banderanCombiG=true;
            }
            
            //mathml = mathml + node.etiqueta;
            stringmathml(node);
        }
        if(banderaraiz){
            mathml = mathml + "</msqrt>";
        }
        if(banderanraiz){
            mathml = mathml + "</mroot>";
        }
        if(banderanExpoU){
            mathml = mathml + "</msup>";
		}
        if(banderanExpoL){
            mathml = mathml + "</msub>";
		}
        
        if(banderanCombi){
            mathml = mathml + "</mfrac><mo>)</mo>";
		}
        mathml = mathml + "";

    }
    
    if (currentNode.etiqueta.indexOf("{") >= 0){
        mathml = mathml + "<mtext>}</mtext>";
    }
    else if (currentNode.etiqueta.indexOf("(") >= 0 && !banderanCombiG && !banderafuncionf && !banderafuncionfn){
        if(banderafactorial)
            mathml = mathml + "<mtext>)!</mtext>";
        else
            mathml = mathml + "<mtext>)</mtext>";
    }else if (currentNode.etiqueta.indexOf("[") >= 0){
        mathml = mathml + "<mtext>]</mtext>";
    }else if (currentNode.etiqueta.indexOf("<munderover>") >= 0){
        mathml = mathml + "</munderover>";
    }/*else if (currentNode.etiqueta.indexOf("<msup>") >= 0 && banderanExpo == false){
        mathml = mathml + "</mrow></msup>";
    }*/

}





