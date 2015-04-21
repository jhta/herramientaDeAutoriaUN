var eqactually = "";
var treeActivos = [];
var html = {};
var equations = {};
var idEquation = -1;
$(document).ready(function(){
    $("#div-iner").hide();
    var mathml = "";

    $("#inserteq").click(function(){
        $("#div-iner").fadeIn("slow");
        inRespuesta = false;
        document.getElementById('eq').focus();
        var preid ="equation-"+ (++idEquation);

        $("#"+eqactually).css('background-color', '#ccc');

        pasteHtmlAtCaret('<div class="pre-equation mathBlock" id='+preid+'><math></math></div>&nbsp;');
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
        inRespuesta = false;
        var idpre = $(this).attr('id');
        var idsplit = idpre.split('-')[1];
        //------- guardar datos actuales
        treeActivos.splice(equations[eqactually], 1, treeActual);
        html[eqactually] = $('.drop').html();
        //--------------

        //Quitar color activo al recuadro de la expresión
        $("#"+eqactually).css('background-color', '#ccc');



        //$('#previsualizar').text(html[eqactually]);
        eqactually = idpre;

        //Colocar color a la nueva expresión que se ha seleccionado
        $("#"+eqactually).css('background-color', '#F0F514');

        $('.panel-2').html("");

        $('.panel-2').html(html[eqactually]);

        if(html[eqactually] == ""){
            $(".panel-2").droppable(funcDroppableDrop);
        }
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




    function equationsToXml(){

        var array = [];
        var idEquations = [];
        var bools = [];

        //Esto se hace, porque no se tiene la certeza de que la última ecuacion
        // que se ha creado ya esten guardados sus datos en los json globables
        treeActivos[equations[eqactually]] = treeActual;
        html[eqactually+""] = $('.drop').html();
        var i=0;
        var objecto = $("#eq").html();
        $("#eq").children().each (function() {

            idEquations.push($(this).attr('id'));
            $(this).html("<123456789>");
        })
        var texto = $("#eq").text();

        while(texto.length>0){
            var n = texto.indexOf("<123456789>");
            if(n==-1){
                str = texto.replace(/\s+/g, '');
                if(str.length>0) {
                    array.push(texto);
                    bools.push(false);
                }
                texto="";
            }else{

                var res = texto.substring(0, n);
                str = res.replace(/\s+/g, '');
                if(str.length>0) {
                    array.push(res);
                    bools.push(false);
                }
                array.push(idEquations[i]);
                bools.push(true);
                i++;
                if( texto.substring(n+10, texto.length).length>1) {
                    texto = texto.substring(n + 11, texto.length);
                }else{
                    texto="";
                }
            }

        }

        $("#eq").html(objecto);
        $("#eq").children().each (function() {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub, $(this).attr('id')]);
        })

        var xw = new XMLWriter('UTF-8');
        xw.formatting = 'indented';//add indentation and newlines
        xw.indentChar = ' ';//indent with spaces
        xw.indentation = 2;//add 2 spaces per level

        xw.writeStartDocument( );
        xw.writeStartElement('pregunta');
        xw.writeStartElement('formulacion');
        for(var i=0;i<array.length;i++){
            if(bools[i]){
                xw.writeElementString('expresion', array[i]);
            }else{
                xw.writeElementString('texto', array[i]);
            }
        }

        xw.writeEndElement();
        xw.writeStartElement('objetos');
        xw.writeElementString('json', JSON.stringify( treeActivos));
        xw.writeElementString('html', JSON.stringify(html));
        xw.writeEndElement();
        xw.writeEndElement();

        xw.writeEndDocument();
        return xw.flush();
    };
});