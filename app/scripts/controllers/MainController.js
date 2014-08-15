'use strict';

angular.module('app')
  .controller('MainController', function($scope, $log, DeckService, PlayerService, BoardService, GameService) {
    $scope.title = 'Flash Duel';

    $scope.game = GameService;
    BoardService.reset();

    $scope.players = GameService.resetPlayers;

    $scope.movePlayer = PlayerService.movePlayer;

    $scope.deck = DeckService.cards;
  });