'use strict';

var module = angular.module('starter.services');

module.factory('blockAppUntilReport', function () {

  var r = {};

  r.storedLastReportDate = null;

  r.newReportDate = function() {
    var date = new Date();
    if (date.getHours() < 4) {
      date.setDate(date.getDate() - 1);
    }

    date.setHours(23,59,59,999); //should be end of the day

    return date;
  }

  r.fetchLastDayReport = function(callback) {
    Parse.Cloud.run("fetchLastReport").then(function(dayReport) { callback(dayReport) })
  }

  r.lastReportDateWasLongTimeAgo = function(lastReportDate) {
    var timeInHoursForNextReport = 28;

    if (!lastReportDate)
      return true;

    var lastReportTimestamp = new Date(lastReportDate).getTime();
    var currentTimestamp    = new Date().getTime();

    return currentTimestamp > lastReportTimestamp && ((currentTimestamp - lastReportTimestamp) / 1000 / 60 / 60 > timeInHoursForNextReport )
  }

  r.check = function(callback) {
    var self = this;

    if (this.lastReportDateWasLongTimeAgo(this.storedLastReportDate)) {
      this.fetchLastDayReport(function(dayReport) {
        if (dayReport) {
          self.storedLastReportDate = dayReport.get('reportedAt');
          callback(self.lastReportDateWasLongTimeAgo(self.storedLastReportDate));
        }
        else {
          callback(false);
        }
      });
    }
    else {
      callback(false);
    }
  }

  return r;


});
