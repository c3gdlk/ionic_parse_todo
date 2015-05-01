'use strict';

var module = angular.module('starter.controllers');

module.controller('NewGlossaryController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  userAccess.checkAndRedirect();

  this.newGlossary = {badWords: null, goodWords: null, user: null};

  var self = this;

  this.createTerm = function() {
    var Glossary = Parse.Object.extend('Glossary');
    var glossary = new Glossary();

    this.newGlossary.user = Parse.User.current();
    glossary.save(this.newGlossary).then(function() {
      self.newGlossary = {badWords: null, goodWords: null, user: null};
      $state.go('app.glossary');
    });
  }

}]);
