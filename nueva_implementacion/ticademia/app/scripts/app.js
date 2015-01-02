'use strict';

/**
 * @ngdoc overview
 * @name ticademiaApp
 * @description
 * # ticademiaApp
 *
 * Main module of the application.
 */
angular
  .module('ticademiaApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


ticademiaAppControllers.controller('NameCtrl', ['$scope',
    function NameCtrl($scope) {
        $scope.nombre = sessionStorage.name;
        $scope.rol = sessionStorage.role;
    }
]);

ticademiaAppServices.factory('AuthenticationService', function() {
    var auth = {
        isLogged: false
    }
 
    return auth;
});

ticademiaAppServices.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = $window.sessionStorage.token;
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        response: function (response) {
            
            if (response != null && (response.status == 200 || response.status == 201 || response.status == 204) && $window.sessionStorage && !AuthenticationService.isLogged) {
                AuthenticationService.isLogged = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && (rejection.status === 401 || rejection.status === 402 || rejection.status === 400 || rejection.status === 404 || rejection.status === 422 || rejection.status === 429 || rejection.status === 500 || rejection.status === 503) && ($window.sessionStorage.token || AuthenticationService.isLogged)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isLogged = false;
                $location.path("/login");
            }

            return $q.reject(rejection);
        }
    };
});

ticademiaAppServices.factory('UserService', function ($http) {
    return {
        signIn: function(username, password) {
           var json={ruta:{id:username, password:password}};
          {
             return $http.post(options.api.base_url + '/ruta/login', json);
          }
        },

        logOut: function() {
            return $http.get(options.api.base_url + '/logout');
        }
    }
});

