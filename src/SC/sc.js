var SC = require('soundcloud');

SC.initialize({
  client_id: 'ec8f5272bde9a225c71692a876603706'
});

// find all sounds of buskers licensed under 'creative commons share alike'
var result;
var trackname = 'some things just like this';

SC.get('/tracks/', {
  q: trackname, license: 'cc-by-sa'
}).then(function(tracks) {
  result = tracks;
  console.log(tracks);
});

exports.result = "duyta";