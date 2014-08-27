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
}