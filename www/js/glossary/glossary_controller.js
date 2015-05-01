'use strict';

var module = angular.module('starter.controllers');

module.controller('GlossaryController', ['$scope', '$state', function($scope, $state) {
  this.glossary = [];

  var self = this;

  if (!Parse.User.current()) {
    $state.go('app.sign-in');
  }

  var _loadGlossary = function() {
    var Glossary = Parse.Object.extend('Glossary');
    var query = new Parse.Query(Glossary);
    query.equalTo("user", Parse.User.current());
    query.limit(500);
    query.find().then(function(glossary) {
      for (var i in glossary) {
        glossary[i].edit = false;
        glossary[i].badWords = glossary[i].get('badWords');
        glossary[i].goodWords = glossary[i].get('goodWords');
      }

      $scope.$apply(function() {
        self.glossary = glossary;
      })
    })
  }

  this.startEdit = function(glossary) {
    glossary.edit = true;
  }

  this.cancelEdit = function(glossary) {
    glossary.edit = false;
  }

  this.update = function(glossary) {
    console.log(glossary.attributes)
    glossary.set('badWords', glossary.badWords);
    glossary.set('goodWords', glossary.goodWords);

    glossary.save().then(function() {
      console.log('SUCCESS');
      $scope.$apply(function() {
        self.cancelEdit(glossary);
      })
    })
  }

  $scope.$on('$ionicView.enter', function () {
    _loadGlossary();
  });
}]);
