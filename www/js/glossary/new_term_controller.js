'use strict';

var module = angular.module('starter.controllers');

module.controller('NewGlossaryController', ['$scope', '$state', function($scope, $state) {
  this.newGlossary = {badWords: null, goodWords: null, user: null};

  var self = this;

  if (!Parse.User.current()) {
    $state.go('app.sign-in');
  }

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
