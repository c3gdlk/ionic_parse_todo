function toggleTask(taskId, value, success, error) {
  var Task = Parse.Object.extend("Task");
  var query = new Parse.Query(Task);
  query.get(taskId).then(function(task) {
    task.set('isDone', value);
    task.save().then(function(task) {
      success(task)
    })

  }, function(error) {
    error(error);
  })
}


Parse.Cloud.define("taskList", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var Task = Parse.Object.extend("Task");
  var query = new Parse.Query(Task);
  query.find().then(function(tasks) {
    response.success(tasks);
  })

})

Parse.Cloud.define("completeTask", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

    toggleTask(request.params.taskId, true, function(task) {
      response.success(task)
    }, function(error) {
      response.error(error);
    })
})

Parse.Cloud.define("uncompleteTask", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

    toggleTask(request.params.taskId, false, function(task) {
      response.success(task)
    }, function(error) {
      response.error(error);
    })
})

Parse.Cloud.define("createTask", function(request, response) {
  if (!Parse.User.current())
    return response.error('Not authorized');

  var data = request.params.task;

  var Task = Parse.Object.extend("Task");
  var task = new Task();

  task.save(data).then(function(task) {
    response.success(task);
  });
})
