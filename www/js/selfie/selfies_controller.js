'use strict';

var module = angular.module('starter.controllers');

module.controller('SelfiesController', ['$scope', '$state', 'userAccess', function($scope, $state, userAccess) {
  this.selfies = [];

  var self = this;

  userAccess.checkAndRedirect();

  var _loadSelfies = function() {
    var Selfie = Parse.Object.extend('Selfie');
    var query = new Parse.Query(Selfie);
    query.equalTo("user", Parse.User.current());
    query.limit(500);
    query.find().then(function(selfies) {

      $scope.$apply(function() {
        self.selfies = selfies;
      })
    })
  }

  this.newSelfie = function() {
    console.log('new selfie');
    var self = this;

    var cbSuccess = function(file) {
      console.log(file);
      window.resolveLocalFileSystemURL(file, function(openedFile) {
        openedFile.file(function(fileEntry) {
          var parseFile = new Parse.File('selfie.jpg', fileEntry);
          parseFile.save().then(function() {
            var Selfie = Parse.Object.extend('Selfie');
            var selfie = new Selfie();
            selfie.save({picture: parseFile, user: Parse.User.current()}).then(function(selfie) {
              $scope.$apply(function() {
                self.selfies.push(selfie);
              })
            });
          })

        }, function(error) {});
      }, function(error) {});
    };

    var cbError = function(error) { console.log('cant take photo', error)}

    navigator.camera.getPicture(cbSuccess, cbError, {sourceType: Camera.PictureSourceType.CAMERA, correctOrientation: true} );
  }

  $scope.$on('$ionicView.enter', function () {
    _loadSelfies();
  });
}]);
