'use strict';

angular.module('starter.filters', []);

var module = angular.module('starter.filters');


module.filter("formattedDate", function ($filter) {
  return function (date) {
    var result = ''

    if (date) {
      var dateObj = new Date(date);
      var today = new Date();
      if ($filter('date')(dateObj, 'dd/MMM/yyyy') === $filter('date')(today, 'dd/MMM/yyyy')) {
        result = $filter('date')(dateObj, 'HH:mm');
      }
      else {
        result = $filter('date')(dateObj, 'MMM d');
      }
    }

    return result;
  };
})
