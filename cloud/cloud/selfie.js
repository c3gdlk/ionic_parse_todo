Parse.Cloud.define("selfieList", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var Selfie = Parse.Object.extend('Selfie');
  var query = new Parse.Query(Selfie);
  query.equalTo("user", Parse.User.current());
  query.limit(500);
  query.find().then(function(selfies) {
    response.success(selfies);
  })
})

Parse.Cloud.define("createSelfie", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var data = request.params.selfie;

  var Selfie = Parse.Object.extend('Selfie');
  var selfie = new Selfie();
  selfie.set("user", Parse.User.current())
  selfie.save(data).then(function(selfie) {
    response.success(selfie);
  });
})
