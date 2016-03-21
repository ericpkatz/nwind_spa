angular.module('app')
  .controller('ProductsCtrl', function($scope, $http, $q){
    function activate(){
      $http.get('/api/products')
        .then(function(result){
          $scope.products = result.data;
        });
    }

    $scope.remove = function(product){
      $http.delete('/api/products/' + product.id)
        .then(function(){
          activate();
        });
    };

    $scope.reorder = function(index, dir){
      var temp = $scope.products[index + dir];
      $scope.products[index + dir] = $scope.products[index];
      $scope.products[index] = temp;

      var promises = $scope.products.map(function(product, index){
        product.priority = index + 1;
        return $http.put('/api/products/' + product.id, { name: product.name, priority: product.priority });
      });

      $q.all(promises)
        .then(function(results){
          activate();
        });
    };
    
    $scope.save = function(){
      $http.post('/api/products', $scope.product)
        .then(function(){
          $scope.product = null;
          activate();
        })
        .catch(function(){
          $scope.error = 'Processing error';
        });
    };

    activate();
  });
