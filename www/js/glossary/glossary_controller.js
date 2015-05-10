'use strict';

var module = angular.module('starter.controllers');

module.controller('GlossaryController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  this.glossary = [];

  var self = this;

  userAccess.checkAndRedirect();

  var _loadGlossary = function() {
    Parse.Cloud.run("glossaryList").then(function(glossary) {
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
    var data = {badWords: glossary.badWords, goodWords: glossary.goodWords};

    Parse.Cloud.run("updateGlossaryTerm", {id: glossary.id, glossary: data}).then(function(_glossary) {
      $scope.$apply(function() {
        glossary.set('badWords', glossary.badWords);
        glossary.set('goodWords', glossary.goodWords);

        self.cancelEdit(glossary);
      })
    })
  }

  $scope.$on('$ionicView.enter', function () {
    _loadGlossary();
  });
}]);
