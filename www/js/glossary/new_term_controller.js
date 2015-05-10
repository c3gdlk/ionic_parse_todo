'use strict';

var module = angular.module('starter.controllers');

module.controller('NewGlossaryController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  userAccess.checkAndRedirect();

  this.newGlossary = {badWords: null, goodWords: null};

  var self = this;

  this.createTerm = function() {
    Parse.Cloud.run("createGlossaryTerm", {glossary: this.newGlossary}).then(function() {
      self.newGlossary = {badWords: null, goodWords: null, user: null};
      $state.go('app.glossary');
    })
  }

}]);
