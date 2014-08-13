function respuestaController($scope){
    $scope.respuestas=[
        {respuesta:'3X*(Y/Z)', texto: 'Esta es la respuesta correcta :D ', valor: 5},
        {respuesta:'3X*Y', texto: 'No estas usando la variable Z :/', valor: 2},
        {respuesta:'Default Error', texto: 'Parcero esta grave :( ', valor: 0}
        
        ];
    $scope.colors=['danger', 'danger', 'warning','info','info', 'success'];

    $scope.agregarRespuesta= function(){
      $scope.respuestas.push({
          respuesta: $scope.nuevaRespuesta,
          texto: $scope.nuevoTexto,
          valor: $('#valor').val()
          
      }); 
      console.log($('#valor').val());
      $scope.nuevaRespuesta='';
      $scope.nuevoTexto='';
      $scope.nuevoValor=0;
    };
    
    $scope.eliminarRespuesta=function(idx){
        var rEliminada=$scope.respuestas[idx];
        $scope.respuestas.splice(idx,1);
    };
   /* 
    $scope.actualizarRespuesta= function(idx){
        /*$scope.respuestas[idx].texto=$scope.nuevoTextoA;
        $scope.respuestas[idx].valor= $('#valorA').val();
        $scope.respuestas[idx].respuesta=$scope.nuevaRespuestaA;*/
        /*console.log(idx);
    }*/
}