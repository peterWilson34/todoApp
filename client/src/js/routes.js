/*
** Angular Component: router
** desc: declaring routes and its controllers and templates
*/
angular.module('CrossoverTodo').config(function($routeProvider){

  $routeProvider
  // Login
  .when('/login',{
    templateUrl:'templates/login.html',
    controller:'loginCtrl'
  })
  // Home
  .when('/',{
    templateUrl:'templates/home.html',
    controller:'homeCtrl'
  })
  // Single Todo
  .when('/todo/:title',{
    templateUrl:'templates/singleTodo.html',
  })
});
