$(document).ready(function(){
    var first = true;
    var id = 0;
    var mathml = "";

    var ids = {};
    var banderanCombiG=false;
    var banderafactorial=false;
    var banderafuncionf=false;
    var banderafuncionfn=false;


    var equations = [];
    var html = {};
    var eqactually = "";
    var objsons = {};
    var id=0;
    /* Escribe Código Mathml en el div con id="text-formulacion"
    el cual permite hacer una division */
    $("#inserteq").click(function(){
        document.getElementById('eq').focus();
        var preid="equation-"+id;
        pasteHtmlAtCaret('  <div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:gold; border:1px solid black;padding: 2px 4px;display:inline-block;" class="pre-equation" id='+preid+'><math></math></div>');
        document.getElementById(preid).innerHTML = "<math><mn>2</mn><mo>+</mo><mn>5</mn></math>";
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,preid]);
       id++;
        equations.push(preid);
        //objsons.push(objson);
        objsons[preid+""] = {};
        if(!(eqactually == "")){
            objsons[eqactually+""] = objson;
            html[eqactually+""] = $('.drop').html();
        }
        objson = {};
        $('.drop').html("");
        $(".drop").droppable("enable");
        first = true;
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
            alert("Vamos a actualizar ps en "+eqactually);
            QUEUE.Push(function () {
                math = MathJax.Hub.getAllJax(eqactually)[0];
            });
           // MathJax.Hub.Queue(["Typeset",MathJax.Hub,eqactually]);
            QUEUE.Push(["Text", math, MathML]);
        }
    })();



    $("#eq").on("click", ".pre-equation", function () {
        alert("Me dieron clic perrita "+$(this).attr('id'));
        var idpre = $(this).attr('id');
        objsons[eqactually+""] = objson;
        html[eqactually+""] = $('.drop').html();
        eqactually =  idpre;
        /*var jsonpre = {};
        for(var i=0;i<equations.length;i++){
            if(equations[i]==idpre){
                jsonpre=objsons[i];
                alert(JSON.stringify(jsonpre));
            }
        }*/
        alert(JSON.stringify(objsons[eqactually+""]));
        alert(html[eqactually+""]);
    });
});