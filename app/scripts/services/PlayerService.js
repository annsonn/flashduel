'use strict';

angular.module('app')
    .service('PlayerService', function($log, BoardService, GameService) {
      var service = {};

      service.movePlayer = function movePlayer(player, spaces, direction) {
        player.position = BoardService.actualMove(player, spaces, direction);
        GameService.changePlayer();
      };

      return service;
    });