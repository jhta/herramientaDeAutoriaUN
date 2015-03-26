var Printer = {
	htmlAnswer: function( idRespuesta, nombre, formula ) {
		$("#accordion2").append(
            "<div class='panel panel-default'>" +
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
	            "</div>" +
	        "</div>" +

	        "<div id='" + idRespuesta + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>" +
    	        "<div class='panel-body'>" +
        	        "<ul class='list-group'>" +
            	        this.correctAnswer( idRespuesta, nombre, formula ) +
                    "</ul>" +
	            "</div>" +
	        "</div>" 
	        );
	},

    correctAnswer: function(idRespuesta, nombre, formula) {
        var response = "<li class='list-group-item genuine-error' >" +
                    "<div class=' p-0'>"+
                       "<span class='glyphicon glyphicon-ok'></span>" +
                       " <span>Respuesta correcta:</span>" +
                    "</div>"+
                    "<div class='p-0 genuine-error__body'  >" +
                        "<div id='content-" + idRespuesta + "'  class='p-0 genuine-error__body-item input'>"+
                            "<p class='label-res ' id='p-correct-"+idRespuesta+"'>"+formula+"</p>"+
                            "<input type='text' data-tipo='correcta' data-respuesta='"+ idRespuesta +"' class='input-res hide form-control sisas' id='correct-"+idRespuesta+"'>"+
                        "</div>" +
                        "<div class='btn-toolbar genuine-error__body-item' role='toolbar' aria-label='...'>" +
                            "<div class='btn-group' role='group' aria-label='...'>" +
                                "<a href='#' data-id='" + idRespuesta + "' class='pre-equation-respuesta' data-tipo='correcta'>" +
                                    "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>" +
                                "</a>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</li>" 
        return response;
    },

	htmlError: function( error, idRes ) {
        console.debug("este es el motherfucker error que esta llegando: ", error);
		 $("#"+idRes).find(".list-group").append(" <li class='list-group-item genuine-error' id='"+error.id+"' data-respuestaid='"+idRes+"'>"+
	        "<div>"+
                "<span class='glyphicon glyphicon-remove'></span>"+
    	        " <span>Error genuino:</span>"+
            "</div>"+
	        "<div class='genuine-error__body'>"+
	            "<div id='content-"+error.id+"' class='genuine-error__body-item input'>"+
                    "<p class='label-res ' id='p-text-"+error.id+"'>"+ error.retro_alimentacion +"</p>"+
                    "<p class='label-res' id='p-error-"+error.id+"'>"+ error.formula +"</p>"+
                    "<input type='text' class='hide input-text form-control'  data-respuesta='" + idRes + "' data-error='" + error.id + "' id='text-"+error.id+"'>"+
                    "<input type='text' class='hide input-res form-control' data-respuesta='" + idRes + "' data-error='" + error.id + "' id='error-"+error.id+"'>"+


                "</div>"+
	            "<div class='btn-toolbar  genuine-error__body-item'  role='toolbar' aria-label='...'>"+

                    "<div class='btn-group' role='group' aria-label='...'>"+
                        "<a href='#' data-id='"+error.id+"' data-respuestaid='"+idRes+"' class=' pre-equation-respuesta' data-tipo='correcta'>"+
                        "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>"+
                        "</a>"+
                    "</div>"+

                    "<div class='btn-group' role='group' aria-label='...'>"+
                        "<a href='#' data-id='"+error.id+"' data-respuestaid='"+idRes+"' class='retro-alimentacion' >"+
                            "<span class='glyphicon glyphicon-font' aria-hidden='true'></span>"+
                        "</a>"+
                    "</div>"+

    	            "<div class='btn-group' role='group' aria-label='...'>"+
                        "<a href='#' class='deleteErrorGenuino' data-id='"+error.id+"'  data-respuestaid='"+idRes+"'>"+
                            "<span class='glyphicon glyphicon-remove'   aria-hidden='true'></span>"+
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
            " <li class='list-group-item genuine-error' id='"+error.id+"' data-respuestaid='"+respactual.id+"'>"+
                "<div class=' p-0'>"+
                    "<span class='glyphicon glyphicon-remove'></span>"+
                    " <span> Error genuino:</span>"+
                "</div>"+
                "<div class='genuine-error__body'>"+
                    "<div class='genuine-error__body-item input'>"+
                        "<p class='label-res hide' id='p-text-"+error.id+"'></p>"+
                        "<p class='label-res hide' id='p-error-"+error.id+"'></p>"+
                        "<input type='text' class='hide input-text form-control' data-respuesta='" + respactual.id + "' data-error='" + error.id + "'id='text-"+error.id+"'>"+
                        "<input type='text' class='hide input-res form-control' data-respuesta='" + respactual.id + "' data-error='" + error.id + "' id='error-"+error.id+"'>"+
                    "</div>"+
                "</div>"+
                "<div class='btn-toolbar genuine-error__body-item'  role='toolbar' aria-label='...'>"+

                    "<div class='btn-group' role='group' aria-label='...'>"+
                        "<a href='#' data-id='"+error.id+"' data-respuestaid='"+respactual.id+"' class=' pre-equation-respuesta' data-tipo='correcta'>"+
                        "<span class='glyphicon glyphicon-wrench' aria-hidden='true'></span>"+
                        "</a>"+
                    "</div>"+

                    "<div class='btn-group' role='group' aria-label='...'>"+
                        "<a href='#' data-id='"+error.id+"' data-respuestaid='"+respactual.id+"' class='retro-alimentacion' >"+
                        "<span class='glyphicon glyphicon-font' aria-hidden='true'></span>"+
                        "</a>"+
                    "</div>"+


                    "<div class='btn-group' role='group' aria-label='...'>"+
                        "<a href='#' class='deleteErrorGenuino' data-id='"+error.id+"'  data-respuestaid='"+respactual.id+"'>"+
                            "<span class='glyphicon glyphicon-remove'   aria-hidden='true'></span>"+
                        " </a>"+
                    "</div>"+
                "</div>"+
            "</li>");

	}
}