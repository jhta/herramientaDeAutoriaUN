var Printer = {
	htmlAnswer: function( idRespuesta, nombre, formula ) {
        $("#accordion2").append(
            "<div class='panel panel-default'>" +
    	        "<div class='panel-heading' role='tab' >" +
    	           "<span class='panel-title'>" +
        	           "<a id='title-" + idRespuesta + "' class='collapsed in' data-toggle='collapse' data-parent='#accordion2' href='#" + idRespuesta + "' aria-expanded='false' aria-controls='#" + idRespuesta + "'>" +
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
            	        "<!--<div class='btn-group' role='group' aria-label='...'>" +
                	        "<a  class='addErrorGenuino' data-id='" + idRespuesta + "'>" +
                	           "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>" +
                	        "</a>" +
            	        "</div>-->" +
        	        "</div>" +
	            "</div>" +
	        "</div>" +

	        "<div id='" + idRespuesta + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>" +
    	        "<div class='panel-body p-0'>" +
        	        "<ul class='list-group p-0'>" +
            	        this.correctAnswer( idRespuesta, nombre, formula ) +
                    "</ul>" +
                    "<a href='#' data-id='" + idRespuesta + "' style='margin:10px' class='addErrorGenuino btn btn-success'>Agregar Error</a>"+
	            "</div>" +
	        "</div>"
	        );
	},

  correctAnswer: function(idRespuesta, nombre, formula) {
        var response = "<li class='list-group-item genuine-error' >" +
                    "<div class=' p-0'>"+
                       " <span>Respuesta correcta:</span>" +
                    "</div>"+
                    "<div class='p-0 genuine-error__body'  >" +
                        "<div id='content-" + idRespuesta + "'  class='p-0 genuine-error__body-item input'>"+
                            "<p class='label-res pre-equation-respuesta' data-id='" + idRespuesta + "' data-tipo='correcta' id='p-correct-"+idRespuesta+"'>"+formula+"</p>"+
                            "<input type='text' data-tipo='correcta' data-respuesta='"+ idRespuesta +"' class='input-res hide form-control ' id='correct-"+idRespuesta+"'>"+
                        "</div>" +
                        "<div class='btn-toolbar genuine-error__body-item' role='toolbar' aria-label='...'>" +
                            "<div class='btn-group' role='group' aria-label='...'>" +
                                "<a href='#' data-id='" + idRespuesta + "' class='pre-equation-respuesta' data-tipo='correcta'>" +
                                    "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>" +
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
    	        " <span>Error genuino:</span>"+
            "</div>"+
	        "<div class='genuine-error__body'>"+
	            "<div id='content-"+error.id+"' class='genuine-error__body-item input'>"+
                    "<div class='item'>"+
												"<span>Respuesta: </span>"+
                        "<p class='label-res pre-equation-respuesta' id='p-error-"+error.id+"' data-id='"+error.id+"' data-respuestaid='"+idRes+"'> "+ error.formula +" </p>"+
                        "<input type='text' class='hide input-res form-control' data-respuesta='" + idRes + "' data-error='" + error.id + "' id='error-"+error.id+"'>"+
                    "</div>"+
                    "<div class='item'>"+
												"<span>RetroAliementacion</span>"+
                        "<p class='label-res retro-alimentacion ' data-id='"+error.id+"' data-respuestaid='"+idRes+"' id='p-text-"+error.id+"'> "+ error.retro_alimentacion +" </p>"+
                        "<input type='text' class='hide input-text form-control'  data-respuesta='" + idRes + "' data-error='" + error.id + "' id='text-"+error.id+"'>"+
                    "</div>"+
                "</div>"+
	            "<div class='btn-toolbar  genuine-error__body-item'  role='toolbar' aria-label='...'>"+

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
		$("#accordion2").append(
            "<div class='panel panel-default'>"+
                "<div class='panel-heading' role='tab' >"+
                    "<span class='panel-title'>"+
                        "<a id='title-respuesta-"+idRespuesta+"' class='collapsed in' data-toggle='collapse' data-parent='#accordion2' href='#respuesta-"+idRespuesta+"' aria-expanded='false' aria-controls='#respuesta-"+idRespuesta+"'>"+
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
                             this.correctAnswer( idRespuesta, respactual.nombre, "" ) +
                        "</ul>"+
                    "</div>"+
                "</div>"+
            "</div>"
            );
	},

	addErrorToAnswer: function( data, error, respactual ) {
        $("#"+data).find(".list-group").append(
            " <li class='list-group-item genuine-error' id='"+error.id+"' data-respuestaid='"+respactual.id+"'>"+
                "<div class=' p-0'>"+
                    " <span> Error genuino:</span>"+
                "</div>"+
                "<div class='genuine-error__body'>"+
                    "<div class='genuine-error__body-item input'>"+

                        "<div class='item'>"+
														"<span> Respuesta </span>"+
                            "<p class='label-res pre-equation-respuesta' id='p-error-"+error.id+"' data-id='"+error.id+"' data-respuestaid='"+respactual.id+"'>respuesta</p>"+
                            "<input type='text' class='hide input-res form-control' data-respuesta='" + respactual.id + "' data-error='" + error.id + "' id='error-"+error.id+"'>"+
                        "</div>"+
                        "<div class='item'>"+
														"<span> RetroAliementacion: </span>"+
                            "<p class='label-res retro-alimentacion ' data-id='"+error.id+"' data-respuestaid='"+respactual.id+"' id='p-text-"+error.id+"'>retroalimentacion</p>"+
                            "<input type='text' class='hide input-text form-control'  data-respuesta='" + respactual.id + "' data-error='" + error.id + "' id='text-"+error.id+"'>"+
                        "</div>"+
                    "</div>"+
                    "<div class='btn-toolbar genuine-error__body-item'  role='toolbar' aria-label='...'>"+

                        "<div class='btn-group' role='group' aria-label='...'>"+
                            "<a href='#' class='deleteErrorGenuino' data-id='"+error.id+"'  data-respuestaid='"+respactual.id+"'>"+
                                "<span class='glyphicon glyphicon-remove'   aria-hidden='true'></span>"+
                            " </a>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</li>");

	}
}
