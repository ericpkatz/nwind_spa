var Sequelize = require('sequelize');
var Promise = require('bluebird');

var db = new Sequelize(process.env.CONN);
var Product = db.define('product', {
  name:     { allowNull: false, type: Sequelize.STRING, required: true },
  priority: { type: Sequelize.INTEGER, defaultValue: 5}
});

var _conn;
module.exports = {
  connect : function(){
    if(_conn)
      return _conn;
    _conn = new Promise(function(resolve, reject){
      db.authenticate()
        .then(function(){
          resolve(db);
        })
        .catch(function(err){
          reject(err);
        
        });
    
    })
    return _conn;
  
  },
  models: {
    Product: Product
  }

};
