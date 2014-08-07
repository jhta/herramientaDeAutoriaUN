function respuestaController($scope){
    $scope.respuestas=[
        {respuesta:'3X*(Y/Z)', texto: 'Esta es la respuesta correcta :D ', valor: 5},
        {respuesta:'3X*Y', texto: 'No estas usando la variable Z :/', valor: 2},
        {respuesta:'Default Error', texto: 'Parcero esta grave :( ', valor: 0}
        
        ];
    $scope.colors=['danger', 'danger', 'warning','info','primary', 'success'];

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
    
    $scope.eliminarRespuesta=function(){
        
    };
}