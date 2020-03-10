function getData (dataName, callback) {
  var noteData = window[dataName];
  console.log(dataName);
  callback(noteData);
}