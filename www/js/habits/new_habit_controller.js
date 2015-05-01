'use strict';

var module = angular.module('starter.controllers');

module.controller('NewHabitController', ['$scope', '$state', function($scope, $state) {
  this.newHabit = '';

  var self = this;

  if (!Parse.User.current()) {
    $state.go('app.sign-in');
  }

  this.createHabit = function() {
    var Habit = Parse.Object.extend('Habit');
    var habit = new Habit();

    habit.save({title: this.newHabit, user: Parse.User.current()}).then(function() {
      self.newHabit = '';
      $state.go('app.habits');
    });
  }

}]);
