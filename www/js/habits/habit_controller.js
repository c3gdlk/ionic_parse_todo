'use strict';

var module = angular.module('starter.controllers');

module.controller('HabitController', ['$scope', '$state', '$stateParams', 'userAccess', function($scope, $state, $stateParams, userAccess) {
  userAccess.checkAndRedirect();

  this.habit = null;
  this.habitFailures = [];

  var self = this;

  var _loadHabitAndFailures = function() {
    Parse.Cloud.run("habitWithFailures", {id: $stateParams.id}).then(function(result) {
      $scope.$apply(function() {
        self.habit = result.habit;
        self.habitFailures = result.habitFailures;
      })
    });
  }

  _loadHabitAndFailures();

}]);
