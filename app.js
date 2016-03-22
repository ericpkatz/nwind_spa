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

app.use('/api/products', require('./routes/products');


app.use(function(er, req, res, next){
  res.status(500).send(er);
});
