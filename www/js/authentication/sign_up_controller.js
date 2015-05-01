'use strict';

var module = angular.module('starter.controllers');

module.controller('SignUpController', ['$scope', '$state', function($scope, $state) {
  this.errors = '';
  this.username = '';
  this.email = '';
  this.password = '';
  this.passwordConfirmation = '';

  var self = this;

  this.signUp = function() {
    if (this.username && this.email && this.password && this.passwordConfirmation && this.password == this.passwordConfirmation) {
      var user = new Parse.User;
      user.save({username: this.username, email: this.email, password: this.password}).then(function(user) {
        Parse.User.logIn(self.login, self.password).then( function(user) { $state.go('app.tasks'); })
      })
    }
    else {
      $scope.$apply(function(){
        self.errors = "Invalid data";
        self.password = '';
        self.passwordConfirmation = '';
      });
    }


  }
}]);
