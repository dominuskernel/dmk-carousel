(function() {
  'use strict';
  angular.module('dmk.carousel', ['ui.bootstrap']).directive('dmkCarousel', [
    function() {
      return {
        restrict: 'A',
        templateUrl: '/bower_components/dmk-carousel/templates/dmk-carousel.html',
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
