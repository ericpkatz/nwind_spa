var db = require('../../db');
var models = db.models;
var Product = models.Product;
var Promise = require('bluebird');

module.exports = function(){
  return db.connect()
    .then(function(conn){
      return conn.sync({force: true}); 
    })
    .then(function(){
      return Promise.join(
        Product.create({name: 'foo', priority: 3}),
        Product.create({name: 'bar', priority: 2}),
        Product.create({name: 'bazz', priority: 5})
      );
    })
    .then(function(products){
      return products;
    });

};

