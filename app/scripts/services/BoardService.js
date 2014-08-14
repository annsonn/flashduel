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
        return (service.board[location] === '') ? true : false;
      };

      service.actualMoveSpaces = function actualMove(player, attemptedMoveSpaces) {
        var result;

        for (var i = 1; i <= attemptedMoveSpaces; i++) {
          var queryLocation = player.location + player.direction*i;
          if(service.isSpaceEmpty(queryLocation)) {
            result = i;
          }
        }

        return result;
      };

      return service;
    }]);