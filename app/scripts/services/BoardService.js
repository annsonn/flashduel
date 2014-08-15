'use strict';

angular
    .module('app')
    .service('BoardService', ['$log', 'Values', function($log, Values) {
      var service = {};

      service.board = [];

      service.reset = function() {
        service.board = [
            Values.playerOne,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            Values.playerTwo
        ];
      };

      service.isSpaceEmpty = function isSpaceEmpty(location) {
        return !!(service.board[location-1] === '' && location < 18 && location > 0);
      };

      service.updatePlayerPosition = function updatePlayerPosition(oldLocation, newLocation) {
        var movingPlayer = service.board[oldLocation-1];
        service.board[oldLocation-1] = '';
        service.board[newLocation-1] = movingPlayer;
      };

      service.actualMove = function actualMove(player, spaces, direction) {
        var result = 0;
        for (var i = 1; i <= spaces; i++) {
          var queryLocation = player.position + player.direction*i*direction;
          if (service.isSpaceEmpty(queryLocation)) {
            result = i;
          } else {
            break;
          }
        }
        var newLocation = player.position + result*player.direction*direction;
        service.updatePlayerPosition(player.position, newLocation);
        return newLocation;
      };

      return service;
    }]);