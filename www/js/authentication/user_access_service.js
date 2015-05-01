'use strict';

var module = angular.module('starter.services');

module.factory('userAccess', ['$state', 'blockAppUntilReport', function ($state, blockAppUntilReport) {

  var r = {};

  var enabledForUnregisteredUser = ['app.sign-in', 'app.sign-up'];

  r.checkAndRedirect = function() {
    if (!Parse.User.current() && enabledForUnregisteredUser.indexOf($state.current.name) == -1)
      return $state.go('app.sign-in');

    blockAppUntilReport.check(function(blocked) {
      if (blocked && $state.current.name.indexOf('app.day-reports') == -1)
        $state.go('app.day-reports');
    })

    return true;
  }

  return r;
}]);
