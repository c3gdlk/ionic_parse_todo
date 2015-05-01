'use strict';

var module = angular.module('starter.controllers');

module.controller('SignInController', ['$scope', '$state', function($scope, $state) {
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
      var query = new Parse.Query(Parse.User);
      query.equalTo("email", this.login);
      query.first({
        success: function (user) {
          if (user)
            _login(user.get('username'), self.password);
          else
            $scope.$apply(function(){
              self.errors = "Can't find user with this email";
              self.password = '';
              self.login = '';
            });
        }
      });
    }
  }


}]);
