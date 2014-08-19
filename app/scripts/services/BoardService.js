'use strict';

angular.module('app')
    .service('BoardService', function($log, Values) {
        var service = {};

        service.board = [];

        service.reset = function() {
            service.board = [
              {type: 'dark', number:'1', occupied: {player: Values.playerOne, index: '0'}},
              {type: 'dark', number:'2', occupied: ''},
              {type: 'light', number:'3', occupied: ''},
              {type: 'light', number:'4', occupied: ''},
              {type: 'dark', number:'5', occupied: ''},
              {type: 'dark', number:'6', occupied: ''},
              {type: 'light', number:'7', occupied: ''},
              {type: 'light', number:'8', occupied: ''},
              {type: 'dark', number:'9', occupied: ''},
              {type: 'dark', number:'10', occupied: ''},
              {type: 'light', number:'11', occupied: ''},
              {type: 'light', number:'12', occupied: ''},
              {type: 'dark', number:'13', occupied: ''},
              {type: 'dark', number:'14', occupied: ''},
              {type: 'light', number:'15', occupied: ''},
              {type: 'light', number:'16', occupied: ''},
              {type: 'dark', number:'17', occupied: ''},
              {type: 'dark', number:'18', occupied: {player: Values.playerTwo, index: '1'}}
            ];
        };

        service.getPlayerByLocation = function getPlayerByLocation(targetLocation) {
           return (service.board[targetLocation-1].occupied.index) ? service.board[targetLocation-1].occupied.index : '';
        };

        service.isSpaceEmpty = function isSpaceEmpty(location) {
            return (location > 0 && location < 18 && service.board[location - 1].occupied === '');
        };

        service.updatePlayerPosition = function updatePlayerPosition(oldLocation, newLocation) {
            var movingPlayer = service.board[oldLocation-1].occupied;
            service.board[oldLocation-1].occupied = '';
            service.board[newLocation-1].occupied = movingPlayer;
        };

        service.actualMove = function actualMove(player, direction) {
            var result = 0;
            for (var i = 1; i <= player.hand[player.move]; i++) {
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
    });