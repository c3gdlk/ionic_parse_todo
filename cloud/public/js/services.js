'use strict';

angular.module('starter.services', []);

var module = angular.module('starter.services');

module.factory('appConfig', function () {

  Parse.Config.get().then(function(config){
    r.config = config.attributes;
  });

  var r = {};

  r.config = {};

  r.isDevice = function(name) {
    if (!name)
      return window.device ? true : false;

    return window.device && window.device.platform.toLowerCase().indexOf(name.toLowerCase()) > -1
  }

  r.isFeatureEnabled = function(name) {
    var setting = r.config["feature" + name];

    if (this.isDevice())
      return setting == 'both' || setting == 'device';
    else
      return setting == 'both' || setting == 'browser'
  }

  return r;
})
