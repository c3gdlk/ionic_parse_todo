'use strict';

var module = angular.module('starter.controllers');

module.controller('NewHabitController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  userAccess.checkAndRedirect();

  this.newHabit = '';

  var self = this;

  this.createHabit = function() {
    Parse.Cloud.run("createHabit", {habit: {title: this.newHabit}}).then(function() {
      self.newHabit = '';
      $state.go('app.habits');
    });
  }

}]);
