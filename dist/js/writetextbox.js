
$( document ).ready(function() {

    $("#div-iner").on("click", ".spa", function () {
    if($(this).children().length < 1) {
    $(this).html('<input id="input-new" type="text" style="padding: 10px 10px 10px 10px">');
    $("#input-new").focus();
    }
    });
    $("#div-iner").on("blur", "#input-new", function () {
    if (!$.trim(this.value).length) {
    $(this).parent().html("");
    }else{



    if ($.trim(this.value).length>20) {
    $(this).parent().html("");
    }else{
    addnewinput(this,"text");
    /*
     if(/^[0-9]+$/.test(this.value)){
     addnewinput(this,"cons");
     }else if(/^[a-zA-Z]+$/.test(this.value)){
     addnewinput(this,"var");
     }else{
     $(this).parent().html("");
     }*/
    }
    }
    });
    $("#div-iner").on("click", "#input-new", function (event) {
    event.stopImmediatePropagation();
    });

    });

