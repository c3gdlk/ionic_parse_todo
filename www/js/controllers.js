'use strict';

angular.module('starter.controllers', []);

var module = angular.module('starter.controllers');

module.controller('MainController', ['$scope', '$state', '$ionicSideMenuDelegate', function($scope, $state, $ionicSideMenuDelegate) {
  $scope.isLeftSidebarEnabled = function() {
    var disabledStates = ['app.sign-in', 'app.sign-up'];

    return disabledStates.indexOf($state.current.name) == -1;
  }

  $scope.signOut = function() {
    Parse.User.logOut();
    $scope.toggleLeftSideMenu();
    $state.go('app.sign-in');
  }

  $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
}]);

module.controller('TasksController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  userAccess.checkAndRedirect();

  this.tasks = [];
  var self = this;

  var loadTasks = function() {
    var Task = Parse.Object.extend("Task");
    var query = new Parse.Query(Task);
    query.find().then(function(tasks) {
      $scope.$apply(function() {
        self.tasks = tasks;
      })
    })
  }

  this.completeTask = function(task) {
    task.set('isDone', true);
    task.save();
  };

  this.uncompleteTask = function(task) {
    task.set('isDone', false);
    task.save();
  };

  $scope.$on('$ionicView.enter', function () {
    userAccess.checkAndRedirect();
    loadTasks();
  });
}]);

module.controller('NewTaskController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  userAccess.checkAndRedirect();

  this.newTask = {body: '', isDone: false};
  var self = this;

  this.createPost = function() {
    var Task = Parse.Object.extend("Task");
    var task = new Task();

    task.save(this.newTask).then(function() {
      $state.go('app.tasks');
      self.newTask.body = '';
    });
  }
}]);
