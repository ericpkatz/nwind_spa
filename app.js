var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var swig = require('swig');
swig.setDefaults({cache: false });

var models = require('./db').models;
var Product = models.Product;

var app = express();

module.exports = app;

app.use('/vendor', express.static(path.join(__dirname, 'bower_components')));
app.use('/client', express.static(path.join(__dirname, 'client')));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/products', function(req, res, next){
  Product.findAll({ order: 'priority' })
    .then(function(products){
      res.send(products);
    }, next);
});

app.post('/api/products', function(req, res, next){
  Product.create(req.body)
    .then(function(product){
      res.send(product);
    }, function(){
      res.sendStatus(404);
    }, next);
});

app.put('/api/products/:id', function(req, res, next){
  Product.findById(req.params.id)
    .then(function(product){
      product.priority = req.body.priority;
      product.name = req.body.name;
      return product.save();
    })
    .then(function(product){
      res.send(product);
    }, next);
});

app.delete('/api/products/:id', function(req, res, next){
  Product.destroy({where: {id: req.params.id}})
    .then(function(){
      res.sendStatus(200);
    }, next);
});
