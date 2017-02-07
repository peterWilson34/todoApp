/*
** Angular Component: controller - homeCtrl
** desc: home controller
*/
angular.module('CrossoverTodo').controller('homeCtrl',function($scope,$http,$timeout,db,$location,$rootScope){

  $scope.handleDragAndDrop= function(){
    $timeout(function () {
      var draggables=document.querySelectorAll('.draggable');
      for (var i = 0; i < draggables.length; i++) {
        draggables[i].addEventListener("dragstart",drag);
      }
      document.querySelector('.notCompleted').addEventListener("drop",drop);
      document.querySelector('.notCompleted').addEventListener("dragover",allowDrop);
      document.querySelector('.completed').addEventListener("drop",drop);
      document.querySelector('.completed').addEventListener("dragover",allowDrop);
    }, 10);
  }
  db.getTodos().then(function(res){
    $scope.todos=res.data;
    $scope.handleDragAndDrop();
  },function(err) {
  })


   function drop(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      var status;
      if(ev.target.className.indexOf('drop')==-1){
        var el=ev.target;
        while (el  && el.className.indexOf('drop')==-1) {
          el = el.parentElement
        }
        el.appendChild(document.getElementById(data));
        status=el.id;

      }else{
        console.log(data);
        ev.target.appendChild(document.getElementById(data));
        status=ev.target.id;

      };
      $scope.todos.filter(function(item){
        if (item._id==data) {
          if(status.indexOf(item.status)==-1){ //check if status changed after drag & drop
            item.status = status; //assign status of the item to the new status

            db.updateTodo(item).then(function(res){ //update the item
              $scope.handleDragAndDrop();

            })
          };


        }
      });

  }


  function allowDrop(ev) {
      ev.preventDefault();
  }

  function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
  }


  $scope.logout=function(){
    $rootScope.author='test';

    db.logout().then(function(res){
      if (res.status=="success") {
        localStorage.removeItem('sessionId');
        $rootScope.author='';
        $location.url('/login');
      };
    })
  }
  $scope.addTodo=function(valid){
    if (valid) {
      db.addTodo($scope.todo).then(function(res){
        $scope.todos.push(res.data);
        $scope.handleDragAndDrop();
        $('#addTodoModel').modal('hide');
      })
    }

  }

  $scope.goToSingle=function(todo,ev){
    ev.stopPropagation();
    ev.preventDefault();
    $timeout(function () {
      $rootScope.todo=todo;
      $location.url('/todo/'+todo.title)
      console.log(todo);
    }, 500);

  }
  $rootScope.author= localStorage.getItem('username');
})
