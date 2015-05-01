'use strict';

var module = angular.module('starter.controllers');

module.controller('HabitController', ['$scope', '$state', '$stateParams', 'userAccess', function($scope, $state, $stateParams, userAccess) {
  userAccess.checkAndRedirect();

  this.habit = null;
  this.habitFailures = [];

  var self = this;

  var _loadHabitAndFailures = function() {
    var Habit = Parse.Object.extend('Habit');
    var query = new Parse.Query(Habit);
    query.equalTo("user", Parse.User.current());
    query.equalTo("objectId", $stateParams.id);

    query.first().then(function(habit) {
      var HabitFailure = Parse.Object.extend('HabitFailure');
      var query = new Parse.Query(HabitFailure);
      query.equalTo("habit", habit);
      query.limit(500);

      query.find().then(function(habitFailures) {
        $scope.$apply(function() {
          self.habit = habit;
          self.habitFailures = habitFailures;
        })
      });

    })
  }

  _loadHabitAndFailures();

}]);
