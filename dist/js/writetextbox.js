
$( document ).ready(function() {
    $("#div-iner").on("click", "#input-new", function (event) {
        event.stopImmediatePropagation();

    });
    $(".panel-2").click(function(event){
        if(event.target.id && event.target.id=="input-new"){
            return false;
        }
        $("#input-new").focusout();

    });
    $("#div-iner").on("click", ".spa", function () {

            if($(this).children().length < 1) {
                $(this).html('<input id="input-new" style="z-index: -1000000000;"  type="text" style="padding: 10px 10px 10px 10px">');
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
                $("#baseInput").attr('data-content', this.value);
                addnewinput(this);
            }
        }
    });



////////////////////////////////////////////////////////////////////////

    $("#div-iner2").on("click", ".spa", function () {

        if($(this).children().length < 1) {
            $(this).html('<input id="input-new" type="text" style="padding: 10px 10px 10px 10px">');
            $("#input-new").focus();
        }
    });
    $("#div-iner2").on("blur", "#input-new", function () {
        var valor = this.value+"";
        if (!$.trim(this.value).length) {
            $(this).parent().html("");
        }else{
            if ($.trim(this.value).length>20) {
                $(this).parent().html("");
            }
            else if(! /^\d+$/.test(valor)){
                $(this).parent().html("");
            }
            else{

                $("#baseInput").attr('data-content', this.value);
                addnewinput(this);
            }
        }
    });
    $("#div-iner2").on("click", "#input-new", function (event) {
        event.stopImmediatePropagation();
    });
});

