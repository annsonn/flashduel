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
        $log.log('service.board[location]', service.board );
        return (service.board[location] === '' && location < 18 && location > 0) ? true : false;
      };

      service.actualMoveSpaces = function actualMove(player, spaces, direction) {
        var result = 0;
        $log.log('player', player, 'spaces', spaces);

        for (var i = 1; i <= spaces; i++) {
          var queryLocation = player.position + player.direction*i*direction;
          if(service.isSpaceEmpty(queryLocation)) {
            result = i;
          }
        }

        $log.log('result', result);
        return player.position + result*player.direction*direction;
      };

      return service;
    }]);