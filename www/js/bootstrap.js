function getConfigFromXML() {
  var request = new XMLHttpRequest();

  try {
    request.open('GET', 'xml/config.xml', false);
    request.send(null);
  } catch (err) {
    return {};
  }

  if (request.status === 200 || request.status === 0) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(request.responseText, "application/xml");
    var preferences = doc.getElementsByTagName("preference");
    var result = {};
    for (var i = 0; i < preferences.length; i++) {
      var pref = preferences[i];
      result[pref.getAttribute("name")] = pref.getAttribute("value");
    }

    return result;
  }
  return {};
}

window.applicationConfig = getConfigFromXML();

Parse.initialize(window.applicationConfig['ParseAppID'], window.applicationConfig['ParseJsKey']);
