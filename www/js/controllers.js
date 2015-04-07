'use strict';

angular.module('starter.controllers', []);

var module = angular.module('starter.controllers');

module.controller('TasksController', ['$scope', function($scope) {
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
    loadTasks();
  });
}]);

module.controller('NewTaskController', ['$scope', '$state', function($scope, $state) {
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
