'use strict';

function MainController($scope) {
  $scope.title = 'Flash Duel';
}
angular
    .module('app', [])
    .controller('MainController', ['$scope', MainController]);