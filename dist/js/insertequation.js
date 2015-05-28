var eqactually = "";
var treeActivos = [];
var html = {};
var equations = {};
var idEquation = -1;

function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

$(document).ready(function(){
    $("#div-iner").hide();
    var mathml = "";


    $("#inserteq").click(function(){
        $("#div-iner").fadeIn("slow");
        $("#DeleteEquation").fadeIn();
        inRespuesta = false;
        document.getElementById('eq').focus();

        $("#"+eqactually).css('background-color', 'white');
        var preid ="equation-"+ (++idEquation);

        pasteHtmlAtCaret('<div class="pre-equation mathBlock" id='+preid+' contenteditable="false"><math></math></div>&nbsp;');
        document.getElementById(preid).innerHTML = "<math></math>";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,preid]);

        //------- guardar datos actuales
        if(!(eqactually == "")){
            treeActivos.splice(equations[eqactually], 1, treeActual);
            console.log(treeActual);
            html[eqactually] = $('.drop').html();
        }
        //--------------

        equations[preid] = idEquation
        html[preid] = "";
        rebootTree(); // reinicia el html, crea un treeactual nuevo

        $('.drop').html("");
        eqactually = preid;

        $("#"+eqactually).css('background-color', '#ccc');
    });


    function insertAtCursor(text){
        document.getElementById('eq').focus() ; // DIV with cursor is 'myInstance1' (Editable DIV)
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                var lines = text.replace("\r\n", "\n").split("\n");
                var frag = document.createDocumentFragment();
                for (var i = 0, len = lines.length; i < len; ++i) {
                    if (i > 0) {
                        frag.appendChild( document.createElement("br") );
                    }
                    frag.appendChild( document.createTextNode(lines[i]) );
                }

                range.insertNode(frag);
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = text;
        }
    }

    function pasteHtmlAtCaret(html) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // only relatively recently standardized and is not supported in
                // some browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    }


    $("#eq").on("click", ".pre-equation", function () {
      $("#div-iner").fadeIn("slow");
        inRespuesta = false;
        var idpre = $(this).attr('id');
        var idsplit = idpre.split('-')[1];
        //------- guardar datos actuales
        treeActivos.splice(equations[eqactually], 1, treeActual);
        html[eqactually] = $('.drop').html();
        //--------------

        //Quitar color activo al recuadro de la expresión
        $("#"+eqactually).css('background-color', 'white');

        //$('#previsualizar').text(html[eqactually]);
        eqactually = idpre;

        //Colocar color a la nueva expresión que se ha seleccionado
        $("#"+eqactually).css('background-color', '#ccc');

        $('.panel-2').html("");

        $('.panel-2').html(html[eqactually]);

        if(html[eqactually] == "")
            $(".panel-2").droppable(funcDroppableDrop);
        else
            $(".panel-2").droppable(funcDroppableFalse); //desactiva drop en la base

        treeActual = treeActivos[idsplit];
        $('.drop div').each(function(index){
            if($(this).hasClass("ultimo-e")){
                $(this).droppable(funcDroppable);

            }else if($(this).hasClass("card2")){
                $(this).draggable({
                    appendTo: "body",
                    cursor: "move",
                    revert: "invalid"
                });
            }
        });
    });
});

function cleanFormulationVars(){
    eqactually = "";
    treeActivos = [];
    html = {};
    equations = {};
    idEquation = -1;
}
