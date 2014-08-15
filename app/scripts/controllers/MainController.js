'use strict';

angular
    .module('app')
    .controller('MainController', ['$scope', '$log', 'DeckService', 'PlayerService', 'BoardService',
      function($scope, $log, DeckService, PlayerService, BoardService) {
        $scope.title = 'Flash Duel';

        BoardService.reset();
        $scope.players = [{
          name: 'Player 1',
          color: 'red',
          position: 1,
          direction: 1,
          move: 1
        }, {
          name: 'Player 2',
          color: 'blue',
          position: 18,
          direction: -1,
          move: 1
        }];

        $scope.movePlayer = PlayerService.movePlayer;

        $scope.deck = DeckService.cards;
    }]);