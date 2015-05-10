Parse.Cloud.define("habitList", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var Habit = Parse.Object.extend('Habit');
  var query = new Parse.Query(Habit);
  query.equalTo("user", Parse.User.current());
  query.notEqualTo("hidden", true);
  query.limit(500);
  query.find().then(function(habits) {
    var HabitFailure = Parse.Object.extend('HabitFailure');
    var query = new Parse.Query(HabitFailure);
    query.equalTo("user", Parse.User.current());
    query.include("habit")
    query.limit(500);

    query.find().then(function(habitFailures) {
      response.success({habits: habits, habitFailures: habitFailures});
    });
  })
})

Parse.Cloud.define("habitWithFailures", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var habitId = request.params.id;

  var Habit = Parse.Object.extend('Habit');
  var query = new Parse.Query(Habit);
  query.equalTo("user", Parse.User.current());
  query.equalTo("objectId", habitId);

  query.first().then(function(habit) {
    var HabitFailure = Parse.Object.extend('HabitFailure');
    var query = new Parse.Query(HabitFailure);
    query.equalTo("habit", habit);
    query.limit(500);

    query.find().then(function(habitFailures) {
      response.success({habit: habit, habitFailures: habitFailures});
    });
  })
})

Parse.Cloud.define("createHabit", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var data = request.params.habit;
  var Habit = Parse.Object.extend('Habit');
  var habit = new Habit();

  habit.set("user", Parse.User.current());

  habit.save(data).then(function(habit) {
    response.success(glossary)
  });
})

Parse.Cloud.define("createHabitFailure", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var data = request.params.failure;

  var Habit = Parse.Object.extend('Habit');
  var habit = new Habit();
  habit.id = request.params.habitId;

  var HabitFailure = Parse.Object.extend('HabitFailure');
  var habitFailure = new HabitFailure();

  habitFailure.set("user", Parse.User.current());
  habitFailure.set("habit", habit);

  habitFailure.save(data).then(function() {
    response.success(habitFailure);
  });


})
