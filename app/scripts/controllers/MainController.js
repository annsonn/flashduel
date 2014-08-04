'use strict';

function MainController($scope) {
  $scope.title = 'Flash Duel';

  $scope.players = [{
    name: 'Player 1',
    color: 'red',
    position: 1,
    direction: 1
  }, {
    name: 'Player 2',
    color: 'blue',
    position: 18,
    direction: -1
  }];

  $scope.move = function move(player, spaces) {
    player.position = player.position + (player.direction * spaces);
  };
}
angular
    .module('app', [])
    .controller('MainController', ['$scope', MainController]);