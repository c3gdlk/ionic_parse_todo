Parse.Cloud.define("findUserByEmail", function(request, response) {
  var email = request.params.email;

  var query = new Parse.Query(Parse.User);
  query.equalTo("email", email);
  query.first({
    success: function (user) {
      if (user)
        response.success(user);
      else
        response.error("Can't find user with this email");
    }
  });
})

Parse.Cloud.define("signUpUser", function(request, response) {
  var username = request.params.username;
  var email    = request.params.email;
  var password = request.params.password;

  var User = Parse.Object.extend("_User");
  var user = new User();
  user.save({username: username, email: email, password: password}).then(function(user) {
    response.success(user);
  }, function(error) { response.error(error)})
})
