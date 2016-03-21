var db = require('./db');
var app = require('./app');

db.connect()
  .then(function(){
    console.log('connected to db');
    var port = process.env.PORT || 3000;
    app.listen(port, function(){
      console.log(`listening on port ${port}`); 
    });
  });
