'use strict';

angular
    .module('app')
    .controller('MainController', ['$scope', '$log', 'DeckService', 'PlayerService',
      function($scope, $log, DeckService, PlayerService) {
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

        $scope.movePlayer = PlayerService.movePlayer;

        $scope.deck = DeckService.cards;
    }]);