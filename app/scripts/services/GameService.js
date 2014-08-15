'use strict';

angular.module('app')
  .service('GameService', function($log) {
    var service = {};

    var startingPlayer  = Math.floor(Math.random()*2);

    service.resetPlayers = [{
      name: 'Player 1',
      color: 'red',
      position: 1,
      direction: 1,
      move: 1,
      hand: []
    }, {
      name: 'Player 2',
      color: 'blue',
      position: 18,
      direction: -1,
      move: 1,
      hand: []
    }];

    service.currentPlayer = startingPlayer;

    service.changePlayer = function changePlayer(){
      service.currentPlayer = (service.currentPlayer === 0) ? 1 : 0;
    };

    return service;
  });