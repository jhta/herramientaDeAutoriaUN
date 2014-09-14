$(document).ready(function(){
    /* Escribe Código Mathml en el div con id="text-formulacion"
    el cual permite hacer una division */
    $("#division").click(function(){
        //$("#text-formulacion").val("<math><mfrac><mrow><mi>x</mi></mrow><mrow><mi>y</mi> </mrow></mfrac></math>");
        var texto="<mfrac><mrow></mrow><mrow> </mrow></mfrac>";
        insertTextAtCursor(document.getElementById('text-formulacion'), texto);
        UpdateMath("<math>"+$("#text-formulacion").val()+"</math>");
        
    });
    
    $("#suma").click(function(){
        
        //$("#text-formulacion").val("<math><mrow><mi>a</mi><mo>+</mo><mi>d</mi></mrow></math>");
        var texto="<mrow><mo>+</mo></mrow>";
         insertTextAtCursor(document.getElementById('text-formulacion'), texto);
       UpdateMath("<math>"+$("#text-formulacion").val()+"</math>");
        
    });
    $("#constante").click(function(){
          var texto="<mn>2</mn>";
         insertTextAtCursor(document.getElementById('text-formulacion'), texto);
        UpdateMath("<math>"+$("#text-formulacion").val()+"</math>");
        
    });
     $(".view-variable").click(function(){
         var texto = $(this).data('text');
        texto ="<mi>"+texto+"</mi>";
         insertTextAtCursor(document.getElementById('text-formulacion'), texto);
        UpdateMath("<math>"+$("#text-formulacion").val()+"</math>");
    });
    $("#string").click(function(){
        
        var texto ="<mtext> </mtext>";
         insertTextAtCursor(document.getElementById('text-formulacion'), texto);
        UpdateMath("<math>"+$("#text-formulacion").val()+"</math>");
    });
    
    
    $("#resta").click(function(){
        //$("#text-formulacion").val("<math><mrow><mi>c</mi><mo>-</mo><mn>4</mn></mrow></math>");
       var texto="<mrow><mo>-</mo></mrow>";
         insertTextAtCursor(document.getElementById('text-formulacion'), texto);
       UpdateMath("<math>"+$("#text-formulacion").val()+"</math>");
        
    });
    
    $("#multiplicacion").click(function(){
        
        //$("#text-formulacion").val("<math><mrow><mi>a</mi><mo>*</mo><mi>g</mi></mrow></math> ");
       var texto="<mrow><mo>*</mo></mrow>";
         insertTextAtCursor(document.getElementById('text-formulacion'), texto);
       UpdateMath("<math>"+$("#text-formulacion").val()+"</math>");
        
    });
    function insertTextAtCursor(el, text) {
    var val = el.value, endIndex, range;
    
    if (typeof el.selectionStart != "undefined" && typeof el.selectionEnd != "undefined") {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
    } else if (typeof document.selection != "undefined" && typeof document.selection.createRange != "undefined") {
        el.focus();
        range = document.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
}
});