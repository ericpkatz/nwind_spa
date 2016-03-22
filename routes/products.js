var router = require('express').Router();
module.exports = router;

app.get('/', function(req, res, next){
  Product.findAll({ order: 'priority' })
    .then(function(products){
      res.send(products);
    }, next);
});

app.post('/', function(req, res, next){
  Product.create(req.body)
    .then(function(product){
      res.send(product);
    }, function(){
      res.sendStatus(404);
    }, next);
});

app.put('/:id', function(req, res, next){
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

app.delete('/:id', function(req, res, next){
  Product.destroy({where: {id: req.params.id}})
    .then(function(){
      res.sendStatus(200);
    }, next);
});
