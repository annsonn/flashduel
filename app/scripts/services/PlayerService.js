'use strict';

angular
    .module('app')
    .service('PlayerService', ['$log', 'BoardService', function($log, BoardService) {
      var service = {};

      service.movePlayer = function movePlayer(player, spaces, direction) {
        $log.log('player', player, spaces, direction);
        player.position = BoardService.actualMoveSpaces(player, spaces, direction);

      };

      return service;
    }]);