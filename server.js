var db = require('./db');
var app = require('./app');
var seed = require('./test/server/seed');

db.connect()
  .then(function(){
    if(process.env.SEED)
      return seed();
  })
  .then(function(){
    console.log('connected to db');
    var port = process.env.PORT || 3000;
    app.listen(port, function(){
      console.log(`listening on port ${port}`); 
    });
  });
