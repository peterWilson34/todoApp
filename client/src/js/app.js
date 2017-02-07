/*
** Angular Component: module
** desc: Initilizing the main module
*/
angular.module('CrossoverTodo',[
/*
** Dependenecies
*/
'ngRoute', //routing module
'angular-md5', //hash passwords via md5 encryption
]);

angular.module('CrossoverTodo').run(function ($location) {
  if (!localStorage.getItem('sessionId')) {
    $location.url('/login')
  }
})
