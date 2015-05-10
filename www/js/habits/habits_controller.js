'use strict';

var module = angular.module('starter.controllers');

module.controller('HabitsController', ['$scope', '$state', function($scope, $state) {
  this.habits = [];
  this.habitFailures = [];
  this._tab = 'habits';

  var self = this;

  if (!Parse.User.current()) {
    $state.go('app.sign-in');
  }

  var _loadHabits = function() {
    Parse.Cloud.run("habitList").then(function(result) {
      for (var i in result.habits) {
        result.habits[i].bad = false;
        result.habits[i].reason = '';
      }

      $scope.$apply(function() {
        self.habits = result.habits;
        self.habitFailures = result.habitFailures;
      })
    });
  }

  this.showMyBad = function(habit) {
    habit.bad = true;
  }

  this.closeMyBad = function(habit) {
    habit.bad = false;
  }

  this.myBad = function(habit) {
    if (habit.reason) {
      Parse.Cloud.run("createHabitFailure", {habitId: habit.id, failure: {body: habit.reason}}).then(function() {
        $scope.$apply(function() {
          habit.bad = false;
          habit.reason = '';
        })
      });
    }
  }

  this.showHabit = function(habit) {
    console.log('Show Habit');
    if (!habit.bad) {
      $state.go('app.habits-show', {id: habit.id});
    }
  }

  this.tab = function(tab) {
    self._tab = tab;
  }

  $scope.$on('$ionicView.enter', function () {
    self.tab('habits');
    _loadHabits();
  });
}]);
