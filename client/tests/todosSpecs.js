describe('Testing  Home Controller ', function () {
  var $scope;
  var $rootScope;
  var $q;
  var deferred;

  beforeEach(module('CrossoverTodo'));

  beforeEach(inject(function($controller, _$rootScope_, _$q_, db) {
    $q = _$q_;
    $scope = _$rootScope_.$new();

    deferred = _$q_.defer();
    $rootScope= _$rootScope_;

    spyOn(db, 'getTodos').and.returnValue(deferred.promise);
    spyOn(db, 'logout').and.returnValue(deferred.promise);
    $controller('homeCtrl', {
      $scope: $scope,
      db: db,
      $rootScope:_$rootScope_

    });

  }));

  it('todos shouldn\'t be undefined', function () {
    deferred.resolve({data:[{ id: 1 }, { id: 2 }]});

    $scope.$apply();

    expect($scope.todos).not.toBe(undefined);
    expect($scope.todos.length).not.toBe(undefined);
  });

  it('clear user', function () {
    $scope.logout();

    deferred.resolve({status:'success'});

    $scope.$apply();

    expect($rootScope.author).toBe('');
  });





});
