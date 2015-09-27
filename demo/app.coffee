do ->
  'use strict'

  LoadCarousel = ($scope, $http)->
    $scope.interval = 5000
    $scope.noWrap = false
    $http.get('mocks/slides.json').success((data)->
      $scope.slides = data
      return
    )
    $scope.changeSlide = (slide) ->
      for i in [0...$scope.slides.length]
        $scope.slides[i].active = false
      for i in [0...$scope.slides.length]
        if slide == $scope.slides[i].text
          $scope.slides[i].active = true
    return

  angular
    .module('app', ['dmk.carousel'])
    .controller('LoadCarousel', LoadCarousel)

  LoadCarousel.$inject = ['$scope', '$http']
  return