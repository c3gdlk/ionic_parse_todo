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
