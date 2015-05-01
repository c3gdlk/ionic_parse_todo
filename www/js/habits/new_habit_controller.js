'use strict';

var module = angular.module('starter.controllers');

module.controller('NewHabitController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  userAccess.checkAndRedirect();

  this.newHabit = '';

  var self = this;

  this.createHabit = function() {
    var Habit = Parse.Object.extend('Habit');
    var habit = new Habit();

    habit.save({title: this.newHabit, user: Parse.User.current()}).then(function() {
      self.newHabit = '';
      $state.go('app.habits');
    });
  }

}]);
