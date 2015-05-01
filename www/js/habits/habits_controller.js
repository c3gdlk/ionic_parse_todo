'use strict';

var module = angular.module('starter.controllers');

module.controller('HabitsController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  userAccess.checkAndRedirect();

  this.habits = [];
  this.habitFailures = [];
  this._tab = 'habits';

  var self = this;

  var _loadHabits = function() {
    var Habit = Parse.Object.extend('Habit');
    var query = new Parse.Query(Habit);
    query.equalTo("user", Parse.User.current());
    query.notEqualTo("hidden", true);
    query.limit(500);
    query.find().then(function(habits) {
      for (var i in habits) {
        habits[i].bad = false;
        habits[i].reason = '';
      }

      var HabitFailure = Parse.Object.extend('HabitFailure');
      var query = new Parse.Query(HabitFailure);
      query.equalTo("user", Parse.User.current());
      query.include("habit")
      query.limit(500);

      query.find().then(function(habitFailures) {
        $scope.$apply(function() {
          self.habits = habits;
          self.habitFailures = habitFailures;
        })
      });
    })
  }

  this.showMyBad = function(habit) {
    habit.bad = true;
  }

  this.closeMyBad = function(habit) {
    habit.bad = false;
  }

  this.myBad = function(habit) {
    if (habit.reason) {
      var HabitFailure = Parse.Object.extend('HabitFailure');
      var habitFailure = new HabitFailure();

      habitFailure.save({body: habit.reason, habit: habit, user: Parse.User.current()}).then(function() {
        $scope.$apply(function() {
          habit.bad = false;
          habit.reason = '';
        })
      });
    }
  }

  this.showHabit = function(habit) {
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
