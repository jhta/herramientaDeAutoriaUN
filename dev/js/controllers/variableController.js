function variableController($scope){
    $scope.variables={
        especificas:[
                {nombre: "x", valor: 10},
                {nombre: "y", valor: 10},
                {nombre: "z", valor: 10},
            ],
        uniformes: [
                {nombre: "a", min: -15, max: 15, inc: 1},
                {nombre: "b", min: -15, max: 15, inc: 1},
                {nombre: "c", min: -15, max: 15, inc: 1},
            ],
        categoricas: [
                {nombre: "d", opciones: [1,2,3,4]}
            ]
    };
    
    $scope.newVariableUniforme= function(){
      $scope.variables.uniformes.push({
          nombre: $scope.newNombreU,
          min: $scope.newMinU,
          max: $scope.newMaxU,
          inc: $scope.newIncU
          
      }); 
      $scope.newNombreU='';
      $scope.newMinU=0;
      $scope.newMaxUr=0;
      $scope.newIncU=0;
    };
    
    $scope.newVariableEspecifica= function(){
      $scope.variables.especificas.push({
          nombre: $scope.newNombreE,
          valor: $scope.newValorE
          
      }); 
      $scope.newNombreU='';
      $scope.newValorE=0;
    };
    
}