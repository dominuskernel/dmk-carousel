do ->
  'use strict'
  angular
    .module('dmk.carousel',['ui.bootstrap'])
    .directive('dmkCarousel', [ ->
      restrict: 'A'
      templateUrl: '../templates/dmk-carousel.html'
      scope:
        dmkInterval: "="
        dmkSlides: "="
        dmkNoWrap: "="

      link: (scope) ->
        return
  ])
  return