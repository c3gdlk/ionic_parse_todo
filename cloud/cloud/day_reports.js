Parse.Cloud.define("dayReportsList", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var DayReport = Parse.Object.extend('DayReport');
  var query = new Parse.Query(DayReport);
  query.equalTo("user", Parse.User.current());
  query.limit(500);
  query.find().then(function(reports) {
    response.success(reports);
  })
})

Parse.Cloud.define("fetchLastReport", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var DayReport = Parse.Object.extend('DayReport');
  var query = new Parse.Query(DayReport);
  query.equalTo("user", Parse.User.current());
  query.descending("reportedAt")
  query.first().then(function(dayReport) { response.success(dayReport) })
})

Parse.Cloud.define("createDayReport", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var data = request.params.report;

  var DayReport = Parse.Object.extend('DayReport');
  var report = new DayReport();

  report.set("user", Parse.User.current());

  report.save(data).then(function(report) {
    response.success(report)
  });
})

Parse.Cloud.define("updateDayReport", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var reportId = request.params.id;
  var data = request.params.report;

  var DayReport = Parse.Object.extend("DayReport");
  var query = new Parse.Query(DayReport);
  query.get(reportId).then(function(report) {
    report.save(data).then(function(report) {
      response.success(report)
    })

  }, function(error) {
    response.error(error);
  })
})
