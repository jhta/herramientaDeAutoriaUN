/* workspace creada por jh7a */
function respuestaController(a){a.respuestas=[{respuesta:"3X/Z)",texto:"Esta es la respuesta correcta :D ",valor:5},{respuesta:"3X*Y",texto:"No estas usando la variable Z :/",valor:2},{respuesta:"Default Error",texto:"Parcero esta grave :( ",valor:0}],a.colors=["danger","danger","warning","info","info","success"],a.agregarRespuesta=function(){a.respuestas.push({respuesta:a.nuevaRespuesta,texto:a.nuevoTexto,valor:$("#valor").val()}),console.log($("#valor").val()),a.nuevaRespuesta="",a.nuevoTexto="",a.nuevoValor=0},a.eliminarRespuesta=function(b){a.respuestas[b];a.respuestas.splice(b,1)}}
//# sourceMappingURL=respuestaController.js.map