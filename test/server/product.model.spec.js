var expect = require('chai').expect;
var Product = require('../../db').models.Product;
describe('Product', function(){
  var products;
  beforeEach(function(done){
    require('./seed')()
      .then(function(_products){
        console.log('hello');
        products = _products;
        done();
      }, done);
  
  });

  it('there are three products', function(){
    expect(products.length).to.equal(3);
  });

  describe('sort by priority', function(){
    var products;
    beforeEach(function(done){
      Product.findAll({ order: 'priority' })
        .then(function(_products){
          products = _products;
          done();
        });
    });

    it('the first product has a priority of 1', function(){
      expect(products[0].name).to.equal('bar');
    
    });
  });
});
