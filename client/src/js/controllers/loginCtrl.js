/*
** Angular Component: controller - loginCtrl
** desc: login controller
*/
angular.module('CrossoverTodo').controller('loginCtrl',function($scope,$http,md5,$rootScope,$location,db){
  $scope.login=function(valid){
    if(valid){
      $scope.user.password=md5.createHash($scope.user.pass);
      db.login($scope.user).then(function(res){
        if (res.status=="success") {
          localStorage.setItem('sessionId',res.sessionId);
          localStorage.setItem('username',$scope.user.username);
          $location.url('/')
        }else{
          $rootScope.error=res;
          $('#errorModel').modal('show');
        }

      },function(err) {

      })
  }
}

})
