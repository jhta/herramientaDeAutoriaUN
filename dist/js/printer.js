var Printer = {
	htmlAnswer: function( idRespuesta, nombre ) {
		$("#accordion2").append("<div class='panel panel-default'>" +
	        "<div class='panel-heading' role='tab' >" +
	        "<span class='panel-title'>" +
	        "<a id='title-" + idRespuesta + "' class='collapsed' data-toggle='collapse' data-parent='#accordion2' href='#" + idRespuesta + "' aria-expanded='false' aria-controls='#" + idRespuesta + "'>" +
	        nombre +
	        "</a>" +
	        "</span>" +
	        "<div class='pull-right'>" +
	        "<div class='btn-toolbar' role='toolbar' aria-label='...'>" +
	        "<div class='btn-group' role='group' aria-label='...'>" +
	        "<a href='#' class='editRespuesta' data-id='" + idRespuesta + "'>" +
	        "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>" +
	        "</a>" +
	        " </div>" +
	        "<div class='btn-group' role='group' aria-label='...'>" +
	        "<a href='#' class='deleteRespuesta' data-id='" + idRespuesta + "'>" +
	        "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>" +
	        " </a>" +
	        "</div>" +
	        "<div class='btn-group' role='group' aria-label='...'>" +
	        "<a  class='addErrorGenuino' data-id='" + idRespuesta + "'>" +
	        "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>" +
	        "</a>" +
	        "</div>" +
	        "</div>" +
	        " </div>" +
	        "</div>" +
	        "<div id='" + idRespuesta + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>" +
	        "<div class='panel-body'>" +
	        "<ul class='list-group'>" +
	        " <li class='list-group-item ' style='display: flex;'>" +
	        "<div class='col-xs-6 p-0'>"+
	        "<span class='glyphicon glyphicon-ok'></span>" +
	        " <span>Respuesta correcta:</span>" +
	        "</div>"+
	        "<div class='pull-right col-xs-6 p-0'  style='display:table;'>" +
	        "<div id='content-" + idRespuesta + "' style='display: table-cell' class='input-space p-0 col-xs-8'>"+
            "<p class='label-res hide' id='p-error-"+idRespuesta+"'></p>"+
			"<input type='text' class='input-res form-control sisas' id='error-"+idRespuesta+">"+
	        "</div>" +
	        "<div class='btn-toolbar col-xs-4 pull-right'  style='display: table-cell' role='toolbar' aria-label='...'>" +
	        "<div class='btn-group' role='group' aria-label='...'>" +
	        "<a href='#' data-id='" + idRespuesta + "' class='pre-equation-respuesta' data-tipo='correcta'>" +
	        "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>" +
	        "</a>" +
	        "</div>" +
	        "</div>" +
	        "</div>" +
	        "</li>" +
	        "</ul>" +
	        "</div>" +
	        "</div>" +
	        "</div>");
	    //$("#content-" + idRespuesta).html('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:#ccc; border:1px solid #888;padding: 2px 4px;display:inline-block;"  data-id="'+idRespuesta+'" id="mathjax-'+idRespuesta+'"><math></math></div>');
	},

	htmlError: function( error, idRes ) {
		 $("#"+idRes).find(".list-group").append(" <li class='list-group-item' id='"+error.id+"' data-respuestaid='"+idRes+"'>"+
	        "<span class='glyphicon glyphicon-remove'></span>"+
	        " <span>Error genuino:</span>"+
	        "<div class='pull-right col-xs-6' style='display:table;'>"+
	            "<div id='content-"+error.id+"' style='display: table-cell' class='col-xs-8'></div>"+
	            "<div class='btn-toolbar col-xs-4  pull-right' style='display: table-cell' role='toolbar' aria-label='...'>"+
	                "<div class='btn-group' role='group' aria-label='...'>"+
	                    "<a href='#' data-id='"+error.id+"' class='pre-equation-respuesta' data-tipo='error' data-respuestaid='"+idRes+"'>"+
	                        "<span class='glyphicon glyphicon-wrench'  aria-hidden='true' aria-hidden='true'></span>"+
	                    "</a>"+
	                "</div>"+
	            "<div class='btn-group' role='group' aria-label='...'>"+
                    "<a href='#' class='deleteErrorGenuino' data-id='"+error.id+"'  data-respuestaid='"+idRes+"'>"+
                        "<span class='glyphicon glyphicon-remove'   aria-hidden='true'></span>"+
                    " </a>"+
	            "</div>"+
                "<div class='btn-group' role='group' aria-label='...'>"+
                    "<a href='#' class='deleteErrorGenuino' data-id='"+error.id+"'  data-respuestaid='"+idRes+"'>"+
                        "<span class='glyphicon glyphicon-plus'   aria-hidden='true'></span>"+
                     " </a>"+
                "</div>"+
	        "</div>"+
	        "</div>"+
	        "</li>");

    	//$("#content-"+error.id).html('<div style="border-style: solid; border-width: 1px;  font-family:inherit;font-size:inherit;font-weight:inherit;background:#ccc; border:1px solid #999; border-radius: 5px; padding: 2px 4px;display:inline-block;"  data-id="'+idRes+'" id="mathjax-'+error.id+'"><math></math></div>');
	},
	createHtmlAnswer: function( idRespuesta, respactual ) {
		$("#accordion2").append("<div class='panel panel-default'>"+
            "<div class='panel-heading' role='tab' >"+
            "<span class='panel-title'>"+
            "<a id='title-respuesta-"+idRespuesta+"' class='collapsed' data-toggle='collapse' data-parent='#accordion2' href='#respuesta-"+idRespuesta+"' aria-expanded='false' aria-controls='#respuesta-"+idRespuesta+"'>"+
            respactual.nombre+
            "</a>"+
            "</span>"+
            "<div class='pull-right'>"+
            "<div class='btn-toolbar' role='toolbar' aria-label='...'>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' class='editRespuesta' data-id='respuesta-"+idRespuesta+"'>"+
            "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>"+
            "</a>"+
            " </div>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' class='deleteRespuesta' data-id='respuesta-"+idRespuesta+"'>"+
            "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"+
            " </a>"+
            "</div>"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a  class='addErrorGenuino' data-id='respuesta-"+idRespuesta+"'>"+
            "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>"+
            "</a>"+
            "</div>"+
            "</div>"+
            " </div>"+
            "</div>"+
            "<div id='respuesta-"+idRespuesta+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>"+
            "<div class='panel-body'>"+
            "<ul class='list-group'>"+
            " <li class='list-group-item'>"+
            "<span class='glyphicon glyphicon-ok'></span>"+
            " <span>Respuesta correcta:</span>"+
            "<div class='pull-right col-xs-6' style='display: table;'>"+
            "<div id='content-"+respactual.id+"' class='col-xs-8' style='display: table-cell'></div>"+
            "<div class='btn-toolbar col-xs-4 pull-right' role='toolbar' aria-label='...'  style='display: table-cell' >"+
            "<div class='btn-group' role='group' aria-label='...'>"+
            "<a href='#' data-id='"+respactual.id+"' class='pre-equation-respuesta' data-tipo='correcta'>"+
            "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>"+
            "</a>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</li>"+
            "</ul>"+
            "</div>"+
            "</div>"+
            "</div>");
	},

	addErrorToAnswer: function( data, error, respactual ) {
		
		$("#"+data).find(".list-group").append(
            " <li class='list-group-item ' style='display: flex' id='"+error.id+"' data-respuestaid='"+respactual.id+"'>"+
                "<div class='col-xs-6 p-0'>"+
                    "<span class='glyphicon glyphicon-remove'></span>"+
                    " <span> Error genuino:</span>"+
                "</div>"+
                "<div class='pull-right col-xs-6 p-0' style='display:table;'>"+
                    "<div  style='display: table-cell' class='input-space p-0 col-xs-10'>"+
                        "<p class='label-res hide' id='p-error-"+error.id+"'></p>"+
                        "<input type='text' class='hide form-control' id='text-"+error.id+"'>"+
                        "<input type='text' class='hide input-res form-control' data-respuesta='" + respactual.id + "' data-error='" + error.id + "' id='error-"+error.id+"'>"+
                    "</div>"+
                "<div class='btn-toolbar col-xs-2 p-0 pull-right' style='display: table-cell' role='toolbar' aria-label='...'>"+

                "<div class='btn-group' role='group' aria-label='...'>"+
                    "<a href='#' data-id='"+error.id+"' data-respuestaid='"+respactual.id+"' class=' pre-equation-respuesta' data-tipo='correcta'>"+
                    "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>"+
                    "</a>"+
                "</div>"+

                "<div class='btn-group' role='group' aria-label='...'>"+
                    "<a href='#' class='deleteErrorGenuino' data-id='"+error.id+"'  data-respuestaid='"+respactual.id+"'>"+
                        "<span class='glyphicon glyphicon-remove'   aria-hidden='true'></span>"+
                    " </a>"+
                "</div>"+
                "<div class='btn-group' role='group' aria-label='...'>"+
                    "<a href='#'  data-id='"+error.id+"'  data-respuestaid='"+respactual.id+"'>"+
                        "<span class='glyphicon glyphicon-plus'   aria-hidden='true'></span>"+
                    " </a>"+
                "</div>"+

                "<div class='btn-group' role='group' aria-label='...'>"+
                    "<a href='#'  data-id='text-"+ error.id+"'  data-respuestaid='"+respactual.id+"'>"+
                        "<span class='glyphicon glyphicon-wrench'   aria-hidden='true'></span>"+
                    " </a>"+
                "</div>"+

                "</div>"+
                "</div>"+
            "</li>");

	}
}