Parse.Cloud.define("glossaryList", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var Glossary = Parse.Object.extend('Glossary');
  var query = new Parse.Query(Glossary);
  query.equalTo("user", Parse.User.current());
  query.limit(500);
  query.find().then(function(glossary) {
    response.success(glossary);
  })
})

Parse.Cloud.define("createGlossaryTerm", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var data = request.params.glossary;

  var Glossary = Parse.Object.extend("Glossary");
  var glossary = new Glossary();

  glossary.set("user", Parse.User.current());

  glossary.save(data).then(function(glossary) {
    response.success(glossary)
  });
})

Parse.Cloud.define("updateGlossaryTerm", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var glossaryId = request.params.id;
  var data = request.params.glossary;

  var Glossary = Parse.Object.extend("Glossary");
  var query = new Parse.Query(Glossary);
  query.get(glossaryId).then(function(glossary) {
    glossary.save(data).then(function(glossary) {
      response.success(glossary)
    })

  }, function(error) {
    response.error(error);
  })
})
