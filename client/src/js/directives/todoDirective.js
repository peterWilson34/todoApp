/*
** Angular Component: directive - todoItem
** desc: render each todo item
*/
angular.module('CrossoverTodo').directive('todoItem',function(db){
  return{
    restrict:'E',
    templateUrl:'../../../templates/todo.html',
    controller:function($scope,$sce,$location,$timeout,$rootScope){
      $scope.todo.trusedDescription=$sce.trustAsHtml($scope.todo.description);
      $scope.edit= function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        $scope.editMode=true;

        return false;
      }
      $scope.update= function(item){
        item.trusedDescription=$sce.trustAsHtml(item.description);

        db.updateTodo(item).then(function(res){ //update the item
         console.log('res',res);
         $scope.editMode=false;

        })
      }
      $scope.cancel= function(){
        console.log('canceling');
        $scope.editMode=false;

      }
      $scope.deleteTodo=function (id) {
        $('#deleteModal').modal('show');

        $rootScope.excuteDelete= function(){
          console.log('test');
          $('#deleteModal').modal('hide');

          db.deleteTodo(id).then(function(res){
            if (res.status=="success") {
              if($scope.todos){
                for (var i = 0; i < $scope.todos.length; i++) {
                  if ($scope.todos[i]._id ==id) {
                    console.log(i);
                    $scope.todos.splice(i,1);
                  }
                }
              }else{
                $timeout(function () {
                  $location.url('/')

                }, 500);

              }

            }else{
              $rootScope.error=res;
              $('#errorModel').modal('show');
            }
          })
        }
      }
    }
  }
})


angular.module('CrossoverTodo').directive('aGreatEye', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<h1>lidless, wreathed in flame, {{1 + 1}} times {{todo.title}} {{todo.description}}</h1>'
    };
});
