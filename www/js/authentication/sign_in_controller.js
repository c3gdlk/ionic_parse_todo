'use strict';

var module = angular.module('starter.controllers');

module.controller('SignInController', ['$scope', '$state', 'blockAppUntilReport', function($scope, $state, blockAppUntilReport) {
  this.errors = '';
  this.login = '';
  this.password = '';

  var self = this;

  var _login = function(login, password) {
    self.errors = '';
    Parse.User.logIn(login, password).then(
      function(user) {
        self.login = '';
        self.password = '';

        $state.go('app.tasks');
      },
      function(error) {
        $scope.$apply(function(){
          self.errors = "Login or password doesn't match";
          self.password = '';
        });
      }
    )
  }

  this.signIn = function() {
    if (this.login.indexOf('@') == -1) {
      _login(this.login, this.password);
    }
    else {
      Parse.Cloud.run("findUserByEmail", {email: this.login}).then(function(user) {
        _login(user.get('username'), self.password);
      }, function(error) {
        $scope.$apply(function(){
          self.errors = "Can't find user with this email";
          self.password = '';
          self.login = '';
        });
      })
    }
  }


}]);
