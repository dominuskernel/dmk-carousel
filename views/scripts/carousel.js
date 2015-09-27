(function() {
  'use strict';
  angular.module('dmk.carousel', ['ui.bootstrap']).directive('dmkCarousel', [
    function() {
      return {
        restrict: 'A',
        templateUrl: '../templates/dmk-carousel.html',
        scope: {
          dmkInterval: "=",
          dmkSlides: "=",
          dmkNoWrap: "="
        },
        link: function(scope) {}
      };
    }
  ]);
})();
