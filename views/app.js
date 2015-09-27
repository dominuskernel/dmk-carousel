(function() {
  'use strict';
  var LoadCarousel;
  LoadCarousel = function($scope, $http) {
    $scope.interval = 5000;
    $scope.noWrap = false;
    $http.get('mocks/slides.json').success(function(data) {
      $scope.slides = data;
    });
    $scope.changeSlide = function(slide) {
      var i, _i, _j, _ref, _ref1, _results;
      for (i = _i = 0, _ref = $scope.slides.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        $scope.slides[i].active = false;
      }
      _results = [];
      for (i = _j = 0, _ref1 = $scope.slides.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        if (slide === $scope.slides[i].text) {
          _results.push($scope.slides[i].active = true);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
  };
  angular.module('app', ['dmk.carousel']).controller('LoadCarousel', LoadCarousel);
  LoadCarousel.$inject = ['$scope', '$http'];
})();
