'use strict';

angular.module('app')
  .controller('MainController', function($scope, $log, DeckService, PlayerService, BoardService, GameService) {
    $scope.title = 'Flash Duel';

    $scope.game = GameService;
    BoardService.reset();

    $scope.board = BoardService.board;
    $scope.players = PlayerService.players;

    $scope.actions = {
        move: PlayerService.movePlayer,
        attack: '',
        block: '',
        dashingStrike: ''
    };


    $scope.numCardsRemaining = function numCardsRemaining() {
      return DeckService.deck.length;
    }

    $scope.discardPile = function discardPile() {
      return DeckService.discardPile;
    }
});