var app = require('supertest-as-promised')(require('../../app'));
var seed = require('./seed');
var expect = require('chai').expect;
describe('routes', function(){
  var foo, bar, bazz;
  beforeEach(function(done){
    seed()
      .then(function(results){
        foo = results[0];
        bar = results[1];
        bazz = results[2];
        done();
      });
  
  });

  describe('GET home /', function(){
    it('is the home page', function(){
      return app.get('/')
        .then(function(res){
          console.log(res.text);
          expect(res.text).to.contain('Welcome to NWind SPA');
        });
    
    });
  });

  describe('GET /products', function(){
    it('should return three products', function(){
      return app.get('/api/products')
        .expect(200)
        .then(function(resp){
          console.log(resp.body);
          expect(resp.body.length).to.equal(3);
        });
    });
  });
  describe('POST /products error handling', function(){
    it('a new product can get created', function(){
      return app.post('/api/products')
        .send({})
        .expect(404);
    })
  });

  describe('POST /products', function(){
    it('a new product can get created', function(){
      return app.post('/api/products')
        .send({name: 'boo'})
        .expect(200)
        .then(function(resp){
          expect(resp.body.name).to.equal('boo');
          expect(resp.body.priority).to.equal(5);
          return app.get('/api/products');
        })
        .then(function(resp){
          expect(resp.body.length).to.equal(4);
        });
    });
  });

  describe('DELETE /products', function(){
    it('a product can be deleted', function(){
      return app.delete(`/api/products/${foo.id}`)
        .expect(200)
        .then(function(resp){
          return app.get('/api/products');
        })
        .then(function(resp){
          expect(resp.body.length).to.equal(2);
        });
    });
  });

  describe('PUT /products', function(){
    it('a new product can get created', function(){
      return app.put(`/api/products/${foo.id}`)
        .send({name: 'foo', priority: 1})
        .expect(200)
        .then(function(resp){
          expect(resp.body.name).to.equal('foo');
          expect(resp.body.priority).to.equal(1);
          return app.get('/api/products');
        })
        .then(function(resp){
          expect(resp.body[0].name).to.equal('foo');
        });

    });
  });
});
