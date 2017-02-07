/*
** Angular Component: factory - db
** desc: handle all back-end requests
*/
angular.module('CrossoverTodo').factory('db',function($http,$q,$httpParamSerializer,$httpParamSerializerJQLike){
  return{
    login:function(user){
      var defer =$q.defer();

      $http({
        url:'http://localhost:3000/user/auth',
        method:'POST',
        data:user
      }).then(function(res){
        defer.resolve(res.data)
      })
      return defer.promise;
    },
    getTodos:function(){
      var defer =$q.defer();

      $http({
        url:'http://localhost:3000/todos',
        method:'GET',
        params:{'sessionId':localStorage.getItem('sessionId')}
      }).then(function(res){
        defer.resolve(res.data)
      })
      return defer.promise;
    },
    updateTodo:function(item){
      var defer =$q.defer();

      $http({
        url:'http://localhost:3000/todo?sessionId='+localStorage.getItem('sessionId'),
        method:'PUT',
        data:{
          id:item._id,
          title:item.title,
          description:item.description,
          status:item.status
        }
      }).then(function(res){
        defer.resolve(res.data)
      })
      return defer.promise;
    },
    logout:function(){
      var defer =$q.defer();

      $http({
        url:'http://localhost:3000/user/logout?sessionId='+localStorage.getItem('sessionId'),
        method:'GET',

      }).then(function(res){
        defer.resolve(res.data)
      })
      return defer.promise;
    },
    addTodo:function(item){
      var defer =$q.defer();

      $http({
        url:'http://localhost:3000/todo?sessionId='+localStorage.getItem('sessionId'),
        method:'PUT',
        data:{
          title:item.title,
          description:item.description,
          status:item.status
        }
      }).then(function(res){
        defer.resolve(res.data)
      })
      return defer.promise;
    },
    deleteTodo:function(id){
      var defer =$q.defer();
      $http({
        url:'http://localhost:3000/todo?sessionId='+localStorage.getItem('sessionId'),
        method:'DELETE',
        data:{
          id:id
        },
        headers:{
        "Content-Type": "application/json;charset=utf-8"
        }
      }).then(function(res){
        defer.resolve(res.data)
      })
      return defer.promise;
    },
    test:function () {
      var defer =$q.defer();
      defer.resolve('test')
      return defer.promise;
    }
  }

});
