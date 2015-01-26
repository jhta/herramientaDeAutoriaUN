$(document).ready(function(){
    var idEquation = -1,
    mathml = "",
    eqactually = "",
    equations = {},
    html = {},
    treeActivos = [];

    $("#inserteq").click(function(){
        document.getElementById('eq').focus();
        var preid ="equation-"+ (++idEquation);

        pasteHtmlAtCaret('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:gold; border:1px solid black;padding: 2px 4px;display:inline-block;" class="pre-equation" id='+preid+'><math></math></div>');
        document.getElementById(preid).innerHTML = "<math><mn>2</mn><mo>+</mo><mn>5</mn></math>";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,preid]);

        //------- guardar datos actuales
        if(!(eqactually == "")){
            treeActivos.splice(equations[eqactually], 1, treeActual);
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

    (function () {
        console.log(mathml);
        var QUEUE = MathJax.Hub.queue;
        var math = null;

        window.UpdateMath = function (MathML) {
            //alert("Vamos a actualizar ps en "+eqactually);
            QUEUE.Push(function () {
                math = MathJax.Hub.getAllJax(eqactually)[0];
            });
            // MathJax.Hub.Queue(["Typeset",MathJax.Hub,eqactually]);
            QUEUE.Push(["Text", math, MathML]);
        }
    })();



    $("#eq").on("click", ".pre-equation", function () {
        var idpre = $(this).attr('id');
        var idsplit = idpre.split('-')[1];
        
        //------- guardar datos actuales
        treeActivos.splice(equations[eqactually], 1, treeActual);
        html[eqactually] = $('.drop').html();
        //--------------

        eqactually = idpre;
        $('.panel-2').html("");
        $('.panel-2').html(html[eqactually]);
        if(html[eqactually] == ""){
            $(".panel-2").droppable(funcDroppableDrop);
        }

        treeActual = treeActivos[idsplit];

        $('.drop code, .drop div').each(function(index){
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
    
    
    $("#loadeq").click(function(){
        $("#inputfiles").click();
        
    });
    
    
    
    $("#inputfiles").change(function(evt){
        var files = evt.target.files; // FileList object  
        if(files.length > 0){
            console.log("ACA");
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET", "links.xml", false); //prueba con archivo en local
            xmlhttp.send();
            xmlDoc = xmlhttp.responseXML;
            
        }
                    

        /*// files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate.toLocaleDateString(), '</li>');
            console.log(f);
        }
        
        console.log(output.join(''));*/
    });
    
    
    

    $("#exportarxml").click(function(){

        var array = [];
        var idEquations = [];
        var bools = [];

        //Esto se hace, porque no se tiene la certeza de que la última ecuacion
        // que se ha creado ya esten guardados sus datos en los json globables
        objsons[eqactually+""] = treeActual;
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
        console.log(JSON.stringify(array));
        console.log(JSON.stringify(bools));

        $("#eq").html(objecto);
        $("#eq").children().each (function() {
            //alert($(this).html());
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
        xw.writeElementString('json', JSON.stringify( objsons));
        xw.writeElementString('html', JSON.stringify(html));
        xw.writeEndElement();
        xw.writeEndElement();

        xw.writeEndDocument();
        alert(xw.flush());
        console.log(xw.flush());
    });
});